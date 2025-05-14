<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            UserSeeder::class,
            FiliereSeeder::class,
            SurveillantGeneralSeeder::class, 
            GroupeSeeder::class, 
            FormateurSeeder::class, 
            StagiaireSeeder::class,
            AbsenceSeeder::class,
            DemandeAutorisationSeeder::class,
            JustificationSeeder::class,
        ]);
    }
}
