<?php

namespace Tests\Feature;

use App\Models\Credit;
use App\Models\CreditInstallment;
use App\Models\Customer;
use App\Models\CustomerCreditConfig;
use App\Models\POSRegister;
use App\Models\Sale;
use App\Models\SalesPayment;
use App\Models\User;
use App\Models\Warehouse;
use App\Services\CreditCashMovementService;
use App\Services\CreditService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class CreditCashMovementTest extends TestCase
{
    use DatabaseTransactions;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        if (! $this->creditCashTablesExist()) {
            $this->markTestSkipped('Las tablas necesarias para caja de creditos no existen en este entorno.');
        }

        $suffix = (string) (int) (microtime(true) * 1000000).(string) random_int(100, 999);

        $this->user = User::create([
            'first_name' => 'Cash',
            'last_name' => 'Tester',
            'email' => 'credit_cash_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 12),
            'password' => Hash::make('password123'),
            'language' => 'en',
        ]);
    }

    public function test_record_payment_creates_credit_cash_movement_with_principal_and_interest_breakdown(): void
    {
        $this->actingAs($this->user);

        POSRegister::create([
            'cash_in_hand' => 150,
            'user_id' => $this->user->id,
        ]);

        $suffix = (string) (int) (microtime(true) * 1000000).(string) random_int(100, 999);
        $customer = Customer::create([
            'name' => 'Cliente Caja '.$suffix,
            'email' => 'cliente_caja_'.$suffix.'@example.test',
            'phone' => substr(strrev($suffix), 0, 12),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'address' => 'Direccion de prueba',
        ]);

        $credit = Credit::create([
            'sale_id' => null,
            'customer_id' => $customer->id,
            'total_amount' => 100,
            'principal_balance' => 100,
            'balance' => 110,
            'interest_rate' => 10,
            'total_with_interest' => 110,
            'installments' => 2,
            'status' => Credit::STATUS_PENDING,
            'start_date' => now()->subDays(5)->format('Y-m-d'),
            'due_date' => now()->addDays(25)->format('Y-m-d'),
            'note' => 'Credito para prueba de caja',
        ]);

        CreditInstallment::create([
            'credit_id' => $credit->id,
            'installment_number' => 1,
            'amount' => 55,
            'paid_amount' => 0,
            'due_date' => now()->addDays(10)->format('Y-m-d'),
            'status' => CreditInstallment::STATUS_PENDING,
        ]);
        CreditInstallment::create([
            'credit_id' => $credit->id,
            'installment_number' => 2,
            'amount' => 55,
            'paid_amount' => 0,
            'due_date' => now()->addDays(25)->format('Y-m-d'),
            'status' => CreditInstallment::STATUS_PENDING,
        ]);

        $updatedCredit = app(CreditService::class)->recordPayment($credit, [
            'amount' => 22,
            'payment_type' => 1,
            'payment_method' => 'cash',
            'note' => 'Abono con caja diaria',
        ]);

        $this->assertDatabaseHas('credit_cash_movements', [
            'credit_id' => $credit->id,
            'user_id' => $this->user->id,
            'type' => 'INGRESO',
            'category' => 'PAGO_CREDITO',
            'source' => 'credit_payment',
            'amount' => 22,
            'principal_amount' => 20,
            'interest_amount' => 2,
            'payment_type' => 1,
            'payment_method' => 'cash',
        ]);

        $this->assertEquals(88.0, (float) $updatedCredit->balance);
        $this->assertEquals(80.0, (float) $updatedCredit->principal_balance);
    }

    public function test_credit_sale_initial_payment_creates_credit_cash_movement_without_double_counting_sale_payment(): void
    {
        $this->actingAs($this->user);

        $register = POSRegister::create([
            'cash_in_hand' => 200,
            'user_id' => $this->user->id,
        ]);

        $customer = $this->createCustomer();
        $warehouse = $this->createWarehouse();

        CustomerCreditConfig::create([
            'customer_id' => $customer->id,
            'credit_limit' => 500,
            'current_balance' => 0,
            'allow_exceed' => false,
            'interest_rate' => 0,
            'max_installments' => 6,
            'status' => CustomerCreditConfig::STATUS_ACTIVE,
        ]);

        $sale = Sale::create([
            'date' => now()->format('Y-m-d'),
            'customer_id' => $customer->id,
            'warehouse_id' => $warehouse->id,
            'tax_rate' => 0,
            'tax_amount' => 0,
            'discount' => 0,
            'shipping' => 0,
            'grand_total' => 120,
            'received_amount' => 20,
            'paid_amount' => 20,
            'payment_type' => SalesPayment::CASH,
            'note' => 'Venta a credito con pago inicial',
            'status' => Sale::COMPLETED,
            'payment_status' => Sale::PARTIAL_PAID,
            'reference_code' => 'SALE-CREDIT-CASH-'.$this->uniqueSuffix(),
            'is_return' => 0,
            'user_id' => $this->user->id,
        ]);

        SalesPayment::create([
            'sale_id' => $sale->id,
            'payment_date' => now()->format('Y-m-d'),
            'payment_type' => SalesPayment::CASH,
            'amount' => 20,
            'received_amount' => 20,
        ]);

        $credit = app(CreditService::class)->createCreditFromSale($sale, [
            'credit_sale' => true,
            'credit_enabled' => true,
            'payment_status' => Sale::UNPAID,
            'credit_type' => Credit::TYPE_AUTOMATIC,
            'credit_installments' => 2,
            'credit_due_date' => now()->addMonth()->format('Y-m-d'),
            'credit_interest_rate' => 0,
            'credit_initial_payment' => 20,
            'payment_type' => SalesPayment::CASH,
        ]);

        $this->assertDatabaseHas('credit_cash_movements', [
            'credit_id' => $credit->id,
            'sale_id' => $sale->id,
            'user_id' => $this->user->id,
            'pos_register_id' => $register->id,
            'type' => 'INGRESO',
            'category' => 'PAGO_CREDITO',
            'source' => 'credit_payment',
            'amount' => 20,
            'principal_amount' => 20,
            'interest_amount' => 0,
            'payment_type' => SalesPayment::CASH,
            'payment_method' => 'cash',
        ]);

        $legacySalePayment = SalesPayment::query()
            ->where('sale_id', $sale->id)
            ->latest('id')
            ->first();

        $this->assertNotNull($legacySalePayment);
        $this->assertTrue(str_starts_with((string) $legacySalePayment->reference, 'CRD-PAY-'));

        $this->assertSame(
            0.0,
            (float) app(CreditCashMovementService::class)
                ->getRegularSalesPaymentsQuery()
                ->where('sale_id', $sale->id)
                ->sum('amount')
        );

        $registerTotals = app(CreditCashMovementService::class)->getRegisterTotals($register);

        $this->assertSame(20.0, (float) $registerTotals['credit_payment_amount']);
        $this->assertSame(20.0, (float) $registerTotals['credit_principal_amount']);
    }

    private function creditCashTablesExist(): bool
    {
        foreach ([
            'customer_credit_configs',
            'customers',
            'warehouses',
            'sales',
            'sales_payments',
            'credits',
            'credit_installments',
            'credit_payments',
            'credit_cash_movements',
            'pos_register',
        ] as $table) {
            if (! Schema::hasTable($table)) {
                return false;
            }
        }

        return true;
    }

    private function createCustomer(): Customer
    {
        $suffix = $this->uniqueSuffix();

        return Customer::create([
            'name' => 'Cliente Caja '.$suffix,
            'email' => 'cliente_caja_'.$suffix.'@example.test',
            'phone' => substr(strrev($suffix), 0, 12),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'address' => 'Direccion de prueba',
        ]);
    }

    private function createWarehouse(): Warehouse
    {
        $suffix = $this->uniqueSuffix();

        return Warehouse::create([
            'name' => 'Bodega Caja '.$suffix,
            'phone' => substr($suffix, 0, 10),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'email' => 'warehouse_cash_'.$suffix.'@example.test',
            'zip_code' => '11001',
        ]);
    }

    private function uniqueSuffix(): string
    {
        return (string) (int) (microtime(true) * 1000000).(string) random_int(100, 999);
    }
}
