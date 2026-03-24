<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Sale;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class SaleBarcodeTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();

        if (! $this->requiredTablesExist()) {
            $this->markTestSkipped('Las tablas necesarias para barcode de ventas no existen en este entorno.');
        }
    }

    public function test_barcode_endpoint_returns_a_renderable_image(): void
    {
        $response = $this->get('/barcode?code=SA_111601');

        $response->assertOk();
        $response->assertHeader('Content-Type', 'image/png');
        $this->assertNotEmpty($response->getContent());
    }

    public function test_sale_attributes_expose_dynamic_barcode_url(): void
    {
        $suffix = $this->uniqueSuffix();

        $customer = Customer::create([
            'name' => 'Cliente Barcode '.$suffix,
            'email' => 'cliente_barcode_'.$suffix.'@example.test',
            'phone' => substr(strrev($suffix), 0, 12),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'address' => 'Direccion de prueba',
        ]);

        $warehouse = Warehouse::create([
            'name' => 'Bodega Barcode '.$suffix,
            'phone' => substr($suffix, 0, 10),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'email' => 'warehouse_barcode_'.$suffix.'@example.test',
            'zip_code' => '11001',
        ]);

        $user = User::create([
            'first_name' => 'Barcode',
            'last_name' => 'Tester',
            'email' => 'barcode_user_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 12),
            'password' => Hash::make('password123'),
            'language' => 'en',
        ]);

        $sale = Sale::create([
            'date' => now()->format('Y-m-d'),
            'customer_id' => $customer->id,
            'warehouse_id' => $warehouse->id,
            'tax_rate' => 0,
            'tax_amount' => 0,
            'discount' => 0,
            'shipping' => 0,
            'grand_total' => 100,
            'received_amount' => 100,
            'paid_amount' => 100,
            'payment_type' => Sale::CASH,
            'note' => 'Venta con barcode dinamico',
            'status' => Sale::COMPLETED,
            'payment_status' => Sale::PAID,
            'reference_code' => 'SA_111601',
            'is_return' => 0,
            'user_id' => $user->id,
        ]);

        $attributes = $sale->fresh()->prepareAttributes();

        $this->assertSame('SA_111601', $attributes['reference_code']);
        $this->assertSame(
            route('barcode.generate', ['code' => 'SA_111601']),
            $attributes['barcode_url']
        );
    }

    private function requiredTablesExist(): bool
    {
        foreach (['users', 'customers', 'warehouses', 'sales'] as $table) {
            if (! Schema::hasTable($table)) {
                return false;
            }
        }

        return true;
    }

    private function uniqueSuffix(): string
    {
        return (string) (int) (microtime(true) * 1000000).(string) random_int(100, 999);
    }
}
