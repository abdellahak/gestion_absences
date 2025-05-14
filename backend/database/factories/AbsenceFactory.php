<?php

namespace Database\Factories;

use App\Models\Absence;
use App\Models\Stagiaire;
use App\Models\Formateur;
use Illuminate\Database\Eloquent\Factories\Factory;

class AbsenceFactory extends Factory
{
  protected $model = Absence::class;

  public function definition(): array
  {
    return [
      'stagiaire_id' => Stagiaire::inRandomOrder()->first()->id,
      'formateur_id' => Formateur::inRandomOrder()->first()->id,
      'date_absence' => $this->faker->date(),
      'heure_debut' => $this->faker->time(),
      'heure_fin' => $this->faker->time(),
    ];
  }
}
