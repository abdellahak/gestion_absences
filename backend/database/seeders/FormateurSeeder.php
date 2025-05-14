<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Formateur;

class FormateurSeeder extends Seeder
{
  public function run(): void
  {
    Formateur::factory(5)->create();
  }
}
