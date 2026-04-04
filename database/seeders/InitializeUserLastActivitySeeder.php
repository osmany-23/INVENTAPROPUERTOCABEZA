<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InitializeUserLastActivitySeeder extends Seeder
{
    public function run(): void
    {
        if (! Schema::hasTable('users') || ! Schema::hasColumn('users', 'last_activity')) {
            return;
        }

        DB::table('users')
            ->whereNull('last_activity')
            ->update([
                'last_activity' => now(),
            ]);
    }
}
