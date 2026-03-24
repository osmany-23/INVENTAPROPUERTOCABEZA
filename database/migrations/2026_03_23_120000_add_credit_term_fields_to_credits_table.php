<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('credits', function (Blueprint $table) {
            $table->string('credit_type', 20)
                ->default('automatico')
                ->after('installments');
            $table->boolean('restructured')
                ->default(false)
                ->after('note');
            $table->timestamp('restructured_at')
                ->nullable()
                ->after('restructured');
            $table->decimal('previous_balance', 15, 2)
                ->nullable()
                ->after('restructured_at');

            $table->index('credit_type');
            $table->index('restructured');
        });
    }

    public function down(): void
    {
        Schema::table('credits', function (Blueprint $table) {
            $table->dropIndex(['credit_type']);
            $table->dropIndex(['restructured']);
            $table->dropColumn([
                'credit_type',
                'restructured',
                'restructured_at',
                'previous_balance',
            ]);
        });
    }
};
