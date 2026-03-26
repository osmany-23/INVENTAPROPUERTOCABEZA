<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('product_batch_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->boolean('track_batches')->default(false);
            $table->unsignedInteger('alert_days')->default(30);
            $table->boolean('deny_expired_sale')->default(true);
            $table->timestamps();

            $table->unique('product_id', 'product_batch_settings_product_unique');
            $table->index(['track_batches', 'product_id'], 'product_batch_settings_track_product_idx');
        });

        Schema::create('product_batches', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('warehouse_id');
            $table->string('lot_code');
            $table->string('codigo_lote_sistema')->nullable();
            $table->string('lote_fabricante');
            $table->string('lot_barcode')->nullable();
            $table->string('ubicacion')->nullable();
            $table->text('descripcion')->nullable();
            $table->date('fecha_fabricacion')->nullable();
            $table->date('fecha_vencimiento')->nullable();
            $table->string('impuesto_tipo', 20)->default('EXCLUSIVO');
            $table->decimal('impuesto_valor', 8, 2)->default(0);
            $table->unsignedBigInteger('purchase_id')->nullable();
            $table->decimal('received_quantity', 13, 2)->default(0);
            $table->decimal('available_quantity', 13, 2)->default(0);
            $table->date('expires_at')->nullable();
            $table->date('received_at')->nullable();
            $table->string('status', 40)->default('available');
            $table->text('note')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();

            $table->unique(['product_id', 'warehouse_id', 'lot_code'], 'product_batches_product_warehouse_lot_unique');
            $table->unique('codigo_lote_sistema', 'product_batches_system_lot_unique');
            $table->unique(['product_id', 'warehouse_id', 'lote_fabricante'], 'product_batches_product_warehouse_manufacturer_unique');
            $table->unique('lot_barcode', 'product_batches_lot_barcode_unique');
            $table->index(['warehouse_id', 'product_id', 'available_quantity'], 'product_batches_warehouse_product_available_idx');
            $table->index(['product_id', 'status', 'expires_at'], 'product_batches_product_status_expiry_idx');
            $table->index(['warehouse_id', 'expires_at'], 'product_batches_warehouse_expiry_idx');
            $table->index(['purchase_id', 'product_id'], 'product_batches_purchase_product_idx');
        });

        Schema::create('product_batch_movements', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_batch_id');
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('warehouse_id');
            $table->string('movement_type', 40);
            $table->string('reference_type', 120)->nullable();
            $table->unsignedBigInteger('reference_id')->nullable();
            $table->decimal('quantity', 13, 2);
            $table->decimal('quantity_before', 13, 2)->default(0);
            $table->decimal('quantity_after', 13, 2)->default(0);
            $table->text('note')->nullable();
            $table->json('meta')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->timestamps();

            $table->index(['product_batch_id', 'created_at'], 'product_batch_movements_batch_created_idx');
            $table->index(['product_id', 'warehouse_id', 'movement_type'], 'product_batch_movements_product_warehouse_type_idx');
            $table->index(['reference_type', 'reference_id'], 'product_batch_movements_reference_idx');
        });

        Schema::create('sale_item_batches', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sale_id');
            $table->unsignedBigInteger('sale_item_id');
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('warehouse_id');
            $table->unsignedBigInteger('product_batch_id');
            $table->string('codigo_lote_sistema')->nullable();
            $table->string('lote_fabricante')->nullable();
            $table->string('lot_code');
            $table->string('lot_barcode')->nullable();
            $table->string('ubicacion')->nullable();
            $table->decimal('quantity', 13, 2);
            $table->date('fecha_fabricacion')->nullable();
            $table->date('fecha_vencimiento')->nullable();
            $table->date('expires_at')->nullable();
            $table->string('impuesto_tipo', 20)->nullable();
            $table->decimal('impuesto_valor', 8, 2)->nullable();
            $table->timestamps();

            $table->index(['sale_id', 'sale_item_id'], 'sale_item_batches_sale_item_idx');
            $table->index(['product_batch_id', 'sale_id'], 'sale_item_batches_batch_sale_idx');
            $table->index(['product_id', 'warehouse_id'], 'sale_item_batches_product_warehouse_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sale_item_batches');
        Schema::dropIfExists('product_batch_movements');
        Schema::dropIfExists('product_batches');
        Schema::dropIfExists('product_batch_settings');
    }
};
