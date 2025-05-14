<?php

namespace Database\Factories;

use App\Models\SurveillantGeneral;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SurveillantGeneralFactory extends Factory
{
  protected $model = SurveillantGeneral::class;

  public function definition(): array
  {
    $user = User::factory()->create([
      'role' => 'surveillant',
    ]);
    return [
      'user_id' => $user->id,
      'date_recrutement' => $this->faker->date(),
    ];
  }
}
