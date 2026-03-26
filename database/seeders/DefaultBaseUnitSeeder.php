<?php

namespace Database\Seeders;

use App\Models\BaseUnit;
use Illuminate\Database\Seeder;

class DefaultBaseUnitSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            ['id' => 1, 'name' => 'JUEGO', 'is_default' => true],
            ['id' => 2, 'name' => 'UNIDAD', 'is_default' => true],
            ['id' => 3, 'name' => 'PIES', 'is_default' => true],
            ['id' => 4, 'name' => 'PAR', 'is_default' => false],
        ] as $baseUnit) {
            BaseUnit::query()->updateOrCreate(
                ['id' => $baseUnit['id']],
                [
                    'name' => $baseUnit['name'],
                    'is_default' => $baseUnit['is_default'],
                ]
            );
        }
    }
}
