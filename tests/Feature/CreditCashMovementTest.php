<?php

namespace Tests\Feature;

use App\Models\Credit;
use App\Models\CreditInstallment;
use App\Models\Customer;
use App\Models\POSRegister;
use App\Models\User;
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

    private function creditCashTablesExist(): bool
    {
        foreach (['credits', 'credit_installments', 'credit_payments', 'credit_cash_movements', 'pos_register'] as $table) {
            if (! Schema::hasTable($table)) {
                return false;
            }
        }

        return true;
    }
}
