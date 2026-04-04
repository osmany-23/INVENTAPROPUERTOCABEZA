<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            DefaultCountriesSeeder::class,
            DefaultLanguageTableSeeder::class,
            DefaultBaseUnitSeeder::class,
            DefaultUnitSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            CreditAndBatchPermissionSeeder::class,
            DefaultUserSeeder::class,
            InitializeUserLastActivitySeeder::class,
            SettingTableSeeder::class,
            DefaultEmailTemplateSeeder::class,
            DefaultSmsTemplateSeeder::class,
            DefaultSmsSettingsSeeder::class,
        ]);
    }
}
