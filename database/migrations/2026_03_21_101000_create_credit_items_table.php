<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('credit_items')) {
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
            });
        } else {
            Schema::table('credit_items', function (Blueprint $table) {
                if (! Schema::hasColumn('credit_items', 'credit_id')) {
                    $table->unsignedBigInteger('credit_id')->after('id');
                }
                if (! Schema::hasColumn('credit_items', 'sale_item_id')) {
                    $table->unsignedBigInteger('sale_item_id')->nullable()->after('credit_id');
                }
                if (! Schema::hasColumn('credit_items', 'product_id')) {
                    $table->unsignedBigInteger('product_id')->after('sale_item_id');
                }
                if (! Schema::hasColumn('credit_items', 'warehouse_id')) {
                    $table->unsignedBigInteger('warehouse_id')->after('product_id');
                }
                if (! Schema::hasColumn('credit_items', 'quantity')) {
                    $table->decimal('quantity', 15, 2)->after('warehouse_id');
                }
                if (! Schema::hasColumn('credit_items', 'product_price')) {
                    $table->decimal('product_price', 15, 2)->after('quantity');
                }
                if (! Schema::hasColumn('credit_items', 'sub_total')) {
                    $table->decimal('sub_total', 15, 2)->after('product_price');
                }
                if (! Schema::hasColumn('credit_items', 'source')) {
                    $table->string('source', 30)->default('manual')->after('sub_total');
                }
                if (! Schema::hasColumn('credit_items', 'note')) {
                    $table->text('note')->nullable()->after('source');
                }
                if (! Schema::hasColumn('credit_items', 'created_at')) {
                    $table->timestamp('created_at')->nullable();
                }
                if (! Schema::hasColumn('credit_items', 'updated_at')) {
                    $table->timestamp('updated_at')->nullable();
                }
            });
        }

        $this->addIndexIfMissing('credit_items', 'credit_items_credit_id_index', fn (Blueprint $table) => $table->index('credit_id'));
        $this->addIndexIfMissing('credit_items', 'credit_items_sale_item_id_index', fn (Blueprint $table) => $table->index('sale_item_id'));
        $this->addIndexIfMissing('credit_items', 'credit_items_product_id_index', fn (Blueprint $table) => $table->index('product_id'));
        $this->addIndexIfMissing('credit_items', 'credit_items_warehouse_id_index', fn (Blueprint $table) => $table->index('warehouse_id'));
        $this->addIndexIfMissing('credit_items', 'credit_items_source_index', fn (Blueprint $table) => $table->index('source'));
        $this->addIndexIfMissing('credit_items', 'credit_items_created_at_index', fn (Blueprint $table) => $table->index('created_at'));
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_items');
    }

    private function addIndexIfMissing(string $table, string $indexName, callable $callback): void
    {
        if (! Schema::hasTable($table) || $this->indexExists($table, $indexName)) {
            return;
        }

        Schema::table($table, $callback);
    }

    private function indexExists(string $table, string $indexName): bool
    {
        $result = DB::select("SHOW INDEX FROM `{$table}` WHERE Key_name = ?", [$indexName]);

        return ! empty($result);
    }
};
