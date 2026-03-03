<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->index('name', 'products_name_idx');
            $table->index('product_code', 'products_product_code_idx');
            $table->index(['brand_id', 'product_category_id'], 'products_brand_category_idx');
        });

        Schema::table('manage_stocks', function (Blueprint $table) {
            $table->index(['warehouse_id', 'product_id'], 'manage_stocks_warehouse_product_idx');
            $table->index(['product_id', 'warehouse_id'], 'manage_stocks_product_warehouse_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('manage_stocks', function (Blueprint $table) {
            $table->dropIndex('manage_stocks_warehouse_product_idx');
            $table->dropIndex('manage_stocks_product_warehouse_idx');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('products_name_idx');
            $table->dropIndex('products_product_code_idx');
            $table->dropIndex('products_brand_category_idx');
        });
    }
};
