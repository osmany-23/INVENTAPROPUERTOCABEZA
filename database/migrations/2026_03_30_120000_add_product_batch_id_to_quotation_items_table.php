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
        if (!Schema::hasTable('quotation_items') || Schema::hasColumn('quotation_items', 'product_batch_id')) {
            return;
        }

        Schema::table('quotation_items', function (Blueprint $table) {
            $table->unsignedBigInteger('product_batch_id')->nullable()->after('product_id');
            $table->index('product_batch_id', 'quotation_items_product_batch_id_index');

            if (Schema::hasTable('product_batches')) {
                $table->foreign('product_batch_id', 'quotation_items_product_batch_id_foreign')
                    ->references('id')
                    ->on('product_batches')
                    ->nullOnDelete()
                    ->cascadeOnUpdate();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (!Schema::hasTable('quotation_items') || !Schema::hasColumn('quotation_items', 'product_batch_id')) {
            return;
        }

        Schema::table('quotation_items', function (Blueprint $table) {
            if (Schema::hasTable('product_batches')) {
                $table->dropForeign('quotation_items_product_batch_id_foreign');
            }

            $table->dropIndex('quotation_items_product_batch_id_index');
            $table->dropColumn('product_batch_id');
        });
    }
};
