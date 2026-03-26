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
        if (! Schema::hasTable('media') || $this->indexExists('media', 'media_model_collection_lookup_idx')) {
            return;
        }

        Schema::table('media', function (Blueprint $table) {
            $table->index(['model_type', 'collection_name', 'model_id', 'id'], 'media_model_collection_lookup_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasTable('media') || ! $this->indexExists('media', 'media_model_collection_lookup_idx')) {
            return;
        }

        Schema::table('media', function (Blueprint $table) {
            $table->dropIndex('media_model_collection_lookup_idx');
        });
    }

    private function indexExists(string $table, string $indexName): bool
    {
        $result = DB::select("SHOW INDEX FROM `{$table}` WHERE Key_name = ?", [$indexName]);

        return ! empty($result);
    }
};
