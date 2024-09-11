<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\ClientSeeder;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            UfsSeeder::class,
            EquipamentsSeeder::class,
            ClientsSeeder::class,
            ProjectEquipamentTableSeeder::class
        ]);
    }
}
