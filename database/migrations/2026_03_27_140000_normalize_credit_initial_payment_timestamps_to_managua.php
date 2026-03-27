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

        $initialPayments = DB::table('credit_payments')
            ->select('id', 'credit_id', 'created_at')
            ->where('entry_type', 'PAGO_INICIAL')
            ->orderBy('id')
            ->get();

        foreach ($initialPayments as $payment) {
            $creationLog = DB::table('credit_logs')
                ->where('credit_id', $payment->credit_id)
                ->where('action', 'credito_creado')
                ->orderBy('id')
                ->first();

            if (! $creationLog || ! $creationLog->created_at || ! $payment->created_at) {
                continue;
            }

            $paymentTimestamp = Carbon::parse($payment->created_at);
            $authoritativeTimestamp = Carbon::parse($creationLog->created_at);
            $minutesDifference = abs($paymentTimestamp->diffInMinutes($authoritativeTimestamp, false));

            if ($minutesDifference <= 1) {
                continue;
            }

            DB::table('credit_payments')
                ->where('id', $payment->id)
                ->update([
                    'created_at' => $authoritativeTimestamp,
                ]);

            DB::table('credit_logs')
                ->where('credit_id', $payment->credit_id)
                ->where('action', 'pago_inicial_registrado')
                ->update([
                    'created_at' => $authoritativeTimestamp,
                ]);

            if (Schema::hasTable('credit_cash_movements')) {
                DB::table('credit_cash_movements')
                    ->where('credit_payment_id', $payment->id)
                    ->update([
                        'movement_date' => $authoritativeTimestamp,
                        'created_at' => $authoritativeTimestamp,
                        'updated_at' => $authoritativeTimestamp,
                    ]);
            }

            if (Schema::hasTable('sales_payments')) {
                DB::table('sales_payments')
                    ->where('reference', 'CRD-PAY-'.$payment->id)
                    ->update([
                        'created_at' => $authoritativeTimestamp,
                        'updated_at' => $authoritativeTimestamp,
                    ]);
            }
        }
    }

    public function down(): void
    {
    }

    private function canRun(): bool
    {
        foreach ([
            'credit_payments',
            'credit_logs',
        ] as $table) {
            if (! Schema::hasTable($table)) {
                return false;
            }
        }

        return Schema::hasColumn('credit_payments', 'entry_type');
    }
};
