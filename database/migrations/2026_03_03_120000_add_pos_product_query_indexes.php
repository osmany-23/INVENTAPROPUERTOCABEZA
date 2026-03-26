<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $this->addIndexIfMissing('products', 'products_name_idx', function (Blueprint $table) {
            $table->index('name', 'products_name_idx');
        });
        $this->addIndexIfMissing('products', 'products_product_code_idx', function (Blueprint $table) {
            $table->index('product_code', 'products_product_code_idx');
        });
        $this->addIndexIfMissing('products', 'products_brand_category_idx', function (Blueprint $table) {
            $table->index(['brand_id', 'product_category_id'], 'products_brand_category_idx');
        });

        $this->addIndexIfMissing('manage_stocks', 'manage_stocks_warehouse_product_idx', function (Blueprint $table) {
            $table->index(['warehouse_id', 'product_id'], 'manage_stocks_warehouse_product_idx');
        });
        $this->addIndexIfMissing('manage_stocks', 'manage_stocks_product_warehouse_idx', function (Blueprint $table) {
            $table->index(['product_id', 'warehouse_id'], 'manage_stocks_product_warehouse_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $this->dropIndexIfExists('manage_stocks', 'manage_stocks_warehouse_product_idx');
        $this->dropIndexIfExists('manage_stocks', 'manage_stocks_product_warehouse_idx');
        $this->dropIndexIfExists('products', 'products_name_idx');
        $this->dropIndexIfExists('products', 'products_product_code_idx');
        $this->dropIndexIfExists('products', 'products_brand_category_idx');
    }

    private function addIndexIfMissing(string $table, string $indexName, callable $callback): void
    {
        if (! Schema::hasTable($table) || $this->indexExists($table, $indexName)) {
            return;
        }

        Schema::table($table, $callback);
    }

    private function dropIndexIfExists(string $table, string $indexName): void
    {
        if (! Schema::hasTable($table) || ! $this->indexExists($table, $indexName)) {
            return;
        }

        Schema::table($table, function (Blueprint $tableBlueprint) use ($indexName) {
            $tableBlueprint->dropIndex($indexName);
        });
    }

    private function indexExists(string $table, string $indexName): bool
    {
        $result = DB::select("SHOW INDEX FROM `{$table}` WHERE Key_name = ?", [$indexName]);

        return ! empty($result);
    }
};
