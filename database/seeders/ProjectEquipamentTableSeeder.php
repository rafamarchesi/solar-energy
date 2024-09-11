<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectEquipamentTableSeeder extends Seeder
{
    public function run()
    {
        $projectIds = [1, 2, 3];
        $equipamentIds = [1, 2, 3, 4];

        // Para cada projeto, associe equipamentos aleatórios
        foreach ($projectIds as $projectId) {
            foreach ($equipamentIds as $equipamentId) {
                DB::table('project_equipament')->insert([
                    'project_id' => $projectId,
                    'equipament_id' => $equipamentId,
                ]);
            }
        }
    }
}
