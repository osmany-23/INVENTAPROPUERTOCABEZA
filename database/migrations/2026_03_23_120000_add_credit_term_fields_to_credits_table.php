<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('credits')) {
            return;
        }

        Schema::table('credits', function (Blueprint $table) {
            if (! Schema::hasColumn('credits', 'credit_type')) {
                $table->string('credit_type', 20)->default('automatico')->after('installments');
            }
            if (! Schema::hasColumn('credits', 'restructured')) {
                $table->boolean('restructured')->default(false)->after('note');
            }
            if (! Schema::hasColumn('credits', 'restructured_at')) {
                $table->timestamp('restructured_at')->nullable()->after('restructured');
            }
            if (! Schema::hasColumn('credits', 'previous_balance')) {
                $table->decimal('previous_balance', 15, 2)->nullable()->after('restructured_at');
            }
        });

        $this->addIndexIfMissing('credits', 'credits_credit_type_index', fn (Blueprint $table) => $table->index('credit_type'));
        $this->addIndexIfMissing('credits', 'credits_restructured_index', fn (Blueprint $table) => $table->index('restructured'));
    }

    public function down(): void
    {
        if (! Schema::hasTable('credits')) {
            return;
        }

        Schema::table('credits', function (Blueprint $table) {
            if ($this->indexExists('credits', 'credits_credit_type_index')) {
                $table->dropIndex('credits_credit_type_index');
            }
            if ($this->indexExists('credits', 'credits_restructured_index')) {
                $table->dropIndex('credits_restructured_index');
            }

            $columns = array_values(array_filter([
                Schema::hasColumn('credits', 'credit_type') ? 'credit_type' : null,
                Schema::hasColumn('credits', 'restructured') ? 'restructured' : null,
                Schema::hasColumn('credits', 'restructured_at') ? 'restructured_at' : null,
                Schema::hasColumn('credits', 'previous_balance') ? 'previous_balance' : null,
            ]));

            if (! empty($columns)) {
                $table->dropColumn($columns);
            }
        });
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
