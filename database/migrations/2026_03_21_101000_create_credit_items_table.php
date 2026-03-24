<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('credit_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('credit_id');
            $table->unsignedBigInteger('sale_item_id')->nullable();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('warehouse_id');
            $table->decimal('quantity', 15, 2);
            $table->decimal('product_price', 15, 2);
            $table->decimal('sub_total', 15, 2);
            $table->string('source', 30)->default('manual');
            $table->text('note')->nullable();
            $table->timestamps();

            $table->index('credit_id');
            $table->index('sale_item_id');
            $table->index('product_id');
            $table->index('warehouse_id');
            $table->index('source');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_items');
    }
};
