<?php

namespace Tests\Feature;

use App\Models\Credit;
use App\Models\Customer;
use App\Models\CustomerCreditConfig;
use App\Services\CreditService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Tests\TestCase;

class CreditLimitEnforcementTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();

        if (! $this->requiredTablesExist()) {
            $this->markTestSkipped('Las tablas del modulo de creditos no existen en este entorno.');
        }
    }

    public function test_customer_can_use_remaining_credit_line_even_when_interest_increases_projected_total(): void
    {
        $customer = $this->createCustomer();
        $this->createConfig($customer, [
            'credit_limit' => 500,
            'allow_exceed' => true,
            'interest_rate' => 10,
        ]);

        $service = app(CreditService::class);

        $service->createManualCredit([
            'customer_id' => $customer->id,
            'total_amount' => 200,
            'interest_rate' => 0,
            'installments' => 2,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonths(2)->format('Y-m-d'),
            'note' => 'Primer credito',
        ]);

        $service->createManualCredit([
            'customer_id' => $customer->id,
            'total_amount' => 250,
            'interest_rate' => 0,
            'installments' => 2,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonths(2)->format('Y-m-d'),
            'note' => 'Segundo credito',
        ]);

        $snapshot = $service->checkLimit($customer->id, 50, 20);

        $this->assertSame(450.0, (float) $snapshot['used_credit']);
        $this->assertSame(50.0, (float) $snapshot['available_credit']);
        $this->assertSame(50.0, (float) $snapshot['requested_amount']);
        $this->assertSame(50.0, (float) $snapshot['requested_principal_amount']);
        $this->assertSame(10.0, (float) $snapshot['projected_interest_amount']);
        $this->assertTrue((bool) $snapshot['allowed']);
        $this->assertFalse((bool) $snapshot['allow_exceed']);

        $service->createManualCredit([
            'customer_id' => $customer->id,
            'total_amount' => 50,
            'interest_rate' => 20,
            'installments' => 2,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonths(2)->format('Y-m-d'),
            'note' => 'Credito permitido por saldo',
        ]);

        $afterCreation = $service->checkLimit($customer->id, 1, 0);

        $this->assertSame(500.0, (float) $afterCreation['used_credit']);
        $this->assertSame(0.0, (float) $afterCreation['available_credit']);
        $this->assertFalse((bool) $afterCreation['allowed']);
    }

    public function test_customer_cannot_exceed_remaining_credit_line_by_principal_amount(): void
    {
        $customer = $this->createCustomer();
        $this->createConfig($customer, [
            'credit_limit' => 500,
            'allow_exceed' => true,
            'interest_rate' => 10,
        ]);

        $service = app(CreditService::class);

        $service->createManualCredit([
            'customer_id' => $customer->id,
            'total_amount' => 200,
            'interest_rate' => 0,
            'installments' => 2,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonths(2)->format('Y-m-d'),
            'note' => 'Primer credito',
        ]);

        $service->createManualCredit([
            'customer_id' => $customer->id,
            'total_amount' => 250,
            'interest_rate' => 0,
            'installments' => 2,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonths(2)->format('Y-m-d'),
            'note' => 'Segundo credito',
        ]);

        $snapshot = $service->checkLimit($customer->id, 50.01, 20);

        $this->assertFalse((bool) $snapshot['allowed']);
        $this->assertSame(450.0, (float) $snapshot['used_credit']);
        $this->assertSame(50.0, (float) $snapshot['available_credit']);
        $this->assertSame(50.01, (float) $snapshot['requested_amount']);

        try {
            $service->createManualCredit([
                'customer_id' => $customer->id,
                'total_amount' => 50.01,
                'interest_rate' => 20,
                'installments' => 2,
                'start_date' => now()->format('Y-m-d'),
                'due_date' => now()->addMonths(2)->format('Y-m-d'),
                'note' => 'Credito bloqueado por principal',
            ]);

            $this->fail('Se esperaba una validacion de limite global.');
        } catch (UnprocessableEntityHttpException $exception) {
            $this->assertStringContainsString('Credito insuficiente.', $exception->getMessage());
            $this->assertStringContainsString('saldo solicitado: 50.01', $exception->getMessage());
        }
    }

    public function test_customer_with_overdue_credit_is_blocked_even_if_limit_is_available(): void
    {
        $customer = $this->createCustomer();
        $this->createConfig($customer, [
            'credit_limit' => 500,
            'interest_rate' => 0,
        ]);

        Credit::create([
            'sale_id' => null,
            'customer_id' => $customer->id,
            'total_amount' => 100,
            'principal_balance' => 100,
            'balance' => 100,
            'interest_rate' => 0,
            'total_with_interest' => 100,
            'installments' => 1,
            'status' => Credit::STATUS_PENDING,
            'start_date' => now()->subMonth()->format('Y-m-d'),
            'due_date' => now()->subDay()->format('Y-m-d'),
            'note' => 'Credito vencido',
        ]);

        $snapshot = app(CreditService::class)->checkLimit($customer->id, 50, 0);

        $this->assertSame(100.0, (float) $snapshot['used_credit']);
        $this->assertSame(400.0, (float) $snapshot['available_credit']);
        $this->assertTrue((bool) $snapshot['has_overdue_credits']);
        $this->assertFalse((bool) $snapshot['allowed']);
        $this->assertSame('El cliente esta moroso y no puede recibir nuevos creditos.', $snapshot['message']);
    }

    public function test_payment_reduces_used_credit_and_marks_credit_as_partial(): void
    {
        $customer = $this->createCustomer();
        $this->createConfig($customer, [
            'credit_limit' => 500,
            'interest_rate' => 0,
        ]);

        $service = app(CreditService::class);

        $credit = $service->createManualCredit([
            'customer_id' => $customer->id,
            'total_amount' => 200,
            'interest_rate' => 0,
            'installments' => 2,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonths(2)->format('Y-m-d'),
            'note' => 'Credito para abono',
        ]);

        $beforePayment = $service->checkLimit($customer->id, 10, 0);
        $this->assertSame(200.0, (float) $beforePayment['used_credit']);
        $this->assertSame(300.0, (float) $beforePayment['available_credit']);

        $updatedCredit = $service->recordPayment($credit, [
            'amount' => 50,
            'payment_type' => 1,
            'payment_method' => 'cash',
            'note' => 'Abono parcial',
        ]);

        $afterPayment = $service->checkLimit($customer->id, 10, 0);
        $detail = $service->getCreditDetail($updatedCredit);

        $this->assertSame(150.0, (float) $updatedCredit->fresh()->balance);
        $this->assertSame(150.0, (float) $afterPayment['used_credit']);
        $this->assertSame(350.0, (float) $afterPayment['available_credit']);
        $this->assertSame(Credit::STATUS_PARTIAL, $detail['status']);

        $this->assertDatabaseHas('credit_installments', [
            'credit_id' => $credit->id,
            'installment_number' => 1,
            'paid_amount' => 50,
        ]);
    }

    public function test_payment_can_cover_the_full_remaining_balance(): void
    {
        $customer = $this->createCustomer();
        $this->createConfig($customer, [
            'credit_limit' => 500,
            'interest_rate' => 0,
        ]);

        $service = app(CreditService::class);

        $credit = $service->createManualCredit([
            'customer_id' => $customer->id,
            'total_amount' => 120,
            'interest_rate' => 0,
            'installments' => 2,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonths(2)->format('Y-m-d'),
            'note' => 'Credito para pago total',
        ]);

        $updatedCredit = $service->recordPayment($credit, [
            'amount' => 120,
            'payment_type' => 1,
            'payment_method' => 'cash',
            'note' => 'Pago total',
        ]);

        $detail = $service->getCreditDetail($updatedCredit);

        $this->assertSame(0.0, (float) $updatedCredit->fresh()->balance);
        $this->assertSame(0.0, (float) $updatedCredit->fresh()->principal_balance);
        $this->assertSame(Credit::STATUS_PAID, $detail['status']);
        $this->assertCount(0, array_filter($detail['installments'], fn (array $row) => (float) $row['pending_amount'] > 0));
    }

    public function test_payment_is_applied_to_the_oldest_pending_installment_by_due_date(): void
    {
        $customer = $this->createCustomer();
        $this->createConfig($customer);

        $credit = Credit::create([
            'sale_id' => null,
            'customer_id' => $customer->id,
            'total_amount' => 200,
            'principal_balance' => 200,
            'balance' => 200,
            'interest_rate' => 0,
            'total_with_interest' => 200,
            'installments' => 2,
            'status' => Credit::STATUS_PENDING,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonths(2)->format('Y-m-d'),
            'note' => 'Credito con cuotas desordenadas',
        ]);

        \App\Models\CreditInstallment::create([
            'credit_id' => $credit->id,
            'installment_number' => 1,
            'amount' => 100,
            'paid_amount' => 0,
            'due_date' => now()->addDays(20)->format('Y-m-d'),
            'status' => \App\Models\CreditInstallment::STATUS_PENDING,
        ]);

        \App\Models\CreditInstallment::create([
            'credit_id' => $credit->id,
            'installment_number' => 2,
            'amount' => 100,
            'paid_amount' => 0,
            'due_date' => now()->addDays(5)->format('Y-m-d'),
            'status' => \App\Models\CreditInstallment::STATUS_PENDING,
        ]);

        app(CreditService::class)->recordPayment($credit, [
            'amount' => 100,
            'payment_type' => 1,
            'payment_method' => 'cash',
            'note' => 'Pago a la cuota mas proxima',
        ]);

        $this->assertDatabaseHas('credit_installments', [
            'credit_id' => $credit->id,
            'installment_number' => 2,
            'paid_amount' => 100,
            'status' => \App\Models\CreditInstallment::STATUS_PAID,
        ]);

        $this->assertDatabaseHas('credit_installments', [
            'credit_id' => $credit->id,
            'installment_number' => 1,
            'paid_amount' => 0,
        ]);
    }

    public function test_payment_cannot_exceed_current_balance(): void
    {
        $customer = $this->createCustomer();
        $this->createConfig($customer, [
            'credit_limit' => 500,
            'interest_rate' => 0,
        ]);

        $service = app(CreditService::class);

        $credit = $service->createManualCredit([
            'customer_id' => $customer->id,
            'total_amount' => 90,
            'interest_rate' => 0,
            'installments' => 1,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonth()->format('Y-m-d'),
            'note' => 'Credito para validacion',
        ]);

        $this->expectException(UnprocessableEntityHttpException::class);
        $this->expectExceptionMessage('El pago no puede ser mayor al saldo pendiente.');

        $service->recordPayment($credit, [
            'amount' => 90.01,
            'payment_type' => 1,
            'payment_method' => 'cash',
            'note' => 'Intento de sobrepago',
        ]);
    }

    private function createCustomer(): Customer
    {
        $suffix = $this->buildUniqueSuffix();

        return Customer::create([
            'name' => 'Cliente limite '.$suffix,
            'email' => 'cliente_limite_'.$suffix.'@example.test',
            'phone' => substr(strrev($suffix), 0, 12),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'address' => 'Direccion de prueba',
        ]);
    }

    private function createConfig(Customer $customer, array $overrides = []): CustomerCreditConfig
    {
        return CustomerCreditConfig::create(array_merge([
            'customer_id' => $customer->id,
            'credit_limit' => 500,
            'current_balance' => 0,
            'allow_exceed' => false,
            'interest_rate' => 0,
            'max_installments' => 6,
            'status' => CustomerCreditConfig::STATUS_ACTIVE,
        ], $overrides));
    }

    private function requiredTablesExist(): bool
    {
        foreach (['customer_credit_configs', 'credits', 'credit_installments', 'credit_payments', 'credit_logs'] as $table) {
            if (! Schema::hasTable($table)) {
                return false;
            }
        }

        return true;
    }

    private function buildUniqueSuffix(): string
    {
        return (string) (int) (microtime(true) * 1000000).(string) random_int(100, 999);
    }
}
