<?php 

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;


class RoleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('roles')->delete();

        Role::create([
            'name' => 'admin',
            'full_name' => 'Administrator',
            'guard_name' => 'api'
        ]);

        Role::create([
            'name' => 'user',
            'full_name' => 'User',
            'guard_name' => 'api'
        ]);
    }
}