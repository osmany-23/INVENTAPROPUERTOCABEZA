<?php

namespace App\Services;

use App\Models\Credit;
use App\Models\CreditInstallment;
use App\Models\CreditLog;
use App\Models\CreditPayment;
use App\Models\CreditRestructure;
use App\Models\Customer;
use App\Models\CustomerCreditConfig;
use App\Models\Sale;
use App\Models\SalesPayment;
use App\Models\Setting;
use App\Models\User;
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

    private CreditCashMovementService $creditCashMovementService;
    private CreditInventoryService $creditInventoryService;
    private ?bool $creditStatusSupportsPartial = null;
    private ?bool $userCreditAlertDaysColumnExists = null;

    public function __construct(
        CreditCashMovementService $creditCashMovementService,
        CreditInventoryService $creditInventoryService
    )
    {
        $this->creditCashMovementService = $creditCashMovementService;
        $this->creditInventoryService = $creditInventoryService;
    }

    public function shouldCreateCreditFromInput(array $input): bool
    {
        $isCreditEnabled = filter_var(
            $input['credit_enabled'] ?? $input['credit_sale'] ?? false,
            FILTER_VALIDATE_BOOLEAN
        );
        $hasCreditMetadata = isset($input['credit_installments'])
            || isset($input['credit_due_date'])
            || isset($input['credit_interest_rate'])
            || isset($input['credit_type']);

        return ($isCreditEnabled || $hasCreditMetadata) && (int) ($input['payment_status'] ?? 0) !== Sale::PAID;
    }

    public function resolveCreditInitialPayment(array $input, ?float $saleGrandTotal = null): float
    {
        $initialPayment = round(max((float) ($input['credit_initial_payment'] ?? 0), 0), 2);

        if ($saleGrandTotal !== null && $initialPayment > round($saleGrandTotal, 2)) {
            throw new UnprocessableEntityHttpException('El pago inicial no puede ser mayor al total de la venta.');
        }

        return $initialPayment;
    }

    public function resolveSaleCreditPrincipal(Sale $sale, array $input): float
    {
        $initialPayment = $this->resolveCreditInitialPayment($input, (float) $sale->grand_total);

        return round(max((float) $sale->grand_total - $initialPayment, 0), 2);
    }

    public function assertCustomerCanUseCredit(int $customerId, float $requestedAmount): CustomerCreditConfig
    {
        $this->ensureCreditTablesExist();
        $lockRows = DB::transactionLevel() > 0;
        $config = $this->getCustomerCreditConfigOrFail($customerId, $lockRows);

        return $this->assertCustomerCanUseCreditWithConfig($config, $requestedAmount, null, $lockRows);

        $config = $this->findCustomerCreditConfig($customerId, DB::transactionLevel() > 0);
        if (! $config) {
            throw new UnprocessableEntityHttpException('El cliente no tiene configuracion de credito.');
        }

        $snapshot = $this->buildCustomerCreditSnapshot($config, $requestedAmount, DB::transactionLevel() > 0);
        if (! $snapshot['allowed']) {
            throw new UnprocessableEntityHttpException($snapshot['message']);
        }

        $config->setAttribute('available_credit', $snapshot['available_credit']);
        $config->setAttribute('used_credit', $snapshot['used_credit']);
        $config->setAttribute('has_overdue_credits', $snapshot['has_overdue_credits']);
        /*

            throw new UnprocessableEntityHttpException('Límite de crédito excedido');
        }

        */
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

        $lockRows = DB::transactionLevel() > 0;
        $config = $this->getCustomerCreditConfigOrFail((int) $sale->customer_id, $lockRows);
        $interestRate = $this->resolveInterestRate($input, $config);
        $requestedAmount = $this->resolveSaleCreditPrincipal($sale, $input);

        if ($requestedAmount <= 0) {
            throw new UnprocessableEntityHttpException(
                'El saldo del credito debe ser mayor a cero para registrar una venta a credito.'
            );
        }

        return $this->assertCustomerCanUseCreditWithConfig(
            $config,
            $requestedAmount,
            $interestRate,
            $lockRows
        );
    }

    public function createCreditFromSale(Sale $sale, array $input): ?Credit
    {
        if (! $this->shouldCreateCreditFromInput($input)) {
            return null;
        }

        return DB::transaction(function () use ($sale, $input) {
            $existingCreditQuery = Credit::query()->where('sale_id', $sale->id);
            if (DB::transactionLevel() > 0) {
                $existingCreditQuery->lockForUpdate();
            }

            $existingCredit = $existingCreditQuery->first();
            if ($existingCredit) {
                return $existingCredit->fresh($this->creditDetailRelations());
            }

            $config = $this->getCustomerCreditConfigOrFail((int) $sale->customer_id, true);
            $interestRate = $this->resolveInterestRate($input, $config);
            $installments = $this->resolveInstallments($input, $config);
            $creditPrincipalAmount = $this->resolveSaleCreditPrincipal($sale, $input);

            if ($creditPrincipalAmount <= 0) {
                throw new UnprocessableEntityHttpException(
                    'El saldo del credito debe ser mayor a cero para registrar una venta a credito.'
                );
            }

            $this->assertCustomerCanUseCreditWithConfig(
                $config,
                $creditPrincipalAmount,
                $interestRate,
                true
            );

            $credit = $this->storeCreditRecord([
                'sale_id' => $sale->id,
                'customer_id' => $sale->customer_id,
                'total_amount' => $creditPrincipalAmount,
                'interest_rate' => $interestRate,
                'installments' => $installments,
                'credit_type' => $input['credit_type'] ?? Credit::TYPE_AUTOMATIC,
                'start_date' => $input['credit_start_date'] ?? $sale->date?->format('Y-m-d'),
                'due_date' => $input['credit_due_date'] ?? null,
                'note' => $input['note'] ?? null,
            ]);

            $this->log(
                $credit->id,
                'credito_creado',
                sprintf('Credito #%d generado automaticamente desde la venta #%d.', $credit->id, $sale->id)
            );

            $this->creditInventoryService->attachSaleItems($credit, $sale->loadMissing('saleItems'));

            return $credit->fresh($this->creditDetailRelations());
        });

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
            'credit_type' => $input['credit_type'] ?? Credit::TYPE_AUTOMATIC,
            'start_date' => $input['credit_start_date'] ?? $sale->date?->format('Y-m-d'),
            'due_date' => $input['credit_due_date'] ?? null,
            'note' => $input['note'] ?? null,
        ]);

        $this->log(
            $credit->id,
            'credito_creado',
            sprintf('Credito #%d generado automaticamente desde la venta #%d.', $credit->id, $sale->id)
        );

        $this->creditInventoryService->attachSaleItems($credit, $sale->loadMissing('saleItems'));

        return $credit->fresh($this->creditDetailRelations());
    }

    public function createManualCredit(array $data): Credit
    {
        $this->ensureCreditTablesExist();

        return DB::transaction(function () use ($data) {
            Customer::whereKey($data['customer_id'])->firstOrFail();
            $preparedItems = [];
            if (! empty($data['items']) && is_array($data['items'])) {
                $preparedItems = $this->creditInventoryService->prepareManualItems(
                    $data['items'],
                    (int) ($data['warehouse_id'] ?? 0)
                );
                $data['total_amount'] = $this->creditInventoryService->calculatePreparedItemsTotal($preparedItems);
            }

            $config = $this->getCustomerCreditConfigOrFail((int) $data['customer_id'], true);
            $interestRate = $this->resolveInterestRate($data, $config, 'interest_rate');
            $installments = $this->resolveInstallments($data, $config, 'installments');

            $this->assertCustomerCanUseCreditWithConfig(
                $config,
                (float) $data['total_amount'],
                $interestRate,
                true
            );

            $credit = $this->storeCreditRecord([
                'sale_id' => null,
                'customer_id' => (int) $data['customer_id'],
                'total_amount' => (float) $data['total_amount'],
                'interest_rate' => $interestRate,
                'installments' => $installments,
                'credit_type' => $data['credit_type'] ?? Credit::TYPE_MANUAL,
                'start_date' => $data['start_date'] ?? now()->format('Y-m-d'),
                'due_date' => $data['due_date'] ?? null,
                'note' => $data['note'] ?? null,
            ]);

            if (! empty($preparedItems)) {
                $this->creditInventoryService->persistManualItems($credit, $preparedItems);
            }

            $this->log(
                $credit->id,
                'credito_manual',
                sprintf('Credito #%d creado manualmente para el cliente #%d.', $credit->id, $credit->customer_id)
            );

            return $credit->fresh($this->creditDetailRelations());

            $config = $this->assertCustomerCanUseCredit((int) $data['customer_id'], (float) $data['total_amount']);
            $interestRate = $this->resolveInterestRate($data, $config, 'interest_rate');
            $installments = $this->resolveInstallments($data, $config, 'installments');

            $credit = $this->storeCreditRecord([
                'sale_id' => null,
                'customer_id' => (int) $data['customer_id'],
                'total_amount' => (float) $data['total_amount'],
                'interest_rate' => $interestRate,
                'installments' => $installments,
                'credit_type' => $data['credit_type'] ?? Credit::TYPE_MANUAL,
                'start_date' => $data['start_date'] ?? now()->format('Y-m-d'),
                'due_date' => $data['due_date'] ?? null,
                'note' => $data['note'] ?? null,
            ]);

            if (! empty($preparedItems)) {
                $this->creditInventoryService->persistManualItems($credit, $preparedItems);
            }

            $this->log(
                $credit->id,
                'credito_manual',
                sprintf('Credito #%d creado manualmente para el cliente #%d.', $credit->id, $credit->customer_id)
            );

            return $credit->fresh($this->creditDetailRelations());
        });
    }

    public function updateCreditTerms(Credit $credit, array $data): Credit
    {
        $this->ensureFlexibleCreditSupport();

        return DB::transaction(function () use ($credit, $data) {
            $this->refreshStatuses();
            $credit = $credit->fresh($this->creditDetailRelations());

            $this->assertCreditCanBeEditedDirectly($credit);

            $oldTerms = $this->snapshotCreditTerms($credit);
            $plan = $this->resolveCreditPlan(
                $data,
                round((float) $credit->total_amount, 2),
                [
                    'note' => array_key_exists('note', $data) ? $data['note'] : $credit->note,
                    'credit_type' => $data['credit_type'] ?? $this->resolveStoredCreditType($credit),
                ]
            );

            $updatedCredit = $this->applyCreditPlan($credit, [
                'total_amount' => round((float) $credit->total_amount, 2),
                'principal_balance' => round((float) $credit->total_amount, 2),
                'balance' => $plan['total_with_interest'],
                'interest_rate' => $plan['interest_rate'],
                'total_with_interest' => $plan['total_with_interest'],
                'installments' => $plan['installments'],
                'credit_type' => $plan['credit_type'],
                'start_date' => $plan['start_date'],
                'due_date' => $plan['due_date'],
                'note' => $plan['note'],
            ]);

            $this->logCreditMutation(
                $updatedCredit,
                $oldTerms,
                $this->snapshotCreditTerms($updatedCredit),
                'credito_editado'
            );

            return $updatedCredit->fresh($this->creditDetailRelations());
        });
    }

    public function restructureCredit(Credit $credit, array $data): Credit
    {
        $this->ensureFlexibleCreditSupport();

        return DB::transaction(function () use ($credit, $data) {
            $this->refreshStatuses();
            $credit = $credit->fresh($this->creditDetailRelations());

            $this->assertCreditCanBeRestructured($credit);

            $currentBalance = round((float) $credit->balance, 2);
            $oldTerms = $this->snapshotCreditTerms($credit);
            $plan = $this->resolveCreditPlan(
                $data,
                $currentBalance,
                [
                    'note' => array_key_exists('note', $data) ? $data['note'] : $credit->note,
                    'credit_type' => $data['credit_type'] ?? $this->resolveStoredCreditType($credit),
                ]
            );

            $updatedCredit = $this->applyCreditPlan($credit, [
                'total_amount' => $currentBalance,
                'principal_balance' => $currentBalance,
                'balance' => $plan['total_with_interest'],
                'interest_rate' => $plan['interest_rate'],
                'total_with_interest' => $plan['total_with_interest'],
                'installments' => $plan['installments'],
                'credit_type' => $plan['credit_type'],
                'start_date' => $plan['start_date'],
                'due_date' => $plan['due_date'],
                'note' => $plan['note'],
                'restructured' => true,
                'restructured_at' => now(),
                'previous_balance' => $currentBalance,
            ]);

            CreditRestructure::create([
                'credit_id' => $updatedCredit->id,
                'old_balance' => $currentBalance,
                'new_balance' => $plan['total_with_interest'],
                'old_terms' => $this->encodeTermsSnapshot($oldTerms),
                'new_terms' => $this->encodeTermsSnapshot($this->snapshotCreditTerms($updatedCredit)),
                'reason' => $data['reason'] ?? null,
            ]);

            $this->logCreditMutation(
                $updatedCredit,
                $oldTerms,
                $this->snapshotCreditTerms($updatedCredit),
                'credito_reestructurado',
                $data['reason'] ?? null
            );

            return $updatedCredit->fresh($this->creditDetailRelations());
        });
    }

    public function recordPayment(Credit $credit, array $data): Credit
    {
        $this->ensureCreditTablesExist();

        return DB::transaction(function () use ($credit, $data) {
            $credit = Credit::query()
                ->lockForUpdate()
                ->findOrFail($credit->id);
            $this->syncInstallmentStatusesForCredit($credit->id, true);
            $this->syncSingleCreditStatus($credit);
            $credit->refresh();

            $amount = round((float) ($data['amount'] ?? 0), 2);
            if ($amount <= 0) {
                throw new UnprocessableEntityHttpException('El monto del pago debe ser mayor a cero.');
            }

            $currentBalance = round((float) $credit->balance, 2);
            if ($currentBalance <= 0) {
                throw new UnprocessableEntityHttpException('Este credito ya no tiene saldo pendiente.');
            }

            if ($amount > $currentBalance) {
                throw new UnprocessableEntityHttpException('El pago no puede ser mayor al saldo pendiente.');
            }

            $paymentType = $this->resolvePaymentType($data) ?? SalesPayment::OTHER;
            $paymentMethod = $this->resolvePaymentMethodLabel($data, $paymentType);
            $principalComponent = $this->resolvePrincipalComponent($credit, $amount);
            $interestComponent = round(max($amount - $principalComponent, 0), 2);

            $paymentDistribution = $this->applyPaymentToInstallments($credit, $amount, true);
            if ($paymentDistribution['remaining_amount'] > 0) {
                throw new UnprocessableEntityHttpException(
                    'No fue posible distribuir todo el pago en las cuotas pendientes del credito.'
                );
            }

            $newBalance = round((float) $paymentDistribution['outstanding_balance'], 2);
            $newPrincipalBalance = round(max((float) $credit->principal_balance - $principalComponent, 0), 2);
            if ($newBalance <= 0) {
                $newPrincipalBalance = 0;
            } else {
                $newPrincipalBalance = round(min($newPrincipalBalance, $newBalance), 2);
            }

            $credit->update([
                'principal_balance' => $newPrincipalBalance,
                'balance' => $newBalance,
            ]);

            $this->syncInstallmentStatusesForCredit($credit->id, true);
            $this->syncSingleCreditStatus($credit);
            $credit->refresh();

            $payment = CreditPayment::create([
                'credit_id' => $credit->id,
                'amount' => $amount,
                'payment_type' => $paymentType,
                'payment_method' => $paymentMethod,
                'note' => isset($data['note']) ? trim((string) $data['note']) ?: null : null,
            ]);

            $this->syncCustomerBalance((int) $credit->customer_id, true);
            $this->syncLegacySalePayment($credit, $payment, $principalComponent, $paymentType);
            $this->creditCashMovementService->recordPaymentMovement(
                $credit,
                $payment,
                $principalComponent,
                $interestComponent,
                $paymentType,
                $paymentMethod
            );

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

            return $credit->fresh($this->creditDetailRelations());
        }, 3);
    }

    public function recordReturn(Credit $credit, array $data): Credit
    {
        $this->ensureCreditTablesExist();

        return DB::transaction(function () use ($credit, $data) {
            $credit = $credit->fresh($this->creditDetailRelations());
            $this->creditInventoryService->recordReturn(
                $credit,
                $data['items'] ?? [],
                $data['note'] ?? null
            );

            $this->log(
                $credit->id,
                'devolucion_registrada',
                'Se registró una devolución de productos del crédito.'
            );

            return $credit->fresh($this->creditDetailRelations());
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
                    'allow_exceed' => false,
                    'interest_rate' => round((float) ($data['interest_rate'] ?? 0), 2),
                    'max_installments' => max((int) ($data['max_installments'] ?? 1), 1),
                    'status' => $data['status'] ?? CustomerCreditConfig::STATUS_ACTIVE,
                ]
            );

            $this->syncCustomerBalance((int) $config->customer_id);

            return $config->fresh('customer');
        });
    }

    public function checkLimit(
        int $customerId,
        float $requestedAmount,
        ?float $requestedInterestRate = null
    ): array
    {
        if (! $this->creditTablesExist()) {
            return [
                'allowed' => false,
                'message' => 'El modulo de creditos requiere ejecutar sus migraciones.',
                'credit_limit' => 0,
                'current_balance' => 0,
                'used_credit' => 0,
                'available_credit' => 0,
                'requested_amount' => round((float) $requestedAmount, 2),
                'requested_principal_amount' => round((float) $requestedAmount, 2),
                'requested_interest_rate' => round((float) ($requestedInterestRate ?? 0), 2),
                'projected_interest_amount' => 0,
                'next_balance' => 0,
                'interest_rate' => 0,
                'max_installments' => 1,
                'has_overdue_credits' => false,
                'overdue_credits' => 0,
                'can_create' => false,
                'allow_exceed' => false,
                'status' => null,
            ];
        }

        $config = $this->findCustomerCreditConfig($customerId);
        if (! $config) {
            return [
                'allowed' => false,
                'message' => 'El cliente no tiene configuracion de credito.',
                'credit_limit' => 0,
                'current_balance' => 0,
                'used_credit' => 0,
                'available_credit' => 0,
                'requested_amount' => round((float) $requestedAmount, 2),
                'requested_principal_amount' => round((float) $requestedAmount, 2),
                'requested_interest_rate' => round((float) ($requestedInterestRate ?? 0), 2),
                'projected_interest_amount' => 0,
                'next_balance' => 0,
                'interest_rate' => 0,
                'max_installments' => 1,
                'has_overdue_credits' => false,
                'overdue_credits' => 0,
                'can_create' => false,
                'allow_exceed' => false,
                'status' => null,
            ];
        }

        $this->refreshStatuses();
        $snapshot = $this->buildCreditAvailabilitySnapshot(
            $config,
            $requestedAmount,
            $requestedInterestRate
        );

        return [
            'allowed' => $snapshot['allowed'],
            'message' => $snapshot['message'],
            /*
            'message' => $allowed ? 'Credito disponible.' : 'Límite de crédito excedido',
            */
            'credit_limit' => $snapshot['credit_limit'],
            'current_balance' => $snapshot['current_balance'],
            'used_credit' => $snapshot['used_credit'],
            'available_credit' => $snapshot['available_credit'],
            'requested_amount' => $snapshot['requested_amount'],
            'requested_principal_amount' => $snapshot['requested_principal_amount'],
            'requested_interest_rate' => $snapshot['requested_interest_rate'],
            'projected_interest_amount' => $snapshot['projected_interest_amount'],
            'next_balance' => $snapshot['next_balance'],
            'status' => $snapshot['status'],
            'allow_exceed' => $snapshot['allow_exceed'],
            'interest_rate' => $snapshot['interest_rate'],
            'max_installments' => $snapshot['max_installments'],
            'has_overdue_credits' => $snapshot['has_overdue_credits'],
            'overdue_credits' => $snapshot['overdue_credits'],
            'can_create' => $snapshot['can_create'],
            'message' => $snapshot['message'],
        ];
    }

    public function refreshStatuses(): void
    {
        if (! $this->creditTablesExist()) {
            return;
        }

        $today = Carbon::today()->toDateString();
        $supportsPartialStatus = $this->creditStatusSupportsPartial();

        Credit::where('balance', '<=', 0)->update(['status' => Credit::STATUS_PAID]);
        Credit::where('balance', '>', 0)
            ->whereDate('due_date', '<', $today)
            ->update(['status' => Credit::STATUS_OVERDUE]);
        if ($supportsPartialStatus) {
            Credit::where('balance', '>', 0)
                ->whereDate('due_date', '>=', $today)
                ->whereColumn('balance', '<', 'total_with_interest')
                ->update(['status' => Credit::STATUS_PARTIAL]);
        }
        Credit::where('balance', '>', 0)
            ->whereDate('due_date', '>=', $today)
            ->when($supportsPartialStatus, function ($query) {
                $query->whereColumn('balance', '>=', 'total_with_interest');
            })
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

    public function syncCustomerBalance(int $customerId, bool $lockRows = false): float
    {
        if (! $this->creditTablesExist()) {
            return 0;
        }

        $currentBalance = $this->calculateCustomerUsedCredit($customerId, $lockRows);
        $config = $this->findCustomerCreditConfig($customerId, $lockRows);

        if ($config) {
            $this->persistCustomerBalance($config, $currentBalance);
        }

        return $currentBalance;
    }

    public function calculateCustomerUsedCredit(int $customerId, bool $lockRows = false): float
    {
        if (! $this->creditTablesExist()) {
            return 0;
        }

        $query = $this->customerOutstandingCreditsQuery($customerId);

        if ($lockRows && DB::transactionLevel() > 0) {
            $query->lockForUpdate();
        }

        return round((float) $query->sum('balance'), 2);
    }

    public function getAlertSummary(?User $user = null): array
    {
        if (! $this->creditTablesExist()) {
            return [
                'alert_days' => 3,
                'default_alert_days' => 3,
                'uses_user_preference' => false,
                'upcoming_count' => 0,
                'overdue_count' => 0,
                'total_alerts' => 0,
                'setup_required' => true,
            ];
        }

        $alertDaysMeta = $this->resolveCreditAlertDaysMeta($user);
        $today = Carbon::today()->toDateString();
        $upcomingUntil = Carbon::today()->addDays($alertDaysMeta['alert_days'])->toDateString();
        $baseQuery = $this->creditAlertsBaseQuery();

        $upcomingCount = (clone $baseQuery)
            ->where('due_date', '>=', $today)
            ->where('due_date', '<=', $upcomingUntil)
            ->count();

        $overdueCount = (clone $baseQuery)
            ->where('due_date', '<', $today)
            ->count();

        return [
            'alert_days' => $alertDaysMeta['alert_days'],
            'default_alert_days' => $alertDaysMeta['default_alert_days'],
            'uses_user_preference' => $alertDaysMeta['uses_user_preference'],
            'upcoming_count' => (int) $upcomingCount,
            'overdue_count' => (int) $overdueCount,
            'total_alerts' => (int) $upcomingCount + (int) $overdueCount,
            'setup_required' => false,
        ];
    }

    public function getAlertFeed(?User $user = null): array
    {
        if (! $this->creditTablesExist()) {
            return [
                'summary' => $this->getAlertSummary($user),
                'upcoming' => [],
                'overdue' => [],
                'setup_required' => true,
            ];
        }

        $summary = $this->getAlertSummary($user);
        $today = Carbon::today();
        $todayString = $today->toDateString();
        $upcomingUntil = $today->copy()->addDays((int) $summary['alert_days'])->toDateString();
        $alertQuery = $this->creditAlertsBaseQuery()
            ->select([
                'id',
                'sale_id',
                'customer_id',
                'balance',
                'total_with_interest',
                'due_date',
                'status',
            ])
            ->with([
                'customer:id,name,phone',
                'sale:id,reference_code',
            ]);

        $upcoming = (clone $alertQuery)
            ->where('due_date', '>=', $todayString)
            ->where('due_date', '<=', $upcomingUntil)
            ->orderBy('due_date')
            ->orderBy('id')
            ->get()
            ->map(fn (Credit $credit) => $this->transformCreditAlertRow($credit, 'por_vencer', $today))
            ->values()
            ->all();

        $overdue = (clone $alertQuery)
            ->where('due_date', '<', $todayString)
            ->orderBy('due_date')
            ->orderBy('id')
            ->get()
            ->map(fn (Credit $credit) => $this->transformCreditAlertRow($credit, 'vencido', $today))
            ->values()
            ->all();

        return [
            'summary' => $summary,
            'upcoming' => $upcoming,
            'overdue' => $overdue,
            'setup_required' => false,
        ];
    }

    public function updateAlertDaysPreference(User $user, int $alertDays): array
    {
        $alertDays = max($alertDays, 0);

        if ($this->userCreditAlertDaysColumnExists()) {
            $user->update([
                'credit_alert_days' => $alertDays,
            ]);
        } else {
            Setting::query()->updateOrCreate(
                ['key' => $this->userCreditAlertDaysSettingKey($user)],
                ['value' => $alertDays]
            );
            $user->setAttribute('credit_alert_days', $alertDays);
        }

        return $this->getAlertSummary($user->fresh());
    }

    public function getDashboardData(array $filters = []): array
    {
        if (! $this->creditTablesExist()) {
            return [
                'summary' => [
                    'total_credits' => 0,
                    'pending_credits' => 0,
                    'partial_credits' => 0,
                    'active_credits' => 0,
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
        $today = Carbon::today()->toDateString();

        $creditsQuery = Credit::query()
            ->with([
                'customer:id,name,email,phone',
                'sale:id,reference_code',
            ])
            ->withCount(array_values(array_filter([
                'payments',
                $this->creditRestructureTableExists() ? 'restructures' : null,
            ])))
            ->orderByDesc('id');

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
        if ($status) {
            $credits = $credits
                ->filter(fn (Credit $credit) => $this->resolveComputedCreditStatus($credit) === $status)
                ->values();
        }
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

        $usedCreditByCustomer = Credit::query()
            ->selectRaw('customer_id, ROUND(SUM(balance), 2) as used_credit')
            ->where('balance', '>', 0)
            ->groupBy('customer_id')
            ->pluck('used_credit', 'customer_id');

        $overdueBalanceByCustomer = Credit::query()
            ->selectRaw('customer_id, ROUND(SUM(balance), 2) as overdue_balance')
            ->where('balance', '>', 0)
            ->whereDate('due_date', '<', $today)
            ->groupBy('customer_id')
            ->pluck('overdue_balance', 'customer_id');

        $creditStatuses = $credits->mapWithKeys(
            fn (Credit $credit) => [$credit->id => $this->resolveComputedCreditStatus($credit)]
        );

        $creditRows = $credits->map(function (Credit $credit) {
            return $this->transformCreditRow($credit);
        })->values()->all();

        $configRows = $customerConfigs->map(function (CustomerCreditConfig $config) use ($usedCreditByCustomer, $overdueBalanceByCustomer) {
            $usedCredit = round((float) ($usedCreditByCustomer[$config->customer_id] ?? 0), 2);
            $overdueBalance = round((float) ($overdueBalanceByCustomer[$config->customer_id] ?? 0), 2);

            return [
                'id' => $config->id,
                'customer_id' => $config->customer_id,
                'customer_name' => optional($config->customer)->name,
                'customer_phone' => optional($config->customer)->phone,
                'credit_limit' => (float) $config->credit_limit,
                'used' => $usedCredit,
                'current_balance' => $usedCredit,
                'available' => round((float) $config->credit_limit - $usedCredit, 2),
                'interest_rate' => (float) $config->interest_rate,
                'max_installments' => (int) $config->max_installments,
                'allow_exceed' => false,
                'status' => $config->status,
                'overdue_balance' => $overdueBalance,
                'has_overdue_credits' => $overdueBalance > 0,
                'updated_at' => optional($config->updated_at)->format('Y-m-d H:i:s'),
            ];
        })->values()->all();

        $interestReport = $credits->map(function (Credit $credit) {
            $plannedInterest = round((float) $credit->total_with_interest - (float) $credit->total_amount, 2);
            $paidPrincipal = round((float) $credit->total_amount - (float) $credit->principal_balance, 2);
            $paidTotal = round((float) $credit->total_with_interest - (float) $credit->balance, 2);
            $collectedInterest = round(max($paidTotal - $paidPrincipal, 0), 2);
            $status = $this->resolveComputedCreditStatus($credit);

            return [
                'credit_id' => $credit->id,
                'customer_name' => optional($credit->customer)->name,
                'planned_interest' => $plannedInterest,
                'collected_interest' => $collectedInterest,
                'pending_interest' => round(max($plannedInterest - $collectedInterest, 0), 2),
                'status' => $status,
            ];
        })->values()->all();

        return [
            'summary' => [
                'total_credits' => $credits->count(),
                'pending_credits' => $creditStatuses->filter(
                    fn (string $value) => $value === Credit::STATUS_PENDING
                )->count(),
                'partial_credits' => $creditStatuses->filter(
                    fn (string $value) => $value === Credit::STATUS_PARTIAL
                )->count(),
                'active_credits' => $creditStatuses->filter(
                    fn (string $value) => in_array($value, Credit::OPEN_STATUSES, true)
                )->count(),
                'overdue_credits' => $creditStatuses->filter(
                    fn (string $value) => $value === Credit::STATUS_OVERDUE
                )->count(),
                'pending_balance' => round((float) $credits->sum('balance'), 2),
                'principal_in_use' => round((float) $credits->sum('principal_balance'), 2),
                'overdue_balance' => round((float) $credits
                    ->filter(fn (Credit $credit) => ($creditStatuses[$credit->id] ?? null) === Credit::STATUS_OVERDUE)
                    ->sum('balance'), 2),
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
        $credit = $credit->fresh($this->creditDetailRelations());

        $creditRow = $this->transformCreditRow($credit);
        $creditRow['installments_count'] = (int) $credit->installments;
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
        $creditRow['restructures'] = $this->creditRestructureTableExists()
            ? $credit->restructures->map(function (CreditRestructure $restructure) {
                return [
                    'id' => $restructure->id,
                    'old_balance' => (float) $restructure->old_balance,
                    'new_balance' => (float) $restructure->new_balance,
                    'old_terms' => $this->decodeTermsSnapshot($restructure->old_terms),
                    'new_terms' => $this->decodeTermsSnapshot($restructure->new_terms),
                    'reason' => $restructure->reason,
                    'created_at' => optional($restructure->created_at)->format('Y-m-d H:i:s'),
                ];
            })->values()->all()
            : [];
        $creditRow['items'] = $this->creditInventoryService->getDetailItems($credit);
        $creditRow['returns'] = $this->creditInventoryService->getDetailReturns($credit);

        return $creditRow;
    }

    private function storeCreditRecord(array $data): Credit
    {
        $startDate = Carbon::parse($data['start_date'] ?? now())->startOfDay();
        $creditType = $this->normalizeCreditType($data['credit_type'] ?? Credit::TYPE_AUTOMATIC);
        $installments = $this->normalizeInstallments((int) ($data['installments'] ?? 1), $creditType);
        $dueDate = $this->resolveDueDate($startDate, $data['due_date'] ?? null, $installments);
        $interestRate = round((float) ($data['interest_rate'] ?? 0), 2);
        $principalAmount = round((float) ($data['total_amount'] ?? 0), 2);
        $totalWithInterest = round($principalAmount + ($principalAmount * $interestRate / 100), 2);

        $payload = [
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
        ];

        if ($this->creditsTableHasColumn('credit_type')) {
            $payload['credit_type'] = $creditType;
        }

        if ($this->creditsTableHasColumn('restructured')) {
            $payload['restructured'] = false;
            $payload['restructured_at'] = null;
            $payload['previous_balance'] = null;
        }

        $credit = Credit::create($payload);

        $this->createInstallmentsForCredit($credit, $startDate, $dueDate, $installments, $creditType);
        $this->syncSingleCreditStatus($credit);
        $this->syncCustomerBalance((int) $credit->customer_id);

        return $credit;
    }

    private function createInstallmentsForCredit(
        Credit $credit,
        Carbon $startDate,
        Carbon $dueDate,
        int $installments,
        ?string $creditType = null
    ): void
    {
        $creditType = $this->normalizeCreditType($creditType ?? $this->resolveStoredCreditType($credit));
        if ($creditType === Credit::TYPE_FREE) {
            CreditInstallment::create([
                'credit_id' => $credit->id,
                'installment_number' => 1,
                'amount' => round((float) $credit->total_with_interest, 2),
                'paid_amount' => 0,
                'due_date' => $dueDate->format('Y-m-d'),
                'status' => CreditInstallment::STATUS_PENDING,
            ]);

            return;
        }

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

    private function applyPaymentToInstallments(Credit $credit, float $amount, bool $lockRows = false): array
    {
        $remainingAmount = round($amount, 2);
        $installmentsQuery = CreditInstallment::where('credit_id', $credit->id)
            ->orderBy('due_date')
            ->orderBy('installment_number')
            ->orderBy('id');
        if ($lockRows && DB::transactionLevel() > 0) {
            $installmentsQuery->lockForUpdate();
        }

        $installments = $installmentsQuery->get();
        if ($installments->isEmpty()) {
            throw new UnprocessableEntityHttpException(
                'El credito no tiene cuotas configuradas para aplicar el pago.'
            );
        }

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

        return [
            'remaining_amount' => round(max($remainingAmount, 0), 2),
            'outstanding_balance' => round((float) $installments->sum(function (CreditInstallment $installment) {
                return max((float) $installment->amount - (float) $installment->paid_amount, 0);
            }), 2),
        ];
    }

    private function syncSingleCreditStatus(Credit $credit): void
    {
        $credit->refresh();
        $status = $this->normalizeCreditStatusForPersistence(
            $credit,
            $this->resolveComputedCreditStatus($credit)
        );

        if ($credit->status !== $status) {
            $credit->update(['status' => $status]);
        }
    }

    private function syncLegacySalePayment(
        Credit $credit,
        CreditPayment $payment,
        float $principalComponent,
        ?int $paymentType
    ): void
    {
        if (! $credit->sale_id || $principalComponent <= 0) {
            return;
        }

        SalesPayment::create([
            'sale_id' => $credit->sale_id,
            'reference' => $this->creditCashMovementService->legacySalesPaymentReference($payment),
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

        if (abs($paymentAmount - $actualBalance) <= 0.01) {
            return $principalBalance;
        }

        $ratio = $principalBalance / $actualBalance;

        return round(min($principalBalance, $paymentAmount * $ratio), 2);
    }

    private function resolveInterestRate(array $input, CustomerCreditConfig $config, string $field = 'credit_interest_rate'): float
    {
        return round((float) ($input[$field] ?? $config->interest_rate ?? 0), 2);
    }

    private function resolveInstallments(array $input, CustomerCreditConfig $config, string $field = 'credit_installments'): int
    {
        $installments = max((int) ($input[$field] ?? $config->max_installments ?? 1), 1);
        $maxInstallments = max((int) ($config->max_installments ?? 1), 1);

        if ($installments > $maxInstallments) {
            throw new UnprocessableEntityHttpException(
                sprintf('Las cuotas no pueden exceder el maximo configurado del cliente (%d).', $maxInstallments)
            );
        }

        return $installments;
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

    private function getCustomerCreditConfigOrFail(int $customerId, bool $lockRow = false): CustomerCreditConfig
    {
        $config = $this->findCustomerCreditConfig($customerId, $lockRow);
        if (! $config) {
            throw new UnprocessableEntityHttpException('El cliente no tiene configuracion de credito.');
        }

        return $config;
    }

    private function assertCustomerCanUseCreditWithConfig(
        CustomerCreditConfig $config,
        float $requestedPrincipalAmount,
        ?float $requestedInterestRate = null,
        bool $lockRows = false
    ): CustomerCreditConfig
    {
        $snapshot = $this->buildCreditAvailabilitySnapshot(
            $config,
            $requestedPrincipalAmount,
            $requestedInterestRate,
            $lockRows
        );
        if (! $snapshot['allowed']) {
            throw new UnprocessableEntityHttpException($snapshot['message']);
        }

        $config->setAttribute('available_credit', $snapshot['available_credit']);
        $config->setAttribute('used_credit', $snapshot['used_credit']);
        $config->setAttribute('has_overdue_credits', $snapshot['has_overdue_credits']);
        $config->setAttribute('requested_interest_rate', $snapshot['requested_interest_rate']);

        return $config;
    }

    private function buildCreditAvailabilitySnapshot(
        CustomerCreditConfig $config,
        float $requestedPrincipalAmount = 0,
        ?float $requestedInterestRate = null,
        bool $lockRows = false
    ): array
    {
        $requestedPrincipalAmount = round(max($requestedPrincipalAmount, 0), 2);
        $requestedInterestRate = round(
            max($requestedInterestRate ?? (float) ($config->interest_rate ?? 0), 0),
            2
        );
        $requestedAmount = $this->calculateProjectedCreditBalance(
            $requestedPrincipalAmount,
            $requestedInterestRate
        );
        $snapshot = $this->buildCustomerCreditSnapshot($config, $requestedAmount, $lockRows);
        $snapshot['requested_principal_amount'] = $requestedPrincipalAmount;
        $snapshot['requested_interest_rate'] = $requestedInterestRate;
        $snapshot['projected_interest_amount'] = round(
            max($requestedAmount - $requestedPrincipalAmount, 0),
            2
        );
        $snapshot['message'] = $this->resolveCreditAvailabilityMessage($config, $snapshot);

        return $snapshot;
    }

    private function calculateProjectedCreditBalance(float $principalAmount, float $interestRate): float
    {
        $principalAmount = round(max($principalAmount, 0), 2);
        $interestRate = round(max($interestRate, 0), 2);

        return round($principalAmount + ($principalAmount * $interestRate / 100), 2);
    }

    private function applyCreditPlan(Credit $credit, array $plan): Credit
    {
        $payload = [
            'total_amount' => $plan['total_amount'],
            'principal_balance' => $plan['principal_balance'],
            'balance' => $plan['balance'],
            'interest_rate' => $plan['interest_rate'],
            'total_with_interest' => $plan['total_with_interest'],
            'installments' => $plan['installments'],
            'status' => Credit::STATUS_PENDING,
            'start_date' => $plan['start_date']->format('Y-m-d'),
            'due_date' => $plan['due_date']->format('Y-m-d'),
            'note' => $plan['note'],
        ];

        if ($this->creditsTableHasColumn('credit_type')) {
            $payload['credit_type'] = $plan['credit_type'];
        }

        if ($this->creditsTableHasColumn('restructured') && array_key_exists('restructured', $plan)) {
            $payload['restructured'] = (bool) $plan['restructured'];
            $payload['restructured_at'] = $plan['restructured_at'] ?? null;
            $payload['previous_balance'] = $plan['previous_balance'] ?? null;
        }

        $credit->update($payload);

        CreditInstallment::where('credit_id', $credit->id)->delete();

        $credit->refresh();
        $this->createInstallmentsForCredit(
            $credit,
            $plan['start_date'],
            $plan['due_date'],
            $plan['installments'],
            $plan['credit_type']
        );
        $this->syncSingleCreditStatus($credit);
        $this->syncCustomerBalance((int) $credit->customer_id);

        return $credit->fresh($this->creditDetailRelations());
    }

    private function resolveCreditPlan(array $data, float $baseAmount, array $defaults = []): array
    {
        if ($baseAmount <= 0) {
            throw new UnprocessableEntityHttpException('El saldo no coincide con las nuevas condiciones.');
        }

        $creditType = $this->normalizeCreditType($data['credit_type'] ?? $defaults['credit_type'] ?? Credit::TYPE_AUTOMATIC);
        $installments = $this->normalizeInstallments((int) ($data['installments'] ?? 1), $creditType);
        $startDate = Carbon::parse($data['start_date'] ?? now())->startOfDay();
        $dueDate = $this->resolveDueDate($startDate, $data['due_date'] ?? null, $installments);
        $interestRate = round((float) ($data['interest_rate'] ?? 0), 2);
        $totalWithInterest = round($baseAmount + ($baseAmount * $interestRate / 100), 2);

        return [
            'credit_type' => $creditType,
            'installments' => $installments,
            'interest_rate' => $interestRate,
            'start_date' => $startDate,
            'due_date' => $dueDate,
            'note' => $defaults['note'] ?? ($data['note'] ?? null),
            'total_with_interest' => $totalWithInterest,
        ];
    }

    private function assertCreditCanBeEditedDirectly(Credit $credit): void
    {
        if ($this->creditIsPaid($credit)) {
            throw new UnprocessableEntityHttpException('Este credito ya esta pagado y no puede modificarse.');
        }

        if ($this->creditHasRegisteredPayments($credit)) {
            throw new UnprocessableEntityHttpException(
                'Este credito ya tiene pagos registrados y solo puede modificarse mediante reestructuracion.'
            );
        }

        if ($this->creditWasRestructured($credit)) {
            throw new UnprocessableEntityHttpException(
                'Este credito ya fue reestructurado y debe actualizarse nuevamente mediante reestructuracion.'
            );
        }
    }

    private function assertCreditCanBeRestructured(Credit $credit): void
    {
        if ($this->creditIsPaid($credit) || round((float) $credit->balance, 2) <= 0) {
            throw new UnprocessableEntityHttpException('Este credito ya esta pagado y no puede modificarse.');
        }
    }

    private function snapshotCreditTerms(Credit $credit): array
    {
        $credit->loadMissing(['installmentItems', 'payments']);

        return [
            'credit_id' => (int) $credit->id,
            'credit_type' => $this->resolveStoredCreditType($credit),
            'credit_type_label' => $this->creditTypeLabel($this->resolveStoredCreditType($credit)),
            'total_amount' => round((float) $credit->total_amount, 2),
            'principal_balance' => round((float) $credit->principal_balance, 2),
            'balance' => round((float) $credit->balance, 2),
            'interest_rate' => round((float) $credit->interest_rate, 2),
            'total_with_interest' => round((float) $credit->total_with_interest, 2),
            'installments' => (int) $credit->installments,
            'status' => $credit->status,
            'start_date' => optional($credit->start_date)->format('Y-m-d'),
            'due_date' => optional($credit->due_date)->format('Y-m-d'),
            'note' => $credit->note,
            'payments_count' => $credit->relationLoaded('payments')
                ? $credit->payments->count()
                : (int) $credit->payments()->count(),
            'installment_rows' => $credit->relationLoaded('installmentItems')
                ? $credit->installmentItems->map(function (CreditInstallment $installment) {
                    return [
                        'installment_number' => (int) $installment->installment_number,
                        'amount' => round((float) $installment->amount, 2),
                        'paid_amount' => round((float) $installment->paid_amount, 2),
                        'due_date' => optional($installment->due_date)->format('Y-m-d'),
                        'status' => $installment->status,
                    ];
                })->values()->all()
                : [],
        ];
    }

    private function logCreditMutation(
        Credit $credit,
        array $oldTerms,
        array $newTerms,
        string $action,
        ?string $reason = null
    ): void
    {
        $summary = sprintf(
            'Se cambio de %s (%d cuotas, %.2f%%) a %s (%d cuotas, %.2f%%).',
            $oldTerms['credit_type_label'],
            $oldTerms['installments'],
            $oldTerms['interest_rate'],
            $newTerms['credit_type_label'],
            $newTerms['installments'],
            $newTerms['interest_rate']
        );

        $details = [
            $summary,
            sprintf(
                'Fechas: %s -> %s / %s -> %s.',
                $oldTerms['start_date'] ?? '-',
                $newTerms['start_date'] ?? '-',
                $oldTerms['due_date'] ?? '-',
                $newTerms['due_date'] ?? '-'
            ),
        ];

        if ($reason) {
            $details[] = 'Motivo: ' . $reason;
        }

        $this->log($credit->id, $action, implode(' ', $details));

        if (($oldTerms['credit_type'] ?? null) !== ($newTerms['credit_type'] ?? null)) {
            $this->log(
                $credit->id,
                'tipo_credito_actualizado',
                sprintf(
                    'Tipo de credito cambiado de %s a %s.',
                    $oldTerms['credit_type_label'],
                    $newTerms['credit_type_label']
                )
            );
        }

        if ((int) ($oldTerms['installments'] ?? 0) !== (int) ($newTerms['installments'] ?? 0)) {
            $this->log(
                $credit->id,
                'cuotas_actualizadas',
                sprintf(
                    'Se cambio de %d cuotas a %d cuotas.',
                    $oldTerms['installments'],
                    $newTerms['installments']
                )
            );
        }

        if ((float) ($oldTerms['interest_rate'] ?? 0) !== (float) ($newTerms['interest_rate'] ?? 0)) {
            $this->log(
                $credit->id,
                'interes_actualizado',
                sprintf(
                    'Interes actualizado de %.2f%% a %.2f%%.',
                    $oldTerms['interest_rate'],
                    $newTerms['interest_rate']
                )
            );
        }
    }

    private function encodeTermsSnapshot(array $terms): ?string
    {
        $encoded = json_encode($terms);

        return $encoded === false ? null : $encoded;
    }

    private function decodeTermsSnapshot(?string $terms): ?array
    {
        if (! $terms) {
            return null;
        }

        $decoded = json_decode($terms, true);

        return is_array($decoded) ? $decoded : null;
    }

    private function resolveStoredCreditType(Credit $credit): string
    {
        $rawType = trim((string) $credit->getAttribute('credit_type'));

        if ($rawType !== '') {
            return $this->normalizeCreditType($rawType);
        }

        return $credit->sale_id ? Credit::TYPE_AUTOMATIC : Credit::TYPE_MANUAL;
    }

    private function normalizeCreditType(?string $creditType): string
    {
        return match (trim(strtolower((string) $creditType))) {
            Credit::TYPE_MANUAL => Credit::TYPE_MANUAL,
            Credit::TYPE_FREE => Credit::TYPE_FREE,
            default => Credit::TYPE_AUTOMATIC,
        };
    }

    private function normalizeInstallments(int $installments, string $creditType): int
    {
        if ($creditType === Credit::TYPE_FREE) {
            return 1;
        }

        return max($installments, 1);
    }

    private function creditTypeLabel(string $creditType): string
    {
        return match ($creditType) {
            Credit::TYPE_MANUAL => 'Manual',
            Credit::TYPE_FREE => 'Libre',
            default => 'Automatico',
        };
    }

    private function creditIsPaid(Credit $credit): bool
    {
        return $credit->status === Credit::STATUS_PAID || round((float) $credit->balance, 2) <= 0;
    }

    private function creditWasRestructured(Credit $credit): bool
    {
        return $this->creditsTableHasColumn('restructured')
            && (bool) $credit->getAttribute('restructured');
    }

    private function creditHasRegisteredPayments(Credit $credit): bool
    {
        $paymentsCount = $credit->getAttribute('payments_count');
        if ($paymentsCount !== null) {
            return (int) $paymentsCount > 0
                || round((float) $credit->balance, 2) < round((float) $credit->total_with_interest, 2);
        }

        if ($credit->relationLoaded('payments')) {
            $hasInstallmentPayments = $credit->relationLoaded('installmentItems')
                ? $credit->installmentItems->contains(function (CreditInstallment $installment) {
                    return round((float) $installment->paid_amount, 2) > 0;
                })
                : CreditInstallment::where('credit_id', $credit->id)->where('paid_amount', '>', 0)->exists();

            return $credit->payments->isNotEmpty()
                || $hasInstallmentPayments
                || round((float) $credit->balance, 2) < round((float) $credit->total_with_interest, 2);
        }

        return $credit->payments()->exists()
            || CreditInstallment::where('credit_id', $credit->id)->where('paid_amount', '>', 0)->exists();
    }

    private function creditRestructureTableExists(): bool
    {
        return Schema::hasTable('credit_restructures');
    }

    private function findCustomerCreditConfig(int $customerId, bool $lockRow = false): ?CustomerCreditConfig
    {
        $query = CustomerCreditConfig::query()->where('customer_id', $customerId);

        if ($lockRow && DB::transactionLevel() > 0) {
            $query->lockForUpdate();
        }

        return $query->first();
    }

    private function customerOutstandingCreditsQuery(int $customerId)
    {
        return Credit::query()
            ->where('customer_id', $customerId)
            ->where('balance', '>', 0);
    }

    private function buildCustomerCreditSnapshot(
        CustomerCreditConfig $config,
        float $requestedAmount = 0,
        bool $lockRows = false
    ): array
    {
        $usedCredit = $this->calculateCustomerUsedCredit((int) $config->customer_id, $lockRows);
        $this->persistCustomerBalance($config, $usedCredit);

        $requestedAmount = round(max($requestedAmount, 0), 2);
        $availableCredit = round((float) $config->credit_limit - $usedCredit, 2);
        $nextBalance = round($usedCredit + $requestedAmount, 2);
        $overdueCredits = $this->countCustomerOverdueCredits((int) $config->customer_id, $lockRows);
        $hasOverdueCredits = $overdueCredits > 0;
        $exceedsLimit = round($requestedAmount - $availableCredit, 2) > 0;
        $allowed = $config->status !== CustomerCreditConfig::STATUS_BLOCKED
            && ! $hasOverdueCredits
            && ! $exceedsLimit;

        $snapshot = [
            'allowed' => $allowed,
            'can_create' => $allowed,
            'credit_limit' => round((float) $config->credit_limit, 2),
            'current_balance' => $usedCredit,
            'used_credit' => $usedCredit,
            'available_credit' => $availableCredit,
            'requested_amount' => $requestedAmount,
            'next_balance' => $nextBalance,
            'status' => $config->status,
            'allow_exceed' => false,
            'interest_rate' => round((float) ($config->interest_rate ?? 0), 2),
            'max_installments' => max((int) ($config->max_installments ?? 1), 1),
            'has_overdue_credits' => $hasOverdueCredits,
            'overdue_credits' => $overdueCredits,
        ];

        $snapshot['message'] = $this->resolveCreditAvailabilityMessage($config, $snapshot);

        return $snapshot;
    }

    private function countCustomerOverdueCredits(int $customerId, bool $lockRows = false): int
    {
        if (! $this->creditTablesExist()) {
            return 0;
        }

        $query = Credit::query()
            ->where('customer_id', $customerId)
            ->where('balance', '>', 0)
            ->whereDate('due_date', '<', Carbon::today()->toDateString());

        if ($lockRows && DB::transactionLevel() > 0) {
            $query->lockForUpdate();
        }

        return (int) $query->count();
    }

    private function persistCustomerBalance(CustomerCreditConfig $config, float $currentBalance): void
    {
        $currentBalance = round($currentBalance, 2);

        if (round((float) $config->current_balance, 2) !== $currentBalance) {
            $config->update([
                'current_balance' => $currentBalance,
            ]);
        }

        $config->setAttribute('current_balance', $currentBalance);
    }

    private function resolveCreditAvailabilityMessage(CustomerCreditConfig $config, array $snapshot): string
    {
        if ($config->status === CustomerCreditConfig::STATUS_BLOCKED) {
            return 'El cliente esta bloqueado para compras al credito.';
        }

        if (! empty($snapshot['has_overdue_credits'])) {
            return 'El cliente esta moroso y no puede recibir nuevos creditos.';
        }

        if (round((float) $snapshot['requested_amount'] - (float) $snapshot['available_credit'], 2) > 0) {
            return sprintf(
                'Credito insuficiente. Disponible: %.2f, solicitado: %.2f (capital %.2f + interes %.2f).',
                (float) $snapshot['available_credit'],
                (float) $snapshot['requested_amount'],
                (float) ($snapshot['requested_principal_amount'] ?? $snapshot['requested_amount']),
                (float) ($snapshot['projected_interest_amount'] ?? 0)
            );
        }

        return 'Credito disponible.';
    }

    private function resolveComputedCreditStatus(Credit $credit): string
    {
        $balance = round((float) $credit->balance, 2);
        if ($balance <= 0) {
            return Credit::STATUS_PAID;
        }

        if ($credit->due_date && $credit->due_date->lt(Carbon::today())) {
            return Credit::STATUS_OVERDUE;
        }

        if (
            round((float) $credit->total_with_interest, 2) > 0
            && $balance < round((float) $credit->total_with_interest, 2)
        ) {
            return Credit::STATUS_PARTIAL;
        }

        return Credit::STATUS_PENDING;
    }

    private function normalizeCreditStatusForPersistence(Credit $credit, string $status): string
    {
        if ($status !== Credit::STATUS_PARTIAL || $this->creditStatusSupportsPartial()) {
            return $status;
        }

        return $credit->due_date && $credit->due_date->lt(Carbon::today())
            ? Credit::STATUS_OVERDUE
            : Credit::STATUS_PENDING;
    }

    private function creditStatusSupportsPartial(): bool
    {
        if ($this->creditStatusSupportsPartial !== null) {
            return $this->creditStatusSupportsPartial;
        }

        if (! Schema::hasTable('credits')) {
            return $this->creditStatusSupportsPartial = false;
        }

        if (DB::getDriverName() !== 'mysql') {
            return $this->creditStatusSupportsPartial = true;
        }

        $column = DB::selectOne("SHOW COLUMNS FROM credits LIKE 'status'");
        $type = strtolower((string) ($column->Type ?? ''));

        return $this->creditStatusSupportsPartial = str_contains($type, "'parcial'");
    }

    private function syncInstallmentStatusesForCredit(int $creditId, bool $lockRows = false): void
    {
        $query = CreditInstallment::query()
            ->where('credit_id', $creditId)
            ->orderBy('due_date')
            ->orderBy('installment_number')
            ->orderBy('id');

        if ($lockRows && DB::transactionLevel() > 0) {
            $query->lockForUpdate();
        }

        $today = Carbon::today();

        $query->get()->each(function (CreditInstallment $installment) use ($today) {
            $pendingAmount = round(max((float) $installment->amount - (float) $installment->paid_amount, 0), 2);
            $isPaid = $pendingAmount <= 0;
            $status = $isPaid
                ? CreditInstallment::STATUS_PAID
                : ($installment->due_date->lt($today) ? CreditInstallment::STATUS_LATE : CreditInstallment::STATUS_PENDING);

            $payload = [];

            if ($installment->status !== $status) {
                $payload['status'] = $status;
            }

            if ($isPaid && ! $installment->paid_at) {
                $payload['paid_at'] = now();
            }

            if (! $isPaid && $installment->paid_at) {
                $payload['paid_at'] = null;
            }

            if (! empty($payload)) {
                $installment->update($payload);
            }
        });
    }

    private function creditsTableHasColumn(string $column): bool
    {
        return Schema::hasColumn('credits', $column);
    }

    private function ensureFlexibleCreditSupport(): void
    {
        $this->ensureCreditTablesExist();

        if (
            ! $this->creditRestructureTableExists()
            || ! $this->creditsTableHasColumn('credit_type')
            || ! $this->creditsTableHasColumn('restructured')
            || ! $this->creditsTableHasColumn('restructured_at')
            || ! $this->creditsTableHasColumn('previous_balance')
        ) {
            throw new UnprocessableEntityHttpException(
                'La edicion y reestructuracion de creditos requieren ejecutar las migraciones mas recientes.'
            );
        }
    }

    private function creditAlertsBaseQuery()
    {
        return Credit::query()
            ->where('balance', '>', 0)
            ->whereNotNull('due_date');
    }

    private function resolveCreditAlertDaysMeta(?User $user = null): array
    {
        $defaultAlertDays = (int) getSettingValue('credit_alert_days', 3);
        $defaultAlertDays = max($defaultAlertDays, 0);
        $userValue = null;

        if ($user) {
            if ($this->userCreditAlertDaysColumnExists()) {
                $userValue = $user->credit_alert_days;
            } else {
                $fallbackValue = getSettingValue($this->userCreditAlertDaysSettingKey($user), null);
                $userValue = $fallbackValue !== null ? (int) $fallbackValue : null;
            }
        }

        $usesUserPreference = $userValue !== null && $userValue !== '';
        $alertDays = $usesUserPreference ? (int) $userValue : $defaultAlertDays;

        return [
            'alert_days' => max($alertDays, 0),
            'default_alert_days' => $defaultAlertDays,
            'uses_user_preference' => $usesUserPreference,
        ];
    }

    private function transformCreditAlertRow(
        Credit $credit,
        string $alertType,
        Carbon $today
    ): array
    {
        $dueDate = $credit->due_date instanceof Carbon
            ? $credit->due_date->copy()->startOfDay()
            : Carbon::parse($credit->due_date)->startOfDay();
        $paymentStatus = $this->resolveComputedCreditStatus($credit);
        $dayCount = $alertType === 'vencido'
            ? (int) $dueDate->diffInDays($today)
            : (int) $today->diffInDays($dueDate);

        return [
            'id' => (int) $credit->id,
            'credit_id' => (int) $credit->id,
            'sale_id' => $credit->sale_id ? (int) $credit->sale_id : null,
            'sale_reference_code' => optional($credit->sale)->reference_code,
            'customer_id' => (int) $credit->customer_id,
            'customer_name' => optional($credit->customer)->name,
            'customer_phone' => optional($credit->customer)->phone,
            'balance' => round((float) $credit->balance, 2),
            'due_date' => $dueDate->toDateString(),
            'alert_type' => $alertType,
            'alert_color' => $alertType === 'vencido' ? 'danger' : 'warning',
            'day_count' => $dayCount,
            'days_overdue' => $alertType === 'vencido' ? $dayCount : 0,
            'days_remaining' => $alertType === 'vencido' ? 0 : $dayCount,
            'payment_status' => $paymentStatus,
            'payment_status_label' => ucfirst($paymentStatus),
        ];
    }

    private function userCreditAlertDaysColumnExists(): bool
    {
        if ($this->userCreditAlertDaysColumnExists !== null) {
            return $this->userCreditAlertDaysColumnExists;
        }

        return $this->userCreditAlertDaysColumnExists = Schema::hasColumn('users', 'credit_alert_days');
    }

    private function userCreditAlertDaysSettingKey(User $user): string
    {
        return 'credit_alert_days_user_'.$user->id;
    }

    private function transformCreditRow(Credit $credit): array
    {
        $paidTotal = round((float) $credit->total_with_interest - (float) $credit->balance, 2);
        $paidPrincipal = round((float) $credit->total_amount - (float) $credit->principal_balance, 2);
        $creditType = $this->resolveStoredCreditType($credit);
        $restructureCount = (int) ($credit->restructures_count ?? 0);
        $hasPayments = $this->creditHasRegisteredPayments($credit);
        $isPaid = $this->creditIsPaid($credit);
        $computedStatus = $this->resolveComputedCreditStatus($credit);

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
            'credit_type' => $creditType,
            'credit_type_label' => $this->creditTypeLabel($creditType),
            'status' => $computedStatus,
            'start_date' => optional($credit->start_date)->format('Y-m-d'),
            'due_date' => optional($credit->due_date)->format('Y-m-d'),
            'note' => $credit->note,
            'has_payments' => $hasPayments,
            'can_edit_directly' => ! $isPaid && ! $hasPayments && $restructureCount === 0,
            'can_restructure' => ! $isPaid && (float) $credit->balance > 0,
            'restructured' => $this->creditsTableHasColumn('restructured')
                ? (bool) $credit->restructured
                : false,
            'restructured_at' => $this->creditsTableHasColumn('restructured_at')
                ? optional($credit->restructured_at)->format('Y-m-d H:i:s')
                : null,
            'previous_balance' => $this->creditsTableHasColumn('previous_balance')
                ? ($credit->previous_balance !== null ? (float) $credit->previous_balance : null)
                : null,
            'restructure_count' => $restructureCount,
            'payments_count' => (int) ($credit->payments_count ?? 0),
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

    private function creditDetailRelations(): array
    {
        $relations = ['customer', 'sale', 'installmentItems', 'payments', 'logs'];

        if ($this->creditRestructureTableExists()) {
            $relations[] = 'restructures';
        }

        if ($this->creditInventoryService->itemTableExists()) {
            $relations[] = 'items';
        }

        if ($this->creditInventoryService->returnTableExists()) {
            $relations[] = 'itemReturns';
        }

        return $relations;
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
