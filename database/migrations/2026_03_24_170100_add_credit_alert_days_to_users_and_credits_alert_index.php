<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const ALERT_INDEX = 'credits_due_date_balance_alert_index';

    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedInteger('credit_alert_days')
                ->nullable()
                ->after('language');
        });

        Schema::table('credits', function (Blueprint $table) {
            $table->index(['due_date', 'balance'], self::ALERT_INDEX);
        });
    }

    public function down(): void
    {
        Schema::table('credits', function (Blueprint $table) {
            $table->dropIndex(self::ALERT_INDEX);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('credit_alert_days');
        });
    }
};
