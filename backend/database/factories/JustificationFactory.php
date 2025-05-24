<?php

namespace Database\Factories;

use App\Models\Absence;
use App\Models\Justification;
use App\Models\SurveillantGeneral;
use Illuminate\Database\Eloquent\Factories\Factory;

class JustificationFactory extends Factory
{
  protected $model = Justification::class;

  public function definition(): array
  {
    return [
      'surveillant_general_id' => SurveillantGeneral::inRandomOrder()->first()->id,
      'intitule' => $this->faker->sentence(3),
      'document' => $this->faker->optional()->word() . '.pdf',
      'status' => $this->faker->randomElement(['en_attente', 'valide', 'refuse']),
    ];
  }
}
