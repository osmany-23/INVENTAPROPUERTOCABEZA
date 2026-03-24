<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('credit_cash_movements', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('credit_id');
            $table->unsignedBigInteger('credit_payment_id')->nullable();
            $table->unsignedBigInteger('sale_id')->nullable();
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->unsignedBigInteger('pos_register_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('type', 20);
            $table->string('category', 50);
            $table->string('source', 50)->default('credit_payment');
            $table->string('description')->nullable();
            $table->decimal('amount', 15, 2);
            $table->decimal('principal_amount', 15, 2)->default(0);
            $table->decimal('interest_amount', 15, 2)->default(0);
            $table->unsignedInteger('payment_type')->nullable();
            $table->string('payment_method')->nullable();
            $table->dateTime('movement_date');
            $table->timestamps();

            $table->index('credit_id');
            $table->index('credit_payment_id');
            $table->index('sale_id');
            $table->index('customer_id');
            $table->index('pos_register_id');
            $table->index('user_id');
            $table->index('movement_date');
            $table->index('type');
            $table->index('category');
            $table->index('source');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_cash_movements');
    }
};
