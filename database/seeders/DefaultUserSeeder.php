<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DefaultUserSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::query()->firstOrCreate(
            ['email' => 'admin@infy-pos.com'],
            [
                'first_name' => 'admin',
                'last_name' => 'AS',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('123456'),
                'status' => true,
                'language' => 'en',
            ]
        );

        /** @var Role $adminRole */
        $adminRole = Role::whereName('admin')->first();

        if ($user && $adminRole) {
            $user->assignRole($adminRole);
        }
    }
}
