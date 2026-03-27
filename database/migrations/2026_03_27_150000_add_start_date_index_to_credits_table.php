<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const INDEX_NAME = 'credits_start_date_index';

    public function up(): void
    {
        Schema::table('credits', function (Blueprint $table) {
            $table->index('start_date', self::INDEX_NAME);
        });
    }

    public function down(): void
    {
        Schema::table('credits', function (Blueprint $table) {
            $table->dropIndex(self::INDEX_NAME);
        });
    }
};
