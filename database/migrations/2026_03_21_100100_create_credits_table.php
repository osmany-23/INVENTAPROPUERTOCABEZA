<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('credits', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sale_id')->nullable();
            $table->unsignedBigInteger('customer_id');
            $table->decimal('total_amount', 15, 2);
            $table->decimal('principal_balance', 15, 2)->default(0);
            $table->decimal('balance', 15, 2)->default(0);
            $table->decimal('interest_rate', 8, 2)->default(0);
            $table->decimal('total_with_interest', 15, 2)->default(0);
            $table->unsignedInteger('installments')->default(1);
            $table->enum('status', ['pendiente', 'pagado', 'vencido'])->default('pendiente');
            $table->date('start_date');
            $table->date('due_date');
            $table->text('note')->nullable();
            $table->timestamps();

            $table->index('sale_id');
            $table->index('customer_id');
            $table->index('status');
            $table->index('due_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('credits');
    }
};
