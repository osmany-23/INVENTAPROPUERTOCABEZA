<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('credit_item_returns')) {
            Schema::create('credit_item_returns', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('credit_id');
                $table->unsignedBigInteger('credit_item_id');
                $table->unsignedBigInteger('product_id');
                $table->unsignedBigInteger('warehouse_id');
                $table->decimal('quantity', 15, 2);
                $table->decimal('product_price', 15, 2);
                $table->decimal('sub_total', 15, 2);
                $table->text('note')->nullable();
                $table->timestamps();
            });
        } else {
            Schema::table('credit_item_returns', function (Blueprint $table) {
                if (! Schema::hasColumn('credit_item_returns', 'credit_id')) {
                    $table->unsignedBigInteger('credit_id')->after('id');
                }
                if (! Schema::hasColumn('credit_item_returns', 'credit_item_id')) {
                    $table->unsignedBigInteger('credit_item_id')->after('credit_id');
                }
                if (! Schema::hasColumn('credit_item_returns', 'product_id')) {
                    $table->unsignedBigInteger('product_id')->after('credit_item_id');
                }
                if (! Schema::hasColumn('credit_item_returns', 'warehouse_id')) {
                    $table->unsignedBigInteger('warehouse_id')->after('product_id');
                }
                if (! Schema::hasColumn('credit_item_returns', 'quantity')) {
                    $table->decimal('quantity', 15, 2)->after('warehouse_id');
                }
                if (! Schema::hasColumn('credit_item_returns', 'product_price')) {
                    $table->decimal('product_price', 15, 2)->after('quantity');
                }
                if (! Schema::hasColumn('credit_item_returns', 'sub_total')) {
                    $table->decimal('sub_total', 15, 2)->after('product_price');
                }
                if (! Schema::hasColumn('credit_item_returns', 'note')) {
                    $table->text('note')->nullable()->after('sub_total');
                }
                if (! Schema::hasColumn('credit_item_returns', 'created_at')) {
                    $table->timestamp('created_at')->nullable();
                }
                if (! Schema::hasColumn('credit_item_returns', 'updated_at')) {
                    $table->timestamp('updated_at')->nullable();
                }
            });
        }

        $this->addIndexIfMissing('credit_item_returns', 'credit_item_returns_credit_id_index', fn (Blueprint $table) => $table->index('credit_id'));
        $this->addIndexIfMissing('credit_item_returns', 'credit_item_returns_credit_item_id_index', fn (Blueprint $table) => $table->index('credit_item_id'));
        $this->addIndexIfMissing('credit_item_returns', 'credit_item_returns_product_id_index', fn (Blueprint $table) => $table->index('product_id'));
        $this->addIndexIfMissing('credit_item_returns', 'credit_item_returns_warehouse_id_index', fn (Blueprint $table) => $table->index('warehouse_id'));
        $this->addIndexIfMissing('credit_item_returns', 'credit_item_returns_created_at_index', fn (Blueprint $table) => $table->index('created_at'));
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_item_returns');
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
