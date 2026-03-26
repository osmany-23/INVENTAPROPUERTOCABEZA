<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class DefaultSettingsCountryStatePostcodeSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            'country' => 'Nicaragua',
            'state' => 'Nueva Segovia',
            'city' => 'JALAPA',
        ] as $key => $value) {
            Setting::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
    }
}
