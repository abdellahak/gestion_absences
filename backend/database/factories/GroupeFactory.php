<?php

namespace Database\Factories;

use App\Models\Filiere;
use App\Models\Groupe;
use App\Models\SurveillantGeneral;
use Illuminate\Database\Eloquent\Factories\Factory;

class GroupeFactory extends Factory
{
  protected $model = Groupe::class;

  public function definition(): array
  {
    return [
      'intitule' => $this->faker->word(),
      'code' => $this->faker->unique()->word(),
      'filiere_id' => Filiere::inRandomOrder()->first()->id,
    ];
  }
}
