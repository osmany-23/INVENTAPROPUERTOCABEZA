<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DefaultUnitSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('units')->upsert([
            ['id' => 1, 'name' => 'CAJA', 'short_name' => 'CJA', 'base_unit' => 1],
            ['id' => 2, 'name' => 'UNIDAD', 'short_name' => 'U', 'base_unit' => 2],
            ['id' => 3, 'name' => 'KIT', 'short_name' => 'KIT', 'base_unit' => 1],
            ['id' => 4, 'name' => 'GALON', 'short_name' => 'GLN', 'base_unit' => 2],
            ['id' => 5, 'name' => 'LITRO', 'short_name' => 'LTO', 'base_unit' => 2],
            ['id' => 6, 'name' => 'JUEGO', 'short_name' => 'JGO', 'base_unit' => 2],
            ['id' => 7, 'name' => 'PAR', 'short_name' => 'PR', 'base_unit' => 4],
        ], ['id'], ['name', 'short_name', 'base_unit']);
    }
}
