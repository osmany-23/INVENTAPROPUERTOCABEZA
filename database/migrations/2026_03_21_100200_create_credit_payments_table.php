<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('credit_payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('credit_id');
            $table->decimal('amount', 15, 2);
            $table->unsignedInteger('payment_type')->nullable();
            $table->string('payment_method')->nullable();
            $table->text('note')->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->index('credit_id');
            $table->index('payment_type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_payments');
    }
};
