<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('customers')->upsert([
            [
                'id' => 1,
                'name' => 'CLIENTE ORDINARIO',
                'email' => 'bryam.autorepuestos@gmail.com',
                'phone' => '89454301',
                'dob' => null,
                'country' => 'Nicaragua',
                'city' => 'JALAPA',
                'address' => 'DE DONDE FUE PANADRIA ROCHA MEDIA CUADRA AL ESTE',
            ],
        ], ['id'], ['name', 'email', 'phone', 'dob', 'country', 'city', 'address']);

        DB::table('warehouses')->upsert([
            [
                'id' => 1,
                'name' => 'AUTO REPUESTOS BRYAN #1',
                'phone' => '89454301',
                'country' => 'Nicaragua',
                'city' => 'JALAPA',
                'email' => 'autorepuestosbryan#1@gmail.com',
                'zip_code' => '39200',
            ],
        ], ['id'], ['name', 'phone', 'country', 'city', 'email', 'zip_code']);

        DB::table('currencies')->upsert([
            ['id' => 1, 'name' => 'CORDOBAS', 'code' => 'NIO', 'symbol' => 'C$'],
            ['id' => 2, 'name' => 'DOLARES', 'code' => 'USD', 'symbol' => '$'],
            ['id' => 3, 'name' => 'India', 'code' => 'INR', 'symbol' => '₹'],
        ], ['id'], ['name', 'code', 'symbol']);

        foreach ($this->settings() as $key => $value) {
            DB::table('settings')->updateOrInsert(
                ['key' => $key],
                ['value' => $this->normalizeValue($value)]
            );
        }
    }

    /**
     * @return array<string, string|int|bool>
     */
    private function settings(): array
    {
        return [
            'show_version_on_footer' => true,
            'country' => 'Nicaragua',
            'state' => 'Nueva Segovia',
            'city' => 'JALAPA',
            'postcode' => '39200',
            'date_format' => 'd-m-y',
            'purchase_code' => 'PU',
            'purchase_return_code' => 'PR',
            'sale_code' => 'SA',
            'sale_return_code' => 'SR',
            'expense_code' => 'EX',
            'is_currency_right' => true,
            'show_logo_in_receipt' => true,
            'show_app_name_in_sidebar' => false,
            'show_note' => true,
            'show_phone' => true,
            'show_customer' => true,
            'show_address' => true,
            'show_email' => false,
            'show_warehouse' => true,
            'show_tax_discount_shipping' => true,
            'show_barcode_in_receipt' => true,
            'notes' => 'NO SE ACEPTAN CAMBIOS NI DEVOLUCIONES',
            'show_product_code' => false,
            'currency' => 1,
            'email' => 'bryam.system2023@gmail.com',
            'company_name' => 'AUTO REPUESTOS BRYAN',
            'phone' => '58637131',
            'developed' => 'OSMANY CASCO',
            'footer' => '2025 Developed by InventaPRO All rights reserved - v1.1.0',
            'default_language' => '1',
            'default_customer' => 1,
            'default_warehouse' => 1,
            'address' => 'DE DONDE FUE PANADERIA ROCHA 1C AL ESTE',
            'stripe_key' => 'pu_test_yBzA1qI1PcfRBAVn1vJG2VuS00HcyhQX9LASERTFDDS',
            'stripe_secret' => 'pu_test_yBzA1qI1PcfRBAVn1vJG2VuS00HcyhQX9LASERTFDDS',
            'sms_gateway' => 1,
            'twillo_sid' => 'asd',
            'twillo_token' => 'asd',
            'twillo_from' => 'asd',
            'smtp_host' => 'mailtrap.io',
            'smtp_port' => '2525',
            'smtp_username' => 'test',
            'smtp_password' => 'test',
            'smtp_Encryption' => 'tls',
            'logo' => 'http://192.168.1.49/uploads/settings/2962/ChatGPT-Image-21-nov-2025,-09_56_47-a.m.-Photoroom-Photoroom.png',
            'credit_alert_days' => 3,
        ];
    }

    /**
     * @param  bool|int|string  $value
     */
    private function normalizeValue($value): string
    {
        if (is_bool($value)) {
            return $value ? '1' : '0';
        }

        return (string) $value;
    }
}
