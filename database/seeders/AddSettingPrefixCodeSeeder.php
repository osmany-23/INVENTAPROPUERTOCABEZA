<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class AddSettingPrefixCodeSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            'purchase_code' => 'PU',
            'purchase_return_code' => 'PR',
            'sale_code' => 'SA',
            'sale_return_code' => 'SR',
            'expense_code' => 'EX',
        ] as $key => $value) {
            Setting::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
    }
}
