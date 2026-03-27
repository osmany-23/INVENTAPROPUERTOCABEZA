<?php

namespace Tests\Feature;

use App\Models\Credit;
use App\Models\CreditPayment;
use App\Models\Customer;
use App\Models\CustomerCreditConfig;
use App\Models\Sale;
use App\Models\SalesPayment;
use App\Models\Setting;
use App\Models\Warehouse;
use App\Services\CreditService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Tests\TestCase;

class CreditSaleInitialPaymentTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();

        if (! $this->requiredTablesExist()) {
            $this->markTestSkipped('Las tablas necesarias para validar ventas a credito no existen en este entorno.');
        }
    }

    public function test_credit_sale_without_initial_payment_defaults_to_zero_when_setting_is_disabled(): void
    {
        Setting::query()->updateOrCreate(
            ['key' => 'require_initial_payment'],
            ['value' => '0']
        );

        $customer = $this->createCustomer();
        $warehouse = $this->createWarehouse();
        $this->createConfig($customer, [
            'credit_limit' => 200,
            'interest_rate' => 0,
        ]);

        $sale = $this->createSale($customer, $warehouse, 100);
        $input = $this->creditInput();
        $service = app(CreditService::class);

        $this->assertSame(0.0, $service->resolveCreditInitialPayment($input, (float) $sale->grand_total));
        $this->assertSame(100.0, $service->resolveSaleCreditPrincipal($sale, $input));
        $this->assertNotNull($service->validateSaleCreditBeforeCheckout($sale, $input));

        $credit = $service->createCreditFromSale($sale, $input);

        $this->assertNotNull($credit);
        $this->assertSame(100.0, (float) $credit->total_amount);
        $this->assertSame(100.0, (float) $credit->principal_balance);
        $this->assertSame(100.0, (float) $credit->balance);
    }

    public function test_credit_sale_requires_initial_payment_when_setting_is_enabled(): void
    {
        Setting::query()->updateOrCreate(
            ['key' => 'require_initial_payment'],
            ['value' => '1']
        );

        $customer = $this->createCustomer();
        $warehouse = $this->createWarehouse();
        $this->createConfig($customer, [
            'credit_limit' => 200,
            'interest_rate' => 0,
        ]);

        $sale = $this->createSale($customer, $warehouse, 100);

        $this->expectException(UnprocessableEntityHttpException::class);
        $this->expectExceptionMessage(
            'El pago inicial es obligatorio para registrar una venta a credito.'
        );

        app(CreditService::class)->validateSaleCreditBeforeCheckout($sale, $this->creditInput());
    }

    public function test_credit_sale_uses_total_minus_initial_payment_as_credit_principal(): void
    {
        Setting::query()->updateOrCreate(
            ['key' => 'require_initial_payment'],
            ['value' => '0']
        );

        $customer = $this->createCustomer();
        $warehouse = $this->createWarehouse();
        $this->createConfig($customer, [
            'credit_limit' => 200,
            'interest_rate' => 0,
        ]);

        $sale = $this->createSale($customer, $warehouse, 120);
        $service = app(CreditService::class);
        $input = $this->creditInput([
            'credit_initial_payment' => 20,
        ]);

        $this->assertSame(20.0, $service->resolveCreditInitialPayment($input, (float) $sale->grand_total));
        $this->assertSame(100.0, $service->resolveSaleCreditPrincipal($sale, $input));

        $credit = $service->createCreditFromSale($sale, $input);

        $this->assertSame(100.0, (float) $credit->total_amount);
        $this->assertSame(100.0, (float) $credit->principal_balance);
        $this->assertSame(100.0, (float) $credit->balance);
    }

    public function test_credit_sale_initial_payment_is_registered_in_history_and_recovered_totals(): void
    {
        Setting::query()->updateOrCreate(
            ['key' => 'require_initial_payment'],
            ['value' => '0']
        );

        $customer = $this->createCustomer();
        $warehouse = $this->createWarehouse();
        $this->createConfig($customer, [
            'credit_limit' => 300,
            'interest_rate' => 0,
        ]);

        $sale = $this->createSale($customer, $warehouse, 120);
        $sale->update([
            'received_amount' => 20,
            'paid_amount' => 20,
            'payment_type' => SalesPayment::CASH,
            'payment_status' => Sale::PARTIAL_PAID,
        ]);

        SalesPayment::create([
            'sale_id' => $sale->id,
            'payment_date' => now()->format('Y-m-d'),
            'payment_type' => SalesPayment::CASH,
            'amount' => 20,
            'received_amount' => 20,
        ]);

        $service = app(CreditService::class);
        $credit = $service->createCreditFromSale($sale, $this->creditInput([
            'credit_initial_payment' => 20,
            'payment_type' => SalesPayment::CASH,
        ]));

        $this->assertDatabaseHas('credit_payments', [
            'credit_id' => $credit->id,
            'amount' => 20,
            'payment_type' => SalesPayment::CASH,
            'entry_type' => CreditPayment::ENTRY_TYPE_INITIAL_PAYMENT,
        ]);

        $detail = $service->getCreditDetail($credit);

        $this->assertSame(1, (int) $detail['payments_count']);
        $this->assertSame(120.0, (float) $detail['original_total_amount']);
        $this->assertSame(20.0, (float) $detail['recovered_amount']);
        $this->assertSame(
            CreditPayment::ENTRY_TYPE_INITIAL_PAYMENT,
            $detail['payments'][0]['entry_type']
        );
        $this->assertSame('Pago inicial', $detail['payments'][0]['entry_type_label']);
        $this->assertNotEmpty($detail['payments'][0]['created_at']);

        $legacySalePayment = SalesPayment::query()
            ->where('sale_id', $sale->id)
            ->latest('id')
            ->first();

        $this->assertNotNull($legacySalePayment);
        $this->assertTrue(str_starts_with((string) $legacySalePayment->reference, 'CRD-PAY-'));

        $creationLog = collect($detail['logs'])->firstWhere('action', 'credito_creado');
        $initialPaymentLog = collect($detail['logs'])->firstWhere('action', 'pago_inicial_registrado');

        $this->assertNotNull($creationLog);
        $this->assertStringContainsString('pago inicial 20.00', (string) $creationLog['description']);
        $this->assertNotNull($initialPaymentLog);
        $this->assertStringContainsString('20.00', (string) $initialPaymentLog['description']);
        $this->assertNotEmpty($initialPaymentLog['created_at']);
        $this->assertSame($detail['payments'][0]['created_at'], $initialPaymentLog['created_at']);
    }

    private function createCustomer(): Customer
    {
        $suffix = $this->buildUniqueSuffix();

        return Customer::create([
            'name' => 'Cliente credito inicial '.$suffix,
            'email' => 'cliente_credito_inicial_'.$suffix.'@example.test',
            'phone' => substr(strrev($suffix), 0, 12),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'address' => 'Direccion de prueba',
        ]);
    }

    private function createWarehouse(): Warehouse
    {
        $suffix = $this->buildUniqueSuffix();

        return Warehouse::create([
            'name' => 'Bodega credito inicial '.$suffix,
            'phone' => substr($suffix, 0, 10),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'email' => 'warehouse_credit_initial_'.$suffix.'@example.test',
            'zip_code' => '11001',
        ]);
    }

    private function createSale(Customer $customer, Warehouse $warehouse, float $grandTotal): Sale
    {
        return Sale::create([
            'date' => now()->format('Y-m-d'),
            'customer_id' => $customer->id,
            'warehouse_id' => $warehouse->id,
            'tax_rate' => 0,
            'tax_amount' => 0,
            'discount' => 0,
            'shipping' => 0,
            'grand_total' => $grandTotal,
            'received_amount' => 0,
            'paid_amount' => 0,
            'payment_type' => null,
            'note' => 'Venta a credito para pruebas',
            'status' => Sale::COMPLETED,
            'payment_status' => Sale::UNPAID,
            'reference_code' => 'SALE-CREDIT-INITIAL-'.$this->buildUniqueSuffix(),
            'is_return' => 0,
            'user_id' => null,
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

    private function creditInput(array $overrides = []): array
    {
        return array_merge([
            'credit_sale' => true,
            'credit_enabled' => true,
            'payment_status' => Sale::UNPAID,
            'credit_type' => Credit::TYPE_AUTOMATIC,
            'credit_installments' => 2,
            'credit_due_date' => now()->addMonth()->format('Y-m-d'),
            'credit_interest_rate' => 0,
        ], $overrides);
    }

    private function requiredTablesExist(): bool
    {
        foreach ([
            'settings',
            'customers',
            'warehouses',
            'sales',
            'sales_payments',
            'customer_credit_configs',
            'credits',
            'credit_installments',
            'credit_payments',
            'credit_logs',
        ] as $table) {
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
