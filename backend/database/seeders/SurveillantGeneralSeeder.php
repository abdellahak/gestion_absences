<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SurveillantGeneral;

class SurveillantGeneralSeeder extends Seeder
{
  public function run(): void
  {
    SurveillantGeneral::factory(5)->create();
  }
}
