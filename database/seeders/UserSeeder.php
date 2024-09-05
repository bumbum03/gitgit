<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'Adminos@g.co',
            'nomor' => '0838742821',
            'password' => '12345678'
        ]);

        User::create([
            'name' =>  'User',
            'email' => 'User@g.co',
            'nomor' => '0280398434',
            'password' => '12345678'
        ]);
    }
}