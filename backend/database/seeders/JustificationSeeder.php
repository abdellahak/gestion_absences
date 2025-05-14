<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Justification;

class JustificationSeeder extends Seeder
{
  public function run(): void
  {
    Justification::factory(10)->create();
  }
}
