<?php

namespace App\Services;

use App\Models\Credit;
use App\Models\CreditInstallment;
use App\Models\CreditLog;
use App\Models\CreditPayment;
use App\Models\Customer;
use App\Models\CustomerCreditConfig;
use App\Models\Sale;
use App\Models\SalesPayment;
use App\Repositories\SalesPaymentRepository;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class CreditService
{
    private const CREDIT_TABLES = [
        'customer_credit_configs',
        'credits',
        'credit_payments',
        'credit_installments',
        'credit_logs',
    ];

    public function shouldCreateCreditFromInput(array $input): bool
    {
        $isCreditEnabled = filter_var($input['credit_enabled'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $hasCreditMetadata = isset($input['credit_installments']) || isset($input['credit_due_date']) || isset($input['credit_interest_rate']);

        return ($isCreditEnabled || $hasCreditMetadata) && (int) ($input['payment_status'] ?? 0) !== Sale::PAID;
    }

    public function assertCustomerCanUseCredit(int $customerId, float $requestedAmount): CustomerCreditConfig
    {
        $this->ensureCreditTablesExist();
        $config = CustomerCreditConfig::where('customer_id', $customerId)->first();
        if (! $config) {
            throw new UnprocessableEntityHttpException('El cliente no tiene configuracion de credito.');
        }

        $this->syncCustomerBalance($customerId);
        $config->refresh();

        if ($config->status === CustomerCreditConfig::STATUS_BLOCKED) {
            throw new UnprocessableEntityHttpException('El cliente esta bloqueado para compras al credito.');
        }

        $nextBalance = round((float) $config->current_balance + (float) $requestedAmount, 2);
        if (! $config->allow_exceed && $nextBalance > (float) $config->credit_limit) {
            throw new UnprocessableEntityHttpException('Límite de crédito excedido');
        }

        return $config;
    }

    public function validateSaleCreditBeforeCheckout(Sale $sale, array $input): ?CustomerCreditConfig
    {
        if (! $this->shouldCreateCreditFromInput($input)) {
            return null;
        }

        if (! $sale->customer_id) {
            throw new UnprocessableEntityHttpException('Debe seleccionar un cliente para vender al credito.');
        }

        return $this->assertCustomerCanUseCredit((int) $sale->customer_id, (float) $sale->grand_total);
    }

    public function createCreditFromSale(Sale $sale, array $input): ?Credit
    {
        if (! $this->shouldCreateCreditFromInput($input)) {
            return null;
        }

        if (Credit::where('sale_id', $sale->id)->exists()) {
            return Credit::where('sale_id', $sale->id)->first();
        }

        $config = $this->assertCustomerCanUseCredit((int) $sale->customer_id, (float) $sale->grand_total);
        $credit = $this->storeCreditRecord([
            'sale_id' => $sale->id,
            'customer_id' => $sale->customer_id,
            'total_amount' => (float) $sale->grand_total,
            'interest_rate' => $this->resolveInterestRate($input, $config),
            'installments' => $this->resolveInstallments($input, $config),
            'start_date' => $input['credit_start_date'] ?? $sale->date?->format('Y-m-d'),
            'due_date' => $input['credit_due_date'] ?? null,
            'note' => $input['note'] ?? null,
        ]);

        $this->log(
            $credit->id,
            'credito_creado',
            sprintf('Credito #%d generado automaticamente desde la venta #%d.', $credit->id, $sale->id)
        );

        return $credit->fresh(['customer', 'sale', 'installmentItems', 'payments', 'logs']);
    }

    public function createManualCredit(array $data): Credit
    {
        $this->ensureCreditTablesExist();

        return DB::transaction(function () use ($data) {
            Customer::whereKey($data['customer_id'])->firstOrFail();
            $this->assertCustomerCanUseCredit((int) $data['customer_id'], (float) $data['total_amount']);

            $credit = $this->storeCreditRecord([
                'sale_id' => null,
                'customer_id' => (int) $data['customer_id'],
                'total_amount' => (float) $data['total_amount'],
                'interest_rate' => (float) ($data['interest_rate'] ?? 0),
                'installments' => (int) ($data['installments'] ?? 1),
                'start_date' => $data['start_date'] ?? now()->format('Y-m-d'),
                'due_date' => $data['due_date'] ?? null,
                'note' => $data['note'] ?? null,
            ]);

            $this->log(
                $credit->id,
                'credito_manual',
                sprintf('Credito #%d creado manualmente para el cliente #%d.', $credit->id, $credit->customer_id)
            );

            return $credit->fresh(['customer', 'sale', 'installmentItems', 'payments', 'logs']);
        });
    }

    public function recordPayment(Credit $credit, array $data): Credit
    {
        $this->ensureCreditTablesExist();

        return DB::transaction(function () use ($credit, $data) {
            $credit = $credit->fresh(['installmentItems', 'payments']);
            $this->refreshStatuses();
            $credit->refresh();

            $amount = round((float) ($data['amount'] ?? 0), 2);
            if ($amount <= 0) {
                throw new UnprocessableEntityHttpException('El monto del pago debe ser mayor a cero.');
            }

            if ($amount > round((float) $credit->balance, 2)) {
                throw new UnprocessableEntityHttpException('El pago no puede ser mayor al saldo pendiente.');
            }

            $paymentType = $this->resolvePaymentType($data);
            $paymentMethod = $this->resolvePaymentMethodLabel($data, $paymentType);
            $principalComponent = $this->resolvePrincipalComponent($credit, $amount);
            $interestComponent = round($amount - $principalComponent, 2);

            CreditPayment::create([
                'credit_id' => $credit->id,
                'amount' => $amount,
                'payment_type' => $paymentType,
                'payment_method' => $paymentMethod,
                'note' => $data['note'] ?? null,
            ]);

            $this->applyPaymentToInstallments($credit, $amount);

            $credit->update([
                'principal_balance' => round(max((float) $credit->principal_balance - $principalComponent, 0), 2),
                'balance' => round(max((float) $credit->balance - $amount, 0), 2),
            ]);

            $this->syncSingleCreditStatus($credit);
            $this->syncCustomerBalance((int) $credit->customer_id);
            $this->syncLegacySalePayment($credit, $principalComponent, $paymentType);

            $this->log(
                $credit->id,
                'pago_registrado',
                sprintf(
                    'Pago aplicado: total %.2f, capital %.2f, interes %.2f.',
                    $amount,
                    $principalComponent,
                    $interestComponent
                )
            );

            return $credit->fresh(['customer', 'sale', 'installmentItems', 'payments', 'logs']);
        });
    }

    public function upsertCustomerConfig(array $data): CustomerCreditConfig
    {
        $this->ensureCreditTablesExist();

        return DB::transaction(function () use ($data) {
            Customer::whereKey($data['customer_id'])->firstOrFail();

            $config = CustomerCreditConfig::updateOrCreate(
                ['customer_id' => (int) $data['customer_id']],
                [
                    'credit_limit' => round((float) ($data['credit_limit'] ?? 0), 2),
                    'allow_exceed' => filter_var($data['allow_exceed'] ?? false, FILTER_VALIDATE_BOOLEAN),
                    'interest_rate' => round((float) ($data['interest_rate'] ?? 0), 2),
                    'max_installments' => max((int) ($data['max_installments'] ?? 1), 1),
                    'status' => $data['status'] ?? CustomerCreditConfig::STATUS_ACTIVE,
                ]
            );

            $this->syncCustomerBalance((int) $config->customer_id);

            return $config->fresh('customer');
        });
    }

    public function checkLimit(int $customerId, float $requestedAmount): array
    {
        if (! $this->creditTablesExist()) {
            return [
                'allowed' => false,
                'message' => 'El modulo de creditos requiere ejecutar sus migraciones.',
                'credit_limit' => 0,
                'current_balance' => 0,
                'available_credit' => 0,
                'status' => null,
            ];
        }

        $config = CustomerCreditConfig::where('customer_id', $customerId)->first();
        if (! $config) {
            return [
                'allowed' => false,
                'message' => 'El cliente no tiene configuracion de credito.',
                'credit_limit' => 0,
                'current_balance' => 0,
                'available_credit' => 0,
                'status' => null,
            ];
        }

        $currentBalance = $this->syncCustomerBalance($customerId);
        $availableCredit = round((float) $config->credit_limit - $currentBalance, 2);
        $allowed = $config->status !== CustomerCreditConfig::STATUS_BLOCKED
            && ($config->allow_exceed || ($currentBalance + $requestedAmount) <= (float) $config->credit_limit);

        return [
            'allowed' => $allowed,
            'message' => $allowed ? 'Credito disponible.' : 'Límite de crédito excedido',
            'credit_limit' => (float) $config->credit_limit,
            'current_balance' => $currentBalance,
            'available_credit' => $availableCredit,
            'status' => $config->status,
            'allow_exceed' => (bool) $config->allow_exceed,
        ];
    }

    public function refreshStatuses(): void
    {
        if (! $this->creditTablesExist()) {
            return;
        }

        $today = Carbon::today()->toDateString();

        Credit::where('balance', '<=', 0)->update(['status' => Credit::STATUS_PAID]);
        Credit::where('balance', '>', 0)
            ->whereDate('due_date', '<', $today)
            ->update(['status' => Credit::STATUS_OVERDUE]);
        Credit::where('balance', '>', 0)
            ->whereDate('due_date', '>=', $today)
            ->update(['status' => Credit::STATUS_PENDING]);

        CreditInstallment::whereRaw('paid_amount >= amount')->update([
            'status' => CreditInstallment::STATUS_PAID,
        ]);
        CreditInstallment::whereRaw('paid_amount < amount')
            ->whereDate('due_date', '<', $today)
            ->update(['status' => CreditInstallment::STATUS_LATE]);
        CreditInstallment::whereRaw('paid_amount < amount')
            ->whereDate('due_date', '>=', $today)
            ->update(['status' => CreditInstallment::STATUS_PENDING]);
    }

    public function syncCustomerBalance(int $customerId): float
    {
        if (! $this->creditTablesExist()) {
            return 0;
        }

        $currentBalance = round((float) Credit::where('customer_id', $customerId)->sum('principal_balance'), 2);
        $config = CustomerCreditConfig::where('customer_id', $customerId)->first();

        if ($config) {
            $config->update([
                'current_balance' => $currentBalance,
            ]);
        }

        return $currentBalance;
    }

    public function getDashboardData(array $filters = []): array
    {
        if (! $this->creditTablesExist()) {
            return [
                'summary' => [
                    'total_credits' => 0,
                    'pending_credits' => 0,
                    'overdue_credits' => 0,
                    'pending_balance' => 0,
                    'principal_in_use' => 0,
                    'overdue_balance' => 0,
                    'morose_customers' => 0,
                    'projected_interest' => 0,
                    'collected_interest' => 0,
                ],
                'customer_configs' => [],
                'credits' => [],
                'overdue_customers' => [],
                'interest_report' => [],
                'setup_required' => true,
                'message' => 'El modulo de creditos requiere ejecutar sus migraciones.',
            ];
        }

        $this->refreshStatuses();

        $search = trim((string) ($filters['search'] ?? ''));
        $status = $filters['status'] ?? null;

        $creditsQuery = Credit::query()
            ->with([
                'customer:id,name,email,phone',
                'sale:id,reference_code',
            ])
            ->orderByDesc('id');

        if ($status) {
            $creditsQuery->where('status', $status);
        }

        if ($search !== '') {
            $creditsQuery->where(function ($query) use ($search) {
                if (is_numeric($search)) {
                    $query->orWhere('id', (int) $search)->orWhere('sale_id', (int) $search);
                }

                $query->orWhereHas('customer', function ($customerQuery) use ($search) {
                    $customerQuery
                        ->where('name', 'like', '%' . $search . '%')
                        ->orWhere('phone', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%');
                })->orWhereHas('sale', function ($saleQuery) use ($search) {
                    $saleQuery->where('reference_code', 'like', '%' . $search . '%');
                });
            });
        }

        $credits = $creditsQuery->get();
        $customerConfigs = CustomerCreditConfig::query()
            ->with('customer:id,name,email,phone')
            ->orderByDesc('updated_at')
            ->get();

        $overdueCredits = Credit::query()
            ->with('customer:id,name,email,phone')
            ->where('balance', '>', 0)
            ->where('status', Credit::STATUS_OVERDUE)
            ->get();

        $overdueCustomers = $overdueCredits
            ->groupBy('customer_id')
            ->map(function (Collection $customerCredits) {
                $firstCredit = $customerCredits->first();

                return [
                    'customer_id' => $firstCredit->customer_id,
                    'customer_name' => optional($firstCredit->customer)->name,
                    'customer_phone' => optional($firstCredit->customer)->phone,
                    'overdue_credits' => $customerCredits->count(),
                    'overdue_balance' => round((float) $customerCredits->sum('balance'), 2),
                    'oldest_due_date' => optional($customerCredits->sortBy('due_date')->first()->due_date)->format('Y-m-d'),
                ];
            })
            ->values()
            ->all();

        $creditRows = $credits->map(function (Credit $credit) {
            return $this->transformCreditRow($credit);
        })->values()->all();

        $configRows = $customerConfigs->map(function (CustomerCreditConfig $config) {
            $overdueBalance = round((float) Credit::where('customer_id', $config->customer_id)
                ->where('status', Credit::STATUS_OVERDUE)
                ->sum('balance'), 2);

            return [
                'id' => $config->id,
                'customer_id' => $config->customer_id,
                'customer_name' => optional($config->customer)->name,
                'customer_phone' => optional($config->customer)->phone,
                'credit_limit' => (float) $config->credit_limit,
                'used' => (float) $config->current_balance,
                'available' => round((float) $config->credit_limit - (float) $config->current_balance, 2),
                'interest_rate' => (float) $config->interest_rate,
                'max_installments' => (int) $config->max_installments,
                'allow_exceed' => (bool) $config->allow_exceed,
                'status' => $config->status,
                'overdue_balance' => $overdueBalance,
                'updated_at' => optional($config->updated_at)->format('Y-m-d H:i:s'),
            ];
        })->values()->all();

        $interestReport = $credits->map(function (Credit $credit) {
            $plannedInterest = round((float) $credit->total_with_interest - (float) $credit->total_amount, 2);
            $paidPrincipal = round((float) $credit->total_amount - (float) $credit->principal_balance, 2);
            $paidTotal = round((float) $credit->total_with_interest - (float) $credit->balance, 2);
            $collectedInterest = round(max($paidTotal - $paidPrincipal, 0), 2);

            return [
                'credit_id' => $credit->id,
                'customer_name' => optional($credit->customer)->name,
                'planned_interest' => $plannedInterest,
                'collected_interest' => $collectedInterest,
                'pending_interest' => round(max($plannedInterest - $collectedInterest, 0), 2),
                'status' => $credit->status,
            ];
        })->values()->all();

        return [
            'summary' => [
                'total_credits' => $credits->count(),
                'pending_credits' => $credits->where('status', Credit::STATUS_PENDING)->count(),
                'overdue_credits' => $credits->where('status', Credit::STATUS_OVERDUE)->count(),
                'pending_balance' => round((float) $credits->sum('balance'), 2),
                'principal_in_use' => round((float) $credits->sum('principal_balance'), 2),
                'overdue_balance' => round((float) $credits->where('status', Credit::STATUS_OVERDUE)->sum('balance'), 2),
                'morose_customers' => count($overdueCustomers),
                'projected_interest' => round((float) $credits->sum(function (Credit $credit) {
                    return $credit->total_with_interest - $credit->total_amount;
                }), 2),
                'collected_interest' => round((float) collect($interestReport)->sum('collected_interest'), 2),
            ],
            'customer_configs' => $configRows,
            'credits' => $creditRows,
            'overdue_customers' => $overdueCustomers,
            'interest_report' => $interestReport,
        ];
    }

    public function getCreditDetail(Credit $credit): array
    {
        $this->ensureCreditTablesExist();
        $this->refreshStatuses();
        $credit = $credit->fresh(['customer', 'sale', 'payments', 'installmentItems', 'logs']);

        $creditRow = $this->transformCreditRow($credit);
        $creditRow['payments'] = $credit->payments->map(function (CreditPayment $payment) {
            return [
                'id' => $payment->id,
                'amount' => (float) $payment->amount,
                'payment_type' => $payment->payment_type,
                'payment_method' => $payment->payment_method,
                'note' => $payment->note,
                'created_at' => optional($payment->created_at)->format('Y-m-d H:i:s'),
            ];
        })->values()->all();
        $creditRow['installments'] = $credit->installmentItems->map(function (CreditInstallment $installment) {
            return [
                'id' => $installment->id,
                'installment_number' => (int) $installment->installment_number,
                'amount' => (float) $installment->amount,
                'paid_amount' => (float) $installment->paid_amount,
                'pending_amount' => round(max((float) $installment->amount - (float) $installment->paid_amount, 0), 2),
                'due_date' => optional($installment->due_date)->format('Y-m-d'),
                'status' => $installment->status,
                'paid_at' => optional($installment->paid_at)->format('Y-m-d H:i:s'),
            ];
        })->values()->all();
        $creditRow['logs'] = $credit->logs->map(function (CreditLog $log) {
            return [
                'id' => $log->id,
                'action' => $log->action,
                'description' => $log->description,
                'created_at' => optional($log->created_at)->format('Y-m-d H:i:s'),
            ];
        })->values()->all();

        return $creditRow;
    }

    private function storeCreditRecord(array $data): Credit
    {
        $startDate = Carbon::parse($data['start_date'] ?? now())->startOfDay();
        $installments = max((int) ($data['installments'] ?? 1), 1);
        $dueDate = $this->resolveDueDate($startDate, $data['due_date'] ?? null, $installments);
        $interestRate = round((float) ($data['interest_rate'] ?? 0), 2);
        $principalAmount = round((float) ($data['total_amount'] ?? 0), 2);
        $totalWithInterest = round($principalAmount + ($principalAmount * $interestRate / 100), 2);

        $credit = Credit::create([
            'sale_id' => $data['sale_id'] ?? null,
            'customer_id' => (int) $data['customer_id'],
            'total_amount' => $principalAmount,
            'principal_balance' => $principalAmount,
            'balance' => $totalWithInterest,
            'interest_rate' => $interestRate,
            'total_with_interest' => $totalWithInterest,
            'installments' => $installments,
            'status' => Credit::STATUS_PENDING,
            'start_date' => $startDate->format('Y-m-d'),
            'due_date' => $dueDate->format('Y-m-d'),
            'note' => $data['note'] ?? null,
        ]);

        $this->createInstallmentsForCredit($credit, $startDate, $dueDate, $installments);
        $this->syncSingleCreditStatus($credit);
        $this->syncCustomerBalance((int) $credit->customer_id);

        return $credit;
    }

    private function createInstallmentsForCredit(Credit $credit, Carbon $startDate, Carbon $dueDate, int $installments): void
    {
        $remainingAmount = round((float) $credit->total_with_interest, 2);
        $baseInstallmentAmount = round((float) $credit->total_with_interest / $installments, 2);

        for ($number = 1; $number <= $installments; $number++) {
            $amount = $number === $installments ? $remainingAmount : $baseInstallmentAmount;
            $remainingAmount = round($remainingAmount - $amount, 2);
            $installmentDueDate = $this->resolveInstallmentDueDate($startDate, $dueDate, $number, $installments);

            CreditInstallment::create([
                'credit_id' => $credit->id,
                'installment_number' => $number,
                'amount' => $amount,
                'paid_amount' => 0,
                'due_date' => $installmentDueDate->format('Y-m-d'),
                'status' => CreditInstallment::STATUS_PENDING,
            ]);
        }
    }

    private function applyPaymentToInstallments(Credit $credit, float $amount): void
    {
        $remainingAmount = round($amount, 2);
        $installments = CreditInstallment::where('credit_id', $credit->id)->orderBy('installment_number')->get();
        $today = Carbon::today();

        foreach ($installments as $installment) {
            if ($remainingAmount <= 0) {
                break;
            }

            $installmentPending = round((float) $installment->amount - (float) $installment->paid_amount, 2);
            if ($installmentPending <= 0) {
                continue;
            }

            $appliedAmount = min($remainingAmount, $installmentPending);
            $newPaidAmount = round((float) $installment->paid_amount + $appliedAmount, 2);
            $isPaid = $newPaidAmount >= round((float) $installment->amount, 2);

            $installment->update([
                'paid_amount' => $newPaidAmount,
                'status' => $isPaid
                    ? CreditInstallment::STATUS_PAID
                    : ($installment->due_date->lt($today) ? CreditInstallment::STATUS_LATE : CreditInstallment::STATUS_PENDING),
                'paid_at' => $isPaid ? now() : null,
            ]);

            $remainingAmount = round($remainingAmount - $appliedAmount, 2);
        }
    }

    private function syncSingleCreditStatus(Credit $credit): void
    {
        $credit->refresh();
        $today = Carbon::today();
        $status = Credit::STATUS_PENDING;

        if ((float) $credit->balance <= 0) {
            $status = Credit::STATUS_PAID;
        } elseif ($credit->due_date->lt($today)) {
            $status = Credit::STATUS_OVERDUE;
        }

        if ($credit->status !== $status) {
            $credit->update(['status' => $status]);
        }
    }

    private function syncLegacySalePayment(Credit $credit, float $principalComponent, ?int $paymentType): void
    {
        if (! $credit->sale_id || $principalComponent <= 0) {
            return;
        }

        SalesPayment::create([
            'sale_id' => $credit->sale_id,
            'payment_date' => Carbon::now()->format('Y-m-d'),
            'payment_type' => $paymentType ?? SalesPayment::OTHER,
            'amount' => $principalComponent,
            'received_amount' => $principalComponent,
        ]);

        app(SalesPaymentRepository::class)->recalculateSalePaymentSummary((int) $credit->sale_id);
    }

    private function resolvePrincipalComponent(Credit $credit, float $paymentAmount): float
    {
        $principalBalance = round((float) $credit->principal_balance, 2);
        $actualBalance = round((float) $credit->balance, 2);
        if ($principalBalance <= 0 || $actualBalance <= 0) {
            return 0;
        }

        $ratio = $principalBalance / $actualBalance;

        return round(min($principalBalance, $paymentAmount * $ratio), 2);
    }

    private function resolveInterestRate(array $input, CustomerCreditConfig $config): float
    {
        return round((float) ($input['credit_interest_rate'] ?? $config->interest_rate ?? 0), 2);
    }

    private function resolveInstallments(array $input, CustomerCreditConfig $config): int
    {
        return max((int) ($input['credit_installments'] ?? $config->max_installments ?? 1), 1);
    }

    private function resolveDueDate(Carbon $startDate, ?string $requestedDueDate, int $installments): Carbon
    {
        $dueDate = $requestedDueDate
            ? Carbon::parse($requestedDueDate)->startOfDay()
            : $startDate->copy()->addMonthsNoOverflow($installments);

        if ($dueDate->lt($startDate)) {
            throw new UnprocessableEntityHttpException('La fecha de vencimiento no puede ser menor a la fecha inicial.');
        }

        return $dueDate;
    }

    private function resolveInstallmentDueDate(Carbon $startDate, Carbon $dueDate, int $installmentNumber, int $installments): Carbon
    {
        if ($installments === 1) {
            return $dueDate->copy();
        }

        if ($installmentNumber === $installments) {
            return $dueDate->copy();
        }

        $calculatedDate = $startDate->copy()->addMonthsNoOverflow($installmentNumber);

        return $calculatedDate->gt($dueDate) ? $dueDate->copy() : $calculatedDate;
    }

    private function resolvePaymentType(array $data): ?int
    {
        if (! empty($data['payment_type'])) {
            return (int) $data['payment_type'];
        }

        $paymentMethod = strtolower(trim((string) ($data['payment_method'] ?? '')));

        return match ($paymentMethod) {
            'cash', 'efectivo' => SalesPayment::CASH,
            'cheque' => SalesPayment::CHEQUE,
            'bank_transfer', 'transferencia', 'transferencia bancaria' => SalesPayment::BANK_TRANSFER,
            'other', 'otro', 'otros' => SalesPayment::OTHER,
            default => null,
        };
    }

    private function resolvePaymentMethodLabel(array $data, ?int $paymentType): string
    {
        if (! empty($data['payment_method'])) {
            return (string) $data['payment_method'];
        }

        return match ($paymentType) {
            SalesPayment::CASH => 'cash',
            SalesPayment::CHEQUE => 'cheque',
            SalesPayment::BANK_TRANSFER => 'bank_transfer',
            SalesPayment::OTHER => 'other',
            default => 'other',
        };
    }

    private function transformCreditRow(Credit $credit): array
    {
        $paidTotal = round((float) $credit->total_with_interest - (float) $credit->balance, 2);
        $paidPrincipal = round((float) $credit->total_amount - (float) $credit->principal_balance, 2);

        return [
            'id' => $credit->id,
            'sale_id' => $credit->sale_id,
            'sale_reference_code' => optional($credit->sale)->reference_code,
            'customer_id' => $credit->customer_id,
            'customer_name' => optional($credit->customer)->name,
            'customer_phone' => optional($credit->customer)->phone,
            'total_amount' => (float) $credit->total_amount,
            'principal_balance' => (float) $credit->principal_balance,
            'balance' => (float) $credit->balance,
            'interest_rate' => (float) $credit->interest_rate,
            'total_with_interest' => (float) $credit->total_with_interest,
            'paid_total' => $paidTotal,
            'paid_principal' => $paidPrincipal,
            'paid_interest' => round(max($paidTotal - $paidPrincipal, 0), 2),
            'installments' => (int) $credit->installments,
            'status' => $credit->status,
            'start_date' => optional($credit->start_date)->format('Y-m-d'),
            'due_date' => optional($credit->due_date)->format('Y-m-d'),
            'note' => $credit->note,
            'created_at' => optional($credit->created_at)->format('Y-m-d H:i:s'),
        ];
    }

    private function log(int $creditId, string $action, ?string $description = null): void
    {
        CreditLog::create([
            'credit_id' => $creditId,
            'action' => $action,
            'description' => $description,
        ]);
    }

    private function creditTablesExist(): bool
    {
        foreach (self::CREDIT_TABLES as $table) {
            if (! Schema::hasTable($table)) {
                return false;
            }
        }

        return true;
    }

    private function ensureCreditTablesExist(): void
    {
        if (! $this->creditTablesExist()) {
            throw new UnprocessableEntityHttpException('El modulo de creditos requiere ejecutar sus migraciones.');
        }
    }
}
