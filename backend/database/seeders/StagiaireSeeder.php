<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Stagiaire;

class StagiaireSeeder extends Seeder
{
  public function run(): void
  {
    Stagiaire::factory(10)->create();
  }
}
