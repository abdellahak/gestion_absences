<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Filiere;

class FiliereSeeder extends Seeder
{
  public function run(): void
  {
    $filieres = [
      'Développement Informatique',
      'Réseaux Informatiques',
      'Gestion des Entreprises',
      'Techniques de Vente',
      'Comptabilité',
      'Maintenance Automobile',
      'Électromécanique',
      'Gestion Hôtelière',
      'Cuisine',
      'Boulangerie-Pâtisserie',
      'Infographie',
      'Secrétariat de Direction',
      'Gestion des Ressources Humaines',
      'Marketing Digital',
      'Froid et Climatisation',
      'Électricité de Bâtiment',
      'Mécanique Industrielle',
      'Logistique',
      'Topographie',
      'Gestion de Production',
    ];
    foreach ($filieres as $filiere) {
      Filiere::create([
        'intitule' => $filiere,
      ]);
    }
  }
}
