<?php

namespace Database\Factories;

use App\Models\Groupe;
use App\Models\Stagiaire;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class StagiaireFactory extends Factory
{
  protected $model = Stagiaire::class;

  public function definition(): array
  {
    $user = User::factory()->create([
      'role' => 'stagiaire',
      'identifiant' => $this->faker->unique()->numerify('S#####'),
    ]);
    return [
      'user_id' => $user->id,
      'groupe_id' => Groupe::inRandomOrder()->first()->id,
      'numero_inscription' => $user->identifiant,
    ];
  }
}
