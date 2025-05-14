<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Groupe;

class GroupeSeeder extends Seeder
{
  public function run(): void
  {
    Groupe::factory(5)->create();
  }
}
