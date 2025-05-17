<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Filiere;

class FiliereSeeder extends Seeder
{
  public function run(): void
  {
    $filieres = [
      'TDD' => 'Développement Digital',
      'TRIN' => 'Réseaux Informatiques',
      'TGE ' => 'Gestion des Entreprises',
      'TTV' => 'Techniques de Vente',
      'TCP' => 'Comptabilité',
      'TMA' => 'Maintenance Automobile',
      'TEM' => 'Électromécanique',
      'TGH' => 'Gestion Hôtelière',
      'TCU' => 'Cuisine',
      'TBP' => 'Boulangerie-Pâtisserie',
      'TIN' => 'Infographie',
      'TSD' => 'Secrétariat de Direction',
      'TGRH' => 'Gestion des Ressources Humaines',
      'TMD' => 'Marketing Digital',
      'TFC' => 'Froid et Climatisation',
      'TEB' => 'Électricité de Bâtiment',
      'TMI' => 'Mécanique Industrielle',
      'TLG' => 'Logistique',
      'TTP' => 'Topographie',
      'TGP' => 'Gestion de Production',
    ];

    foreach ($filieres as $code => $intitule) {
      Filiere::create([
        'code' => $code,
        'intitule' => $intitule,
      ]);
    }
  }
}
