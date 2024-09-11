<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UfsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ufs = [
            ['uf' => 'AC'], // Acre
            ['uf' => 'AL'], // Alagoas
            ['uf' => 'AP'], // Amapá
            ['uf' => 'AM'], // Amazonas
            ['uf' => 'BA'], // Bahia
            ['uf' => 'CE'], // Ceará
            ['uf' => 'DF'], // Distrito Federal
            ['uf' => 'ES'], // Espírito Santo
            ['uf' => 'GO'], // Goiás
            ['uf' => 'MA'], // Maranhão
            ['uf' => 'MT'], // Mato Grosso
            ['uf' => 'MS'], // Mato Grosso do Sul
            ['uf' => 'MG'], // Minas Gerais
            ['uf' => 'PA'], // Pará
            ['uf' => 'PB'], // Paraíba
            ['uf' => 'PR'], // Paraná
            ['uf' => 'PE'], // Pernambuco
            ['uf' => 'PI'], // Piauí
            ['uf' => 'RJ'], // Rio de Janeiro
            ['uf' => 'RN'], // Rio Grande do Norte
            ['uf' => 'RS'], // Rio Grande do Sul
            ['uf' => 'RO'], // Rondônia
            ['uf' => 'RR'], // Roraima
            ['uf' => 'SC'], // Santa Catarina
            ['uf' => 'SP'], // São Paulo
            ['uf' => 'SE'], // Sergipe
            ['uf' => 'TO']  // Tocantins
        ];

        DB::table('ufs')->insert($ufs);
    }
}
