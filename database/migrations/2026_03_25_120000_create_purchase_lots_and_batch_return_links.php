<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('purchase_lots')) {
            Schema::create('purchase_lots', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('purchase_detail_id');
                $table->unsignedBigInteger('lote_id');
                $table->decimal('cantidad', 13, 2)->default(0);
                $table->decimal('costo_unitario', 13, 2)->default(0);
                $table->decimal('precio_venta', 13, 2)->nullable();
                $table->timestamps();

                $table->foreign('purchase_detail_id')
                    ->references('id')
                    ->on('purchase_items')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
                $table->foreign('lote_id')
                    ->references('id')
                    ->on('product_batches')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');

                $table->unique('lote_id', 'purchase_lots_lote_unique');
                $table->index('purchase_detail_id', 'purchase_lots_purchase_detail_idx');
            });
        }

        if (Schema::hasTable('purchases') && ! Schema::hasColumn('purchases', 'tipo_origen')) {
            Schema::table('purchases', function (Blueprint $table) {
                $table->string('tipo_origen', 40)->nullable()->after('reference_code');
                $table->index('tipo_origen', 'purchases_tipo_origen_idx');
            });
        }

        if (Schema::hasTable('purchases_return_items')) {
            Schema::table('purchases_return_items', function (Blueprint $table) {
                if (! Schema::hasColumn('purchases_return_items', 'purchase_lot_id')) {
                    $table->unsignedBigInteger('purchase_lot_id')->nullable()->after('product_id');
                }
                if (! Schema::hasColumn('purchases_return_items', 'product_batch_id')) {
                    $table->unsignedBigInteger('product_batch_id')->nullable()->after('purchase_lot_id');
                }
                if (! Schema::hasColumn('purchases_return_items', 'codigo_lote_sistema')) {
                    $table->string('codigo_lote_sistema')->nullable()->after('product_batch_id');
                }
                if (! Schema::hasColumn('purchases_return_items', 'lote_fabricante')) {
                    $table->string('lote_fabricante')->nullable()->after('codigo_lote_sistema');
                }
            });

            Schema::table('purchases_return_items', function (Blueprint $table) {
                if (! $this->indexExists('purchases_return_items', 'purchase_return_items_purchase_lot_idx')) {
                    $table->index('purchase_lot_id', 'purchase_return_items_purchase_lot_idx');
                }
                if (! $this->indexExists('purchases_return_items', 'purchase_return_items_batch_idx')) {
                    $table->index('product_batch_id', 'purchase_return_items_batch_idx');
                }
            });
        }

        $this->backfillPurchaseOrigins();
        $this->backfillPurchaseLots();
    }

    public function down(): void
    {
        if (Schema::hasTable('purchases_return_items')) {
            Schema::table('purchases_return_items', function (Blueprint $table) {
                if ($this->indexExists('purchases_return_items', 'purchase_return_items_purchase_lot_idx')) {
                    $table->dropIndex('purchase_return_items_purchase_lot_idx');
                }
                if ($this->indexExists('purchases_return_items', 'purchase_return_items_batch_idx')) {
                    $table->dropIndex('purchase_return_items_batch_idx');
                }

                $columns = array_values(array_filter([
                    Schema::hasColumn('purchases_return_items', 'purchase_lot_id') ? 'purchase_lot_id' : null,
                    Schema::hasColumn('purchases_return_items', 'product_batch_id') ? 'product_batch_id' : null,
                    Schema::hasColumn('purchases_return_items', 'codigo_lote_sistema') ? 'codigo_lote_sistema' : null,
                    Schema::hasColumn('purchases_return_items', 'lote_fabricante') ? 'lote_fabricante' : null,
                ]));

                if (! empty($columns)) {
                    $table->dropColumn($columns);
                }
            });
        }

        if (Schema::hasTable('purchases') && Schema::hasColumn('purchases', 'tipo_origen')) {
            Schema::table('purchases', function (Blueprint $table) {
                if ($this->indexExists('purchases', 'purchases_tipo_origen_idx')) {
                    $table->dropIndex('purchases_tipo_origen_idx');
                }
                $table->dropColumn('tipo_origen');
            });
        }

        Schema::dropIfExists('purchase_lots');
    }

    private function backfillPurchaseOrigins(): void
    {
        if (! Schema::hasTable('purchases') || ! Schema::hasTable('product_batches') || ! Schema::hasColumn('purchases', 'tipo_origen')) {
            return;
        }

        $purchaseIds = DB::table('product_batches')
            ->whereNotNull('purchase_id')
            ->pluck('purchase_id')
            ->filter()
            ->unique()
            ->values()
            ->all();

        if (empty($purchaseIds)) {
            return;
        }

        DB::table('purchases')
            ->whereIn('id', $purchaseIds)
            ->where(function ($query) {
                $query->whereNull('tipo_origen')->orWhere('tipo_origen', '');
            })
            ->update(['tipo_origen' => 'LOTE']);
    }

    private function backfillPurchaseLots(): void
    {
        if (! Schema::hasTable('purchase_lots')
            || ! Schema::hasTable('product_batches')
            || ! Schema::hasTable('purchase_items')) {
            return;
        }

        DB::table('product_batches')
            ->whereNotNull('purchase_id')
            ->orderBy('id')
            ->chunkById(100, function (Collection $batches) {
                $existingLotIds = DB::table('purchase_lots')
                    ->whereIn('lote_id', $batches->pluck('id')->all())
                    ->pluck('lote_id')
                    ->map(fn ($id) => (int) $id)
                    ->all();
                $existingLotLookup = array_flip($existingLotIds);

                foreach ($batches as $batch) {
                    $batchId = (int) $batch->id;
                    if (isset($existingLotLookup[$batchId])) {
                        continue;
                    }

                    $purchaseItems = DB::table('purchase_items')
                        ->where('purchase_id', $batch->purchase_id)
                        ->where('product_id', $batch->product_id)
                        ->get();

                    if ($purchaseItems->isEmpty()) {
                        continue;
                    }

                    $selectedPurchaseItem = $purchaseItems
                        ->sortBy(fn ($item) => abs((float) $item->quantity - (float) $batch->received_quantity))
                        ->first();

                    if (! $selectedPurchaseItem) {
                        continue;
                    }

                    $pricePayload = $this->resolveBackfillSalePrice($batchId, (int) $batch->product_id);

                    DB::table('purchase_lots')->insert([
                        'purchase_detail_id' => (int) $selectedPurchaseItem->id,
                        'lote_id' => $batchId,
                        'cantidad' => round((float) ($batch->received_quantity ?? $selectedPurchaseItem->quantity ?? 0), 2),
                        'costo_unitario' => round((float) ($selectedPurchaseItem->product_cost ?? 0), 2),
                        'precio_venta' => $pricePayload,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            });
    }

    private function resolveBackfillSalePrice(int $batchId, int $productId): ?float
    {
        $movement = DB::table('product_batch_movements')
            ->where('product_batch_id', $batchId)
            ->where('movement_type', 'receive')
            ->latest('id')
            ->first();

        $meta = [];
        if ($movement && ! empty($movement->meta)) {
            $decoded = is_array($movement->meta) ? $movement->meta : json_decode((string) $movement->meta, true);
            $meta = is_array($decoded) ? $decoded : [];
        }

        if (array_key_exists('product_price', $meta) && is_numeric($meta['product_price'])) {
            return round((float) $meta['product_price'], 2);
        }

        $productPrice = DB::table('products')->where('id', $productId)->value('product_price');

        return is_numeric($productPrice) ? round((float) $productPrice, 2) : null;
    }

    private function indexExists(string $table, string $indexName): bool
    {
        $connection = Schema::getConnection();
        $schemaManager = method_exists($connection, 'getDoctrineSchemaManager')
            ? $connection->getDoctrineSchemaManager()
            : null;

        if (! $schemaManager) {
            return false;
        }

        $indexes = $schemaManager->listTableIndexes($table);

        return array_key_exists($indexName, $indexes);
    }
};
