<?php

namespace Tests\Feature;

use App\Models\Credit;
use App\Models\CreditCashMovement;
use App\Models\Customer;
use App\Models\POSRegister;
use App\Models\Sale;
use App\Models\SalesPayment;
use App\Models\User;
use App\Models\Warehouse;
use App\Services\CreditCashMovementService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class POSRegisterDetailsTest extends TestCase
{
    use DatabaseTransactions;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        if (! $this->requiredTablesExist()) {
            $this->markTestSkipped('Las tablas necesarias para el detalle de caja no existen en este entorno.');
        }

        $suffix = $this->uniqueSuffix();

        $this->user = User::create([
            'first_name' => 'Register',
            'last_name' => 'Tester',
            'email' => 'register_details_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 12),
            'password' => Hash::make('password123'),
            'language' => 'sp',
        ]);
    }

    public function test_register_details_keep_cheque_sales_separate_from_credit_collections(): void
    {
        $customer = $this->createCustomer();
        $warehouse = $this->createWarehouse();

        $register = POSRegister::create([
            'cash_in_hand' => 100,
            'user_id' => $this->user->id,
        ]);

        $sale = Sale::create([
            'date' => now()->format('Y-m-d'),
            'customer_id' => $customer->id,
            'warehouse_id' => $warehouse->id,
            'tax_rate' => 0,
            'tax_amount' => 0,
            'discount' => 0,
            'shipping' => 0,
            'grand_total' => 220,
            'received_amount' => 220,
            'paid_amount' => 220,
            'payment_type' => SalesPayment::CHEQUE,
            'note' => 'Venta pagada con cheque',
            'status' => Sale::COMPLETED,
            'payment_status' => Sale::PAID,
            'reference_code' => 'SALE-CHK-'.$this->uniqueSuffix(),
            'is_return' => 0,
            'user_id' => $this->user->id,
        ]);

        SalesPayment::create([
            'sale_id' => $sale->id,
            'payment_date' => now()->format('Y-m-d'),
            'payment_type' => SalesPayment::CHEQUE,
            'amount' => 220,
            'received_amount' => 220,
        ]);

        $credit = Credit::create([
            'sale_id' => null,
            'customer_id' => $customer->id,
            'total_amount' => 3550,
            'principal_balance' => 0,
            'balance' => 0,
            'interest_rate' => 0,
            'total_with_interest' => 3550,
            'installments' => 1,
            'status' => Credit::STATUS_PAID,
            'start_date' => now()->subDay()->format('Y-m-d'),
            'due_date' => now()->addMonth()->format('Y-m-d'),
            'note' => 'Credito cancelado para resumen de caja',
        ]);

        CreditCashMovement::create([
            'credit_id' => $credit->id,
            'credit_payment_id' => null,
            'sale_id' => null,
            'customer_id' => $customer->id,
            'pos_register_id' => $register->id,
            'user_id' => $this->user->id,
            'type' => CreditCashMovementService::TYPE_INCOME,
            'category' => CreditCashMovementService::CATEGORY_CREDIT_PAYMENT,
            'source' => CreditCashMovementService::SOURCE_CREDIT_PAYMENT,
            'description' => 'Pago de credito CRD_TEST',
            'amount' => 3550,
            'principal_amount' => 3550,
            'interest_amount' => 0,
            'payment_type' => SalesPayment::CASH,
            'payment_method' => 'cash',
            'movement_date' => now(),
        ]);

        Sanctum::actingAs($this->user);

        $response = $this->getJson('/api/get-register-details');

        $response->assertOk();

        $payload = $response->json('data');

        $this->assertSame(220.0, (float) data_get($payload, 'today_sales_cheque_payment'));
        $this->assertSame(220.0, (float) data_get($payload, 'today_sales_payment_amount'));
        $this->assertSame(3550.0, (float) data_get($payload, 'today_credit_payment_amount'));
        $this->assertSame(3550.0, (float) data_get($payload, 'today_credit_cash_payment'));
        $this->assertSame(3770.0, (float) data_get($payload, 'today_total_income_amount'));
        $this->assertSame(3650.0, (float) data_get($payload, 'total_cash_amount'));
    }

    private function requiredTablesExist(): bool
    {
        foreach ([
            'customers',
            'warehouses',
            'sales',
            'sales_payments',
            'credits',
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
            'email' => 'warehouse_register_'.$suffix.'@example.test',
            'zip_code' => '11001',
        ]);
    }

    private function uniqueSuffix(): string
    {
        return (string) (int) (microtime(true) * 1000000).(string) random_int(100, 999);
    }
}
