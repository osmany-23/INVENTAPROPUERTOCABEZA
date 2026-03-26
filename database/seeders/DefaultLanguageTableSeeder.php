<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DefaultLanguageTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('languages')->upsert([
            ['id' => 1, 'name' => 'Arabic', 'iso_code' => 'ar', 'is_default' => false],
            ['id' => 2, 'name' => 'Chinese', 'iso_code' => 'cn', 'is_default' => false],
            ['id' => 3, 'name' => 'English', 'iso_code' => 'en', 'is_default' => true],
            ['id' => 4, 'name' => 'French', 'iso_code' => 'fr', 'is_default' => false],
            ['id' => 5, 'name' => 'German', 'iso_code' => 'gr', 'is_default' => false],
            ['id' => 6, 'name' => 'Spanish', 'iso_code' => 'sp', 'is_default' => false],
            ['id' => 7, 'name' => 'Turkish', 'iso_code' => 'tr', 'is_default' => false],
            ['id' => 8, 'name' => 'vietnamese', 'iso_code' => 'vi', 'is_default' => false],
        ], ['id'], ['name', 'iso_code', 'is_default']);

        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
        ]);
    }
}
