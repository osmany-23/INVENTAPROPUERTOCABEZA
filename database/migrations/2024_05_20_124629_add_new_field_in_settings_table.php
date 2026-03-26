<?php

use App\Models\Setting;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $keys = [
            'show_note' => '1',
            'show_phone' => '1',
            'show_customer' => '1',
            'show_address' => '1',
            'show_email' => '1',
            'show_warehouse' => '1',
            'show_tax_discount_shipping' => '1',
            'show_barcode_in_receipt' => '1',
            'notes' => 'Thanks for order',
        ];

        foreach ($keys as $key => $value) {
            DB::table('settings')->updateOrInsert(
                ['key' => $key],
                ['value' => $value]
            );
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
