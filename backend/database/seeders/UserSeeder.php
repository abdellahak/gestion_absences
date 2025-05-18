<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nom' => 'mohamed',
            'prenom' => 'ali',
            'identifiant' => 'admin',
            'email' => 'admin@mail.com',
            'password' => Hash::make('admin'),
            'role' => 'admin',
        ]);
        User::create([
            'nom' => 'mohamed',
            'prenom' => 'stagiaire',
            'identifiant' => 'stagiaire',
            'email' => 'stagiaire@mail.com',
            'password' => Hash::make('stagiaire'),
            'role' => 'stagiaire',
        ]);
        User::factory(5)->create([
            'role' => 'admin',
        ]);
        User::factory(5)->create([
            'role' => 'stagiaire',
        ]);
        User::factory(5)->create([
            'role' => 'admin',
        ]);
    }
}
