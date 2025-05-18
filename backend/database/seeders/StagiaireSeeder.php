<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Stagiaire;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class StagiaireSeeder extends Seeder
{
  public function run(): void
  {
    $user = User::factory()->create([
      'role' => 'stagiaire',
      'identifiant' => fake()->unique()->numerify('stagiaire'),
      'password' => Hash::make('stagiaire'),
    ]);
    Stagiaire::factory()->create([
      'user_id' => $user->id,
      'numero_inscription' => $user->identifiant,
    ]);
    Stagiaire::factory(10)->create();
  }
}
