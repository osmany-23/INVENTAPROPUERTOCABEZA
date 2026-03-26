<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class DefaultSettingDateFormatSeeder extends Seeder
{
    public function run(): void
    {
        Setting::query()->updateOrCreate(
            ['key' => 'date_format'],
            ['value' => 'd-m-y']
        );
    }
}
