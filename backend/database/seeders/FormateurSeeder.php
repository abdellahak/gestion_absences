<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Formateur;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class FormateurSeeder extends Seeder
{
  public function run(): void
  {
    $user = User::factory()->create([
      'role' => 'formateur',
      'identifiant' => 'formateur',
      'password' => Hash::make('formateur'),
    ]);
    Formateur::factory()->create([
      'user_id' => $user->id,
    ]);
    Formateur::factory(5)->create();
  }
}
