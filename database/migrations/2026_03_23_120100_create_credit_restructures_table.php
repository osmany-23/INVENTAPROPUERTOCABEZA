<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('credit_restructures')) {
            Schema::create('credit_restructures', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('credit_id');
                $table->decimal('old_balance', 15, 2);
                $table->decimal('new_balance', 15, 2);
                $table->text('old_terms')->nullable();
                $table->text('new_terms')->nullable();
                $table->text('reason')->nullable();
                $table->timestamp('created_at')->useCurrent();
            });
        } else {
            Schema::table('credit_restructures', function (Blueprint $table) {
                if (! Schema::hasColumn('credit_restructures', 'credit_id')) {
                    $table->unsignedBigInteger('credit_id')->after('id');
                }
                if (! Schema::hasColumn('credit_restructures', 'old_balance')) {
                    $table->decimal('old_balance', 15, 2)->after('credit_id');
                }
                if (! Schema::hasColumn('credit_restructures', 'new_balance')) {
                    $table->decimal('new_balance', 15, 2)->after('old_balance');
                }
                if (! Schema::hasColumn('credit_restructures', 'old_terms')) {
                    $table->text('old_terms')->nullable()->after('new_balance');
                }
                if (! Schema::hasColumn('credit_restructures', 'new_terms')) {
                    $table->text('new_terms')->nullable()->after('old_terms');
                }
                if (! Schema::hasColumn('credit_restructures', 'reason')) {
                    $table->text('reason')->nullable()->after('new_terms');
                }
                if (! Schema::hasColumn('credit_restructures', 'created_at')) {
                    $table->timestamp('created_at')->useCurrent();
                }
            });
        }

        $this->addIndexIfMissing('credit_restructures', 'credit_restructures_credit_id_index', fn (Blueprint $table) => $table->index('credit_id'));
        $this->addIndexIfMissing('credit_restructures', 'credit_restructures_created_at_index', fn (Blueprint $table) => $table->index('created_at'));
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_restructures');
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
