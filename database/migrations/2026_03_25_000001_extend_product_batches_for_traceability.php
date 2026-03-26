<?php

use App\Models\Purchase;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('product_batches')) {
            Schema::table('product_batches', function (Blueprint $table) {
                if (! Schema::hasColumn('product_batches', 'codigo_lote_sistema')) {
                    $table->string('codigo_lote_sistema')->nullable()->after('lot_code');
                }
                if (! Schema::hasColumn('product_batches', 'lote_fabricante')) {
                    $table->string('lote_fabricante')->nullable()->after('codigo_lote_sistema');
                }
                if (! Schema::hasColumn('product_batches', 'ubicacion')) {
                    $table->string('ubicacion')->nullable()->after('lot_barcode');
                }
                if (! Schema::hasColumn('product_batches', 'descripcion')) {
                    $table->text('descripcion')->nullable()->after('ubicacion');
                }
                if (! Schema::hasColumn('product_batches', 'fecha_fabricacion')) {
                    $table->date('fecha_fabricacion')->nullable()->after('descripcion');
                }
                if (! Schema::hasColumn('product_batches', 'fecha_vencimiento')) {
                    $table->date('fecha_vencimiento')->nullable()->after('fecha_fabricacion');
                }
                if (! Schema::hasColumn('product_batches', 'impuesto_tipo')) {
                    $table->string('impuesto_tipo', 20)->nullable()->after('fecha_vencimiento');
                }
                if (! Schema::hasColumn('product_batches', 'impuesto_valor')) {
                    $table->decimal('impuesto_valor', 8, 2)->nullable()->after('impuesto_tipo');
                }
                if (! Schema::hasColumn('product_batches', 'purchase_id')) {
                    $table->unsignedBigInteger('purchase_id')->nullable()->after('impuesto_valor');
                }
            });

            $this->backfillProductBatches();

            Schema::table('product_batches', function (Blueprint $table) {
                if (! $this->indexExists('product_batches', 'product_batches_system_lot_unique')) {
                    $table->unique('codigo_lote_sistema', 'product_batches_system_lot_unique');
                }
                if (! $this->indexExists('product_batches', 'product_batches_product_warehouse_manufacturer_unique')) {
                    $table->unique(
                        ['product_id', 'warehouse_id', 'lote_fabricante'],
                        'product_batches_product_warehouse_manufacturer_unique'
                    );
                }
                if (! $this->indexExists('product_batches', 'product_batches_purchase_product_idx')) {
                    $table->index(['purchase_id', 'product_id'], 'product_batches_purchase_product_idx');
                }
            });
        }

        if (Schema::hasTable('sale_item_batches')) {
            Schema::table('sale_item_batches', function (Blueprint $table) {
                if (! Schema::hasColumn('sale_item_batches', 'codigo_lote_sistema')) {
                    $table->string('codigo_lote_sistema')->nullable()->after('product_batch_id');
                }
                if (! Schema::hasColumn('sale_item_batches', 'lote_fabricante')) {
                    $table->string('lote_fabricante')->nullable()->after('codigo_lote_sistema');
                }
                if (! Schema::hasColumn('sale_item_batches', 'ubicacion')) {
                    $table->string('ubicacion')->nullable()->after('lot_barcode');
                }
                if (! Schema::hasColumn('sale_item_batches', 'fecha_fabricacion')) {
                    $table->date('fecha_fabricacion')->nullable()->after('quantity');
                }
                if (! Schema::hasColumn('sale_item_batches', 'fecha_vencimiento')) {
                    $table->date('fecha_vencimiento')->nullable()->after('fecha_fabricacion');
                }
                if (! Schema::hasColumn('sale_item_batches', 'impuesto_tipo')) {
                    $table->string('impuesto_tipo', 20)->nullable()->after('expires_at');
                }
                if (! Schema::hasColumn('sale_item_batches', 'impuesto_valor')) {
                    $table->decimal('impuesto_valor', 8, 2)->nullable()->after('impuesto_tipo');
                }
            });

            $this->backfillSaleItemBatches();
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('sale_item_batches')) {
            Schema::table('sale_item_batches', function (Blueprint $table) {
                $columns = array_values(array_filter([
                    Schema::hasColumn('sale_item_batches', 'codigo_lote_sistema') ? 'codigo_lote_sistema' : null,
                    Schema::hasColumn('sale_item_batches', 'lote_fabricante') ? 'lote_fabricante' : null,
                    Schema::hasColumn('sale_item_batches', 'ubicacion') ? 'ubicacion' : null,
                    Schema::hasColumn('sale_item_batches', 'fecha_fabricacion') ? 'fecha_fabricacion' : null,
                    Schema::hasColumn('sale_item_batches', 'fecha_vencimiento') ? 'fecha_vencimiento' : null,
                    Schema::hasColumn('sale_item_batches', 'impuesto_tipo') ? 'impuesto_tipo' : null,
                    Schema::hasColumn('sale_item_batches', 'impuesto_valor') ? 'impuesto_valor' : null,
                ]));

                if (! empty($columns)) {
                    $table->dropColumn($columns);
                }
            });
        }

        if (Schema::hasTable('product_batches')) {
            Schema::table('product_batches', function (Blueprint $table) {
                if ($this->indexExists('product_batches', 'product_batches_system_lot_unique')) {
                    $table->dropUnique('product_batches_system_lot_unique');
                }
                if ($this->indexExists('product_batches', 'product_batches_product_warehouse_manufacturer_unique')) {
                    $table->dropUnique('product_batches_product_warehouse_manufacturer_unique');
                }
                if ($this->indexExists('product_batches', 'product_batches_purchase_product_idx')) {
                    $table->dropIndex('product_batches_purchase_product_idx');
                }

                $columns = array_values(array_filter([
                    Schema::hasColumn('product_batches', 'codigo_lote_sistema') ? 'codigo_lote_sistema' : null,
                    Schema::hasColumn('product_batches', 'lote_fabricante') ? 'lote_fabricante' : null,
                    Schema::hasColumn('product_batches', 'ubicacion') ? 'ubicacion' : null,
                    Schema::hasColumn('product_batches', 'descripcion') ? 'descripcion' : null,
                    Schema::hasColumn('product_batches', 'fecha_fabricacion') ? 'fecha_fabricacion' : null,
                    Schema::hasColumn('product_batches', 'fecha_vencimiento') ? 'fecha_vencimiento' : null,
                    Schema::hasColumn('product_batches', 'impuesto_tipo') ? 'impuesto_tipo' : null,
                    Schema::hasColumn('product_batches', 'impuesto_valor') ? 'impuesto_valor' : null,
                    Schema::hasColumn('product_batches', 'purchase_id') ? 'purchase_id' : null,
                ]));

                if (! empty($columns)) {
                    $table->dropColumn($columns);
                }
            });
        }
    }

    private function backfillProductBatches(): void
    {
        DB::table('product_batches')
            ->where(function ($query) {
                $query->whereNull('lote_fabricante')
                    ->orWhere('lote_fabricante', '');
            })
            ->update(['lote_fabricante' => DB::raw('lot_code')]);

        DB::table('product_batches')
            ->whereNull('fecha_vencimiento')
            ->update(['fecha_vencimiento' => DB::raw('expires_at')]);

        DB::table('product_batches')
            ->whereNull('expires_at')
            ->update(['expires_at' => DB::raw('fecha_vencimiento')]);

        DB::table('product_batches')
            ->whereNull('descripcion')
            ->update(['descripcion' => DB::raw('note')]);

        DB::table('product_batches')
            ->whereNull('impuesto_valor')
            ->update(['impuesto_valor' => 0]);

        DB::table('product_batches')
            ->whereNull('impuesto_tipo')
            ->update(['impuesto_tipo' => 'EXCLUSIVO']);

        DB::table('product_batches')
            ->select(['id', 'product_id', 'codigo_lote_sistema', 'impuesto_tipo', 'impuesto_valor', 'purchase_id'])
            ->orderBy('id')
            ->chunkById(200, function ($rows) {
                $productIds = collect($rows)
                    ->pluck('product_id')
                    ->filter()
                    ->unique()
                    ->values()
                    ->all();

                $products = DB::table('products')
                    ->whereIn('id', $productIds)
                    ->pluck('tax_type', 'id');
                $taxValues = DB::table('products')
                    ->whereIn('id', $productIds)
                    ->pluck('order_tax', 'id');
                $purchaseIds = $this->purchaseIdsByBatchIds(
                    collect($rows)->pluck('id')->map(fn ($id) => (int) $id)->all()
                );

                foreach ($rows as $row) {
                    $payload = [];

                    if (empty($row->codigo_lote_sistema)) {
                        $payload['codigo_lote_sistema'] = $this->formatSystemLotCode((int) $row->id);
                    }

                    if (empty($row->impuesto_tipo)) {
                        $payload['impuesto_tipo'] = ((int) ($products[$row->product_id] ?? 1)) === 2
                            ? 'INCLUSIVO'
                            : 'EXCLUSIVO';
                    }

                    if ($row->impuesto_valor === null) {
                        $payload['impuesto_valor'] = round((float) ($taxValues[$row->product_id] ?? 0), 2);
                    }

                    if (empty($row->purchase_id) && isset($purchaseIds[(int) $row->id])) {
                        $payload['purchase_id'] = $purchaseIds[(int) $row->id];
                    }

                    if (! empty($payload)) {
                        DB::table('product_batches')
                            ->where('id', $row->id)
                            ->update($payload);
                    }
                }
            });
    }

    private function backfillSaleItemBatches(): void
    {
        if (! Schema::hasTable('product_batches')) {
            return;
        }

        DB::table('sale_item_batches')
            ->select(['id', 'product_batch_id'])
            ->orderBy('id')
            ->chunkById(200, function ($rows) {
                $batchIds = collect($rows)
                    ->pluck('product_batch_id')
                    ->filter()
                    ->unique()
                    ->values()
                    ->all();

                if (empty($batchIds)) {
                    return;
                }

                $batches = DB::table('product_batches')
                    ->whereIn('id', $batchIds)
                    ->get()
                    ->keyBy('id');

                foreach ($rows as $row) {
                    $batch = $batches->get($row->product_batch_id);
                    if (! $batch) {
                        continue;
                    }

                    DB::table('sale_item_batches')
                        ->where('id', $row->id)
                        ->update([
                            'codigo_lote_sistema' => $batch->codigo_lote_sistema,
                            'lote_fabricante' => $batch->lote_fabricante ?: $batch->lot_code,
                            'ubicacion' => $batch->ubicacion,
                            'fecha_fabricacion' => $batch->fecha_fabricacion,
                            'fecha_vencimiento' => $batch->fecha_vencimiento ?: $batch->expires_at,
                            'impuesto_tipo' => $batch->impuesto_tipo,
                            'impuesto_valor' => $batch->impuesto_valor,
                        ]);
                }
            });
    }

    private function purchaseIdsByBatchIds(array $batchIds): array
    {
        if (empty($batchIds) || ! Schema::hasTable('product_batch_movements')) {
            return [];
        }

        return DB::table('product_batch_movements')
            ->whereIn('product_batch_id', $batchIds)
            ->where('movement_type', 'receive')
            ->whereNotNull('reference_id')
            ->where(function ($query) {
                $query->where('reference_type', Purchase::class)
                    ->orWhereNull('reference_type');
            })
            ->orderBy('id')
            ->get(['product_batch_id', 'reference_id'])
            ->groupBy('product_batch_id')
            ->map(fn ($rows) => (int) optional($rows->last())->reference_id)
            ->all();
    }

    private function formatSystemLotCode(int $id): string
    {
        return 'LOTE-'.str_pad((string) $id, 3, '0', STR_PAD_LEFT);
    }

    private function indexExists(string $table, string $index): bool
    {
        $database = DB::getDatabaseName();
        $result = DB::selectOne(
            'SELECT COUNT(*) AS total FROM information_schema.statistics WHERE table_schema = ? AND table_name = ? AND index_name = ?',
            [$database, $table, $index]
        );

        return (int) ($result->total ?? 0) > 0;
    }
};
