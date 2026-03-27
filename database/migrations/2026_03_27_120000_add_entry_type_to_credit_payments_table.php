<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('credit_payments') || Schema::hasColumn('credit_payments', 'entry_type')) {
            return;
        }

        Schema::table('credit_payments', function (Blueprint $table) {
            $table->string('entry_type')->default('PAGO')->after('payment_method');
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('credit_payments') || ! Schema::hasColumn('credit_payments', 'entry_type')) {
            return;
        }

        Schema::table('credit_payments', function (Blueprint $table) {
            $table->dropColumn('entry_type');
        });
    }
};
