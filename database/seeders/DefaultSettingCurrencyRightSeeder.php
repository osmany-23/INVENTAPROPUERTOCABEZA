<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class DefaultSettingCurrencyRightSeeder extends Seeder
{
    public function run(): void
    {
        Setting::query()->updateOrCreate(
            ['key' => 'is_currency_right'],
            ['value' => true]
        );
    }
}
