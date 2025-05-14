<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DemandeAutorisation;

class DemandeAutorisationSeeder extends Seeder
{
  public function run(): void
  {
    DemandeAutorisation::factory(10)->create();
  }
}
