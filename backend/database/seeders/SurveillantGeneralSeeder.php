<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SurveillantGeneral;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SurveillantGeneralSeeder extends Seeder
{
  public function run(): void
  {
    $user = User::factory()->create([
      'role' => 'surveillant',
      'identifiant' => fake()->unique()->numerify('surveillant'),
      'password' => Hash::make('surveillant'),
    ]);
    SurveillantGeneral::factory()->create([
      'user_id' => $user->id,
    ]);
    SurveillantGeneral::factory(5)->create();
  }
}
