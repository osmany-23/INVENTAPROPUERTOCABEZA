<?php

namespace Database\Seeders;

use App\Models\BaseUnit;
use Illuminate\Database\Seeder;

class AddIsDefaultBaseUnitTableSeeder extends Seeder
{
    public function run(): void
    {
        BaseUnit::query()->whereIn('id', [1, 2, 3])->update(['is_default' => true]);
        BaseUnit::query()->where('id', 4)->update(['is_default' => false]);
    }
}
