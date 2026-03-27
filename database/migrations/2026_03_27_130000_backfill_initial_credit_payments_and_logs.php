<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! $this->canRun()) {
            return;
        }

        $credits = DB::table('credits')
            ->join('sales', 'sales.id', '=', 'credits.sale_id')
            ->select([
                'credits.id as credit_id',
                'credits.sale_id',
                'credits.customer_id',
                'credits.total_amount',
                'credits.created_at as credit_created_at',
                'sales.grand_total',
                'sales.payment_type as sale_payment_type',
                'sales.user_id as sale_user_id',
                'sales.created_at as sale_created_at',
            ])
            ->whereNotNull('credits.sale_id')
            ->orderBy('credits.id')
            ->get();

        foreach ($credits as $credit) {
            $initialPaymentAmount = round(
                max((float) $credit->grand_total - (float) $credit->total_amount, 0),
                2
            );

            if ($initialPaymentAmount <= 0) {
                continue;
            }

            $salePayment = $this->findLegacySalePayment((int) $credit->sale_id, $initialPaymentAmount);
            $paymentTimestamp = $this->resolveTimestamp(
                $salePayment->created_at ?? null,
                $credit->sale_created_at ?? null,
                $credit->credit_created_at ?? null
            );
            $paymentType = (int) ($salePayment->payment_type ?? $credit->sale_payment_type ?? 4);
            $paymentMethod = $this->paymentMethodFromType($paymentType);

            $initialCreditPayment = DB::table('credit_payments')
                ->where('credit_id', $credit->credit_id)
                ->where('entry_type', 'PAGO_INICIAL')
                ->orderBy('id')
                ->first();

            if (! $initialCreditPayment) {
                $paymentId = DB::table('credit_payments')->insertGetId([
                    'credit_id' => $credit->credit_id,
                    'amount' => $initialPaymentAmount,
                    'payment_type' => $paymentType,
                    'payment_method' => $paymentMethod,
                    'entry_type' => 'PAGO_INICIAL',
                    'note' => 'Pago inicial registrado al crear el credito.',
                    'created_at' => $paymentTimestamp,
                ]);

                $initialCreditPayment = (object) [
                    'id' => $paymentId,
                    'payment_type' => $paymentType,
                    'payment_method' => $paymentMethod,
                    'created_at' => $paymentTimestamp,
                ];
            }

            $this->syncSalePaymentReference(
                (int) $credit->sale_id,
                $salePayment,
                (int) $initialCreditPayment->id,
                $initialPaymentAmount,
                $paymentType,
                $paymentTimestamp
            );

            $this->createCashMovementIfMissing(
                $credit,
                $initialCreditPayment,
                $initialPaymentAmount,
                $paymentType,
                $paymentMethod,
                $paymentTimestamp
            );

            $this->backfillInitialPaymentLog(
                (int) $credit->credit_id,
                $initialPaymentAmount,
                $paymentMethod,
                $paymentTimestamp
            );

            $this->refreshCreationLogDescription(
                $credit,
                $initialPaymentAmount,
                $paymentTimestamp
            );
        }
    }

    public function down(): void
    {
    }

    private function canRun(): bool
    {
        foreach ([
            'credits',
            'sales',
            'sales_payments',
            'credit_payments',
            'credit_logs',
        ] as $table) {
            if (! Schema::hasTable($table)) {
                return false;
            }
        }

        return Schema::hasColumn('credit_payments', 'entry_type');
    }

    private function findLegacySalePayment(int $saleId, float $amount): ?object
    {
        $baseQuery = DB::table('sales_payments')
            ->where('sale_id', $saleId)
            ->whereBetween('amount', [$amount - 0.01, $amount + 0.01]);

        $preferredPayment = (clone $baseQuery)
            ->where(function ($query) {
                $query->whereNull('reference')
                    ->orWhere('reference', 'not like', 'CRD-PAY-%');
            })
            ->orderBy('id')
            ->first();

        return $preferredPayment ?: (clone $baseQuery)->orderBy('id')->first();
    }

    private function resolveTimestamp(...$candidates): Carbon
    {
        foreach ($candidates as $candidate) {
            if ($candidate) {
                return Carbon::parse($candidate);
            }
        }

        return now();
    }

    private function paymentMethodFromType(int $paymentType): string
    {
        return match ($paymentType) {
            1 => 'cash',
            2 => 'cheque',
            3 => 'bank_transfer',
            default => 'other',
        };
    }

    private function paymentMethodAuditLabel(string $paymentMethod): string
    {
        return match (strtolower(trim($paymentMethod))) {
            'cash' => 'efectivo',
            'cheque' => 'cheque',
            'bank_transfer' => 'transferencia',
            default => 'otro',
        };
    }

    private function syncSalePaymentReference(
        int $saleId,
        ?object $salePayment,
        int $creditPaymentId,
        float $amount,
        int $paymentType,
        Carbon $paymentTimestamp
    ): void {
        $reference = 'CRD-PAY-'.$creditPaymentId;
        $payload = [
            'reference' => $reference,
            'payment_date' => $paymentTimestamp->format('Y-m-d'),
            'payment_type' => $paymentType,
            'amount' => $amount,
            'received_amount' => $amount,
        ];

        if ($salePayment) {
            DB::table('sales_payments')
                ->where('id', $salePayment->id)
                ->update($payload);
        } else {
            DB::table('sales_payments')->insert(array_merge($payload, [
                'sale_id' => $saleId,
                'created_at' => $paymentTimestamp,
                'updated_at' => $paymentTimestamp,
            ]));
        }
    }

    private function createCashMovementIfMissing(
        object $credit,
        object $initialCreditPayment,
        float $amount,
        int $paymentType,
        string $paymentMethod,
        Carbon $paymentTimestamp
    ): void {
        if (! Schema::hasTable('credit_cash_movements')) {
            return;
        }

        $existingMovement = DB::table('credit_cash_movements')
            ->where('credit_payment_id', $initialCreditPayment->id)
            ->exists();

        if ($existingMovement) {
            return;
        }

        DB::table('credit_cash_movements')->insert([
            'credit_id' => $credit->credit_id,
            'credit_payment_id' => $initialCreditPayment->id,
            'sale_id' => $credit->sale_id,
            'customer_id' => $credit->customer_id,
            'pos_register_id' => $this->resolveRegisterId(
                $credit->sale_user_id ? (int) $credit->sale_user_id : null,
                $paymentTimestamp
            ),
            'user_id' => $credit->sale_user_id,
            'type' => 'INGRESO',
            'category' => 'PAGO_CREDITO',
            'source' => 'credit_payment',
            'description' => 'Pago de credito CRD_'.str_pad((string) $credit->credit_id, 4, '0', STR_PAD_LEFT),
            'amount' => $amount,
            'principal_amount' => $amount,
            'interest_amount' => 0,
            'payment_type' => $paymentType,
            'payment_method' => $paymentMethod,
            'movement_date' => $paymentTimestamp,
            'created_at' => $paymentTimestamp,
            'updated_at' => $paymentTimestamp,
        ]);
    }

    private function resolveRegisterId(?int $userId, Carbon $paymentTimestamp): ?int
    {
        if (! $userId || ! Schema::hasTable('pos_register')) {
            return null;
        }

        return DB::table('pos_register')
            ->where('user_id', $userId)
            ->where('created_at', '<=', $paymentTimestamp)
            ->where(function ($query) use ($paymentTimestamp) {
                $query->whereNull('closed_at')
                    ->orWhere('closed_at', '>=', $paymentTimestamp);
            })
            ->orderByDesc('created_at')
            ->value('id');
    }

    private function backfillInitialPaymentLog(
        int $creditId,
        float $amount,
        string $paymentMethod,
        Carbon $paymentTimestamp
    ): void {
        $logExists = DB::table('credit_logs')
            ->where('credit_id', $creditId)
            ->where('action', 'pago_inicial_registrado')
            ->exists();

        if ($logExists) {
            return;
        }

        DB::table('credit_logs')->insert([
            'credit_id' => $creditId,
            'action' => 'pago_inicial_registrado',
            'description' => sprintf(
                'Pago inicial registrado: %.2f via %s.',
                $amount,
                $this->paymentMethodAuditLabel($paymentMethod)
            ),
            'created_at' => $paymentTimestamp,
        ]);
    }

    private function refreshCreationLogDescription(
        object $credit,
        float $initialPaymentAmount,
        Carbon $paymentTimestamp
    ): void {
        $description = sprintf(
            'Credito #%d generado automaticamente desde la venta #%d. Total venta %.2f, pago inicial %.2f, saldo financiado %.2f.',
            $credit->credit_id,
            $credit->sale_id,
            (float) $credit->grand_total,
            $initialPaymentAmount,
            (float) $credit->total_amount
        );

        $creationLog = DB::table('credit_logs')
            ->where('credit_id', $credit->credit_id)
            ->where('action', 'credito_creado')
            ->orderBy('id')
            ->first();

        if ($creationLog) {
            DB::table('credit_logs')
                ->where('id', $creationLog->id)
                ->update([
                    'description' => $description,
                ]);

            return;
        }

        DB::table('credit_logs')->insert([
            'credit_id' => $credit->credit_id,
            'action' => 'credito_creado',
            'description' => $description,
            'created_at' => $paymentTimestamp,
        ]);
    }
};
