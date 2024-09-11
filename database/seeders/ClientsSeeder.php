<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $clients = [
            [
                'name' => 'João da Silva',
                'email' => 'joao.silva@email.com',
                'phone' => '(11) 91234-5678',
                'description' => 'Cliente interessado em sistema fotovoltaico residencial.',
                'status' => true,
            ],
            [
                'name' => 'Maria Oliveira',
                'email' => 'maria.oliveira@email.com',
                'phone' => '(21) 98765-4321',
                'description' => 'Cliente buscando sistema para empresa.',
                'status' => true,
            ],
            [
                'name' => 'Carlos Santos',
                'email' => 'carlos.santos@email.com',
                'phone' => '(31) 99876-5432',
                'description' => 'Cliente com dúvidas sobre manutenção.',
                'status' => false,
            ],
            [
                'name' => 'Ana Costa',
                'email' => 'ana.costa@email.com',
                'phone' => '(51) 95678-1234',
                'description' => 'Cliente quer instalar em fazenda.',
                'status' => true,
            ],
            [
                'name' => 'Pedro Ferreira',
                'email' => 'pedro.ferreira@email.com',
                'phone' => '(41) 92345-6789',
                'description' => 'Cliente interessado em financiamento para energia solar.',
                'status' => true,
            ]
        ];

        DB::table('clients')->insert($clients);
    }
}
