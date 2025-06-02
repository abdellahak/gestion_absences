<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Groupe;
use App\Models\Filiere;

class GroupeSeeder extends Seeder
{
  public function run(): void
  {
    $groupNumbers = [101, 102, 201, 202];

    $filieres = Filiere::all();

    foreach ($filieres as $filiere) {
      foreach ($groupNumbers as $number) {
        Groupe::create([
          'code' => trim($filiere->code) . $number,
          'intitule' => $filiere->intitule . ' ' . $number,
          'filiere_id' => $filiere->id,
        ]);
      }
    }
  }
}
