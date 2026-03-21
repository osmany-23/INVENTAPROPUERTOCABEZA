<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customer_credit_configs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id')->unique();
            $table->decimal('credit_limit', 15, 2)->default(0);
            $table->decimal('current_balance', 15, 2)->default(0);
            $table->boolean('allow_exceed')->default(false);
            $table->decimal('interest_rate', 8, 2)->default(0);
            $table->unsignedInteger('max_installments')->default(1);
            $table->enum('status', ['activo', 'bloqueado'])->default('activo');
            $table->timestamps();

            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_credit_configs');
    }
};
