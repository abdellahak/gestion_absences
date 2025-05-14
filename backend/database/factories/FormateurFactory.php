<?php

namespace Database\Factories;

use App\Models\Formateur;
use App\Models\User;
use App\Models\Groupe;
use Illuminate\Database\Eloquent\Factories\Factory;

class FormateurFactory extends Factory
{
  protected $model = Formateur::class;

  public function definition(): array
  {
    $user = User::factory()->create([
      'role' => 'formateur',
    ]);
    return [
      'user_id' => $user->id,
      'date_recrutement' => $this->faker->date(),
    ];
  }

  public function configure()
  {
    return $this->afterCreating(function (Formateur $formateur) {
      // Attach to a random existing groupe, or create one if none exists
      $groupe = Groupe::inRandomOrder()->first() ?? Groupe::factory()->create();
      // Assuming many-to-many relationship
      $formateur->groupes()->attach($groupe->id);
    });
  }
}
