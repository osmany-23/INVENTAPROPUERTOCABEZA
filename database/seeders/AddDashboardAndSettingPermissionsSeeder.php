<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class AddDashboardAndSettingPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(PermissionSeeder::class);
    }
}
