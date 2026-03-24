<?php

namespace App\Services;

use App\Models\Credit;
use App\Models\CreditCashMovement;
use App\Models\CreditPayment;
use App\Models\POSRegister;
use App\Models\SalesPayment;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

class CreditCashMovementService
{
    public const TYPE_INCOME = 'INGRESO';
    public const TYPE_EXPENSE = 'EGRESO';
    public const CATEGORY_CREDIT_PAYMENT = 'PAGO_CREDITO';
    public const CATEGORY_CREDIT_REFUND = 'DEVOLUCION_CREDITO';
    public const SOURCE_CREDIT_PAYMENT = 'credit_payment';
    public const LEGACY_REFERENCE_PREFIX = 'CRD-PAY-';

    public function movementTableExists(): bool
    {
        return Schema::hasTable('credit_cash_movements');
    }

    public function recordPaymentMovement(
        Credit $credit,
        CreditPayment $payment,
        float $principalAmount,
        float $interestAmount,
        ?int $paymentType,
        ?string $paymentMethod
    ): void {
        if (! $this->movementTableExists()) {
            return;
        }

        $movementDate = $payment->created_at ? Carbon::parse($payment->created_at) : now();
        $userId = Auth::id();

        CreditCashMovement::create([
            'credit_id' => $credit->id,
            'credit_payment_id' => $payment->id,
            'sale_id' => $credit->sale_id,
            'customer_id' => $credit->customer_id,
            'pos_register_id' => $this->resolveOpenRegisterId($userId),
            'user_id' => $userId,
            'type' => self::TYPE_INCOME,
            'category' => self::CATEGORY_CREDIT_PAYMENT,
            'source' => self::SOURCE_CREDIT_PAYMENT,
            'description' => 'Pago de credito '.$this->formatCreditReference($credit),
            'amount' => round((float) $payment->amount, 2),
            'principal_amount' => round($principalAmount, 2),
            'interest_amount' => round($interestAmount, 2),
            'payment_type' => $paymentType ?? SalesPayment::OTHER,
            'payment_method' => $paymentMethod ?: 'other',
            'movement_date' => $movementDate,
        ]);
    }

    public function getTotalsBetween($startDate, $endDate, ?int $userId = null): array
    {
        if (! $this->movementTableExists()) {
            return $this->emptyTotals();
        }

        $baseQuery = $this->incomeQuery($startDate, $endDate, $userId);
        $totals = (clone $baseQuery)
            ->selectRaw('COALESCE(SUM(amount), 0) as total_amount')
            ->selectRaw('COALESCE(SUM(principal_amount), 0) as principal_amount')
            ->selectRaw('COALESCE(SUM(interest_amount), 0) as interest_amount')
            ->selectRaw('COUNT(*) as total_movements')
            ->first();

        $paymentTypeTotals = (clone $baseQuery)
            ->selectRaw('COALESCE(payment_type, '.SalesPayment::OTHER.') as payment_type_key')
            ->selectRaw('COALESCE(SUM(amount), 0) as total_amount')
            ->groupByRaw('COALESCE(payment_type, '.SalesPayment::OTHER.')')
            ->pluck('total_amount', 'payment_type_key');

        return [
            'credit_payment_amount' => round((float) ($totals->total_amount ?? 0), 2),
            'credit_principal_amount' => round((float) ($totals->principal_amount ?? 0), 2),
            'credit_interest_amount' => round((float) ($totals->interest_amount ?? 0), 2),
            'credit_cash_payment' => round((float) ($paymentTypeTotals[SalesPayment::CASH] ?? 0), 2),
            'credit_cheque_payment' => round((float) ($paymentTypeTotals[SalesPayment::CHEQUE] ?? 0), 2),
            'credit_bank_transfer_payment' => round((float) ($paymentTypeTotals[SalesPayment::BANK_TRANSFER] ?? 0), 2),
            'credit_other_payment' => round((float) ($paymentTypeTotals[SalesPayment::OTHER] ?? 0), 2),
            'credit_total_movements' => (int) ($totals->total_movements ?? 0),
        ];
    }

    public function getRegisterTotals(POSRegister $register): array
    {
        $endDate = $register->closed_at ?: now();

        return $this->getTotalsBetween($register->created_at, $endDate, (int) $register->user_id);
    }

    public function getRegularSalesPaymentsQuery(): Builder
    {
        return SalesPayment::query()->where(function (Builder $query) {
            $query->whereNull('reference')
                ->orWhere('reference', 'not like', self::LEGACY_REFERENCE_PREFIX.'%');
        });
    }

    public function legacySalesPaymentReference(CreditPayment $payment): string
    {
        return self::LEGACY_REFERENCE_PREFIX.$payment->id;
    }

    private function incomeQuery($startDate, $endDate, ?int $userId = null): Builder
    {
        $query = CreditCashMovement::query()
            ->where('type', self::TYPE_INCOME)
            ->whereBetween('movement_date', [
                $this->normalizeDate($startDate),
                $this->normalizeDate($endDate),
            ]);

        if ($userId) {
            $query->where('user_id', $userId);
        }

        return $query;
    }

    private function normalizeDate($date): Carbon
    {
        return $date instanceof Carbon ? $date->copy() : Carbon::parse($date);
    }

    private function resolveOpenRegisterId(?int $userId): ?int
    {
        if (! $userId) {
            return null;
        }

        return POSRegister::where('user_id', $userId)
            ->whereNull('closed_at')
            ->value('id');
    }

    private function formatCreditReference(Credit $credit): string
    {
        return sprintf('CRD_%04d', $credit->id);
    }

    private function emptyTotals(): array
    {
        return [
            'credit_payment_amount' => 0,
            'credit_principal_amount' => 0,
            'credit_interest_amount' => 0,
            'credit_cash_payment' => 0,
            'credit_cheque_payment' => 0,
            'credit_bank_transfer_payment' => 0,
            'credit_other_payment' => 0,
            'credit_total_movements' => 0,
        ];
    }
}
