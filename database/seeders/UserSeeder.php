<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {

        if (!DB::table('users')->where('email', 'defaultuser@example.com')->exists()) {
            DB::table('users')->insert([
                [
                    'name' => 'Default User',
                    'email' => 'defaultuser@example.com',
                    'password' => Hash::make('Senha123#'),
                ],
            ]);
        }
    }
}
