<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class SyncAdminAllPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(RoleSeeder::class);
    }
}
