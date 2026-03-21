<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('credit_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('credit_id');
            $table->string('action');
            $table->text('description')->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->index('credit_id');
            $table->index('action');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_logs');
    }
};
