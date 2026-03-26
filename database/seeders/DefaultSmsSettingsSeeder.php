<?php

namespace Database\Seeders;

use App\Models\SmsSetting;
use Illuminate\Database\Seeder;

class DefaultSmsSettingsSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            'url' => 'http://test.com/api/test.php',
            'mobile_key' => '',
            'message_key' => '',
            'payload' => '',
        ] as $key => $value) {
            SmsSetting::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
    }
}
