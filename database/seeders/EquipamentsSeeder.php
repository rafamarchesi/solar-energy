<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EquipamentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $equipaments = [
            ['name' => 'Painel Solar'],
            ['name' => 'Inversor Solar'],
            ['name' => 'Controlador de Carga'],
            ['name' => 'Bateria Solar'],
            ['name' => 'Estrutura de Suporte']
        ];

        DB::table('equipaments')->insert($equipaments);
    }
}
