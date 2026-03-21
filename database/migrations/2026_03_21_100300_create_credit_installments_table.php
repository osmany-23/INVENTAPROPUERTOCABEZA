<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('credit_installments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('credit_id');
            $table->unsignedInteger('installment_number');
            $table->decimal('amount', 15, 2);
            $table->decimal('paid_amount', 15, 2)->default(0);
            $table->date('due_date');
            $table->enum('status', ['pendiente', 'pagado', 'atrasado'])->default('pendiente');
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->index('credit_id');
            $table->index('status');
            $table->index('due_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_installments');
    }
};
