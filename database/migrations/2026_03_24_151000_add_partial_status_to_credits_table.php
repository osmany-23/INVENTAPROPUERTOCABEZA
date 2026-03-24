<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('credits')) {
            return;
        }

        DB::statement(
            "ALTER TABLE credits MODIFY status ENUM('pendiente','parcial','pagado','vencido') NOT NULL DEFAULT 'pendiente'"
        );
    }

    public function down(): void
    {
        if (! Schema::hasTable('credits')) {
            return;
        }

        DB::statement(
            "ALTER TABLE credits MODIFY status ENUM('pendiente','pagado','vencido') NOT NULL DEFAULT 'pendiente'"
        );
    }
};
