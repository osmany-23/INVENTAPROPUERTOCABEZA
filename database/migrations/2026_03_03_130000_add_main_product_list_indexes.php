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
        $this->addIndexIfMissing('main_products', 'main_products_name_idx', function (Blueprint $table) {
            $table->index('name', 'main_products_name_idx');
        });

        $this->addIndexIfMissing('main_products', 'main_products_code_idx', function (Blueprint $table) {
            $table->index('code', 'main_products_code_idx');
        });

        $this->addIndexIfMissing('products', 'products_main_product_brand_category_idx', function (Blueprint $table) {
            $table->index(
                ['main_product_id', 'brand_id', 'product_category_id'],
                'products_main_product_brand_category_idx'
            );
        });

        $this->addIndexIfMissing('products', 'products_main_product_created_at_idx', function (Blueprint $table) {
            $table->index(
                ['main_product_id', 'created_at'],
                'products_main_product_created_at_idx'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $this->dropIndexIfExists('products', 'products_main_product_created_at_idx');
        $this->dropIndexIfExists('products', 'products_main_product_brand_category_idx');
        $this->dropIndexIfExists('main_products', 'main_products_code_idx');
        $this->dropIndexIfExists('main_products', 'main_products_name_idx');
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
