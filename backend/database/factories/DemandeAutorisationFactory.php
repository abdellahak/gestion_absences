<?php

namespace Database\Factories;

use App\Models\DemandeAutorisation;
use App\Models\Stagiaire;
use App\Models\SurveillantGeneral;
use Illuminate\Database\Eloquent\Factories\Factory;

class DemandeAutorisationFactory extends Factory
{
  protected $model = DemandeAutorisation::class;

  public function definition(): array
  {
    return [
      'stagiaire_id' => Stagiaire::inRandomOrder()->first()?->id,
      'surveillant_general_id' => SurveillantGeneral::inRandomOrder()->first()?->id,
      'intitule' => $this->faker->sentence(3),
      'description' => $this->faker->paragraph(),
      'document' => $this->faker->optional()->word() . '.pdf',
      'date' => $this->faker->date(),
      'heure_debut' => $this->faker->time(),
      'heure_fin' => $this->faker->time(),
      'status' => $this->faker->randomElement(['en_attente', 'valide', 'refuse']),
    ];
  }
}
