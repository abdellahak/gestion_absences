<?php

namespace App\Imports;

use App\Models\User;
use App\Models\Groupe;
use App\Models\Stagiaire;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Illuminate\Validation\Rule;

class StagiairesImport implements ToCollection, WithHeadingRow, WithValidation
{
  protected $errors = [];
  public function collection(Collection $collection)
  {
    foreach ($collection as $row) {
      try {

        $groupe = Groupe::where('code', $row['code_groupe'])->whereRaw('LENGTH(code) <= 10')->first();

        if (!$groupe) {
          $availableCodes = Groupe::whereRaw('LENGTH(code) <= 10')->pluck('code')->toArray();
          $this->errors[] = "Ligne " . ($collection->search($row) + 2) . ": Groupe avec le code '{$row['code_groupe']}' n'existe pas. Codes disponibles (max 10 caractères): " . implode(', ', $availableCodes);
          continue;
        }

        // Check if numero_inscription already exists
        if (Stagiaire::where('numero_inscription', $row['numero_inscription'])->exists()) {
          $this->errors[] = "Ligne " . ($collection->search($row) + 2) . ": Le numéro d'inscription '{$row['numero_inscription']}' existe déjà";
          continue;
        }

        // Check if email already exists (if provided)
        if (!empty($row['email']) && User::where('email', $row['email'])->exists()) {
          $this->errors[] = "Ligne " . ($collection->search($row) + 2) . ": L'email '{$row['email']}' existe déjà";
          continue;
        }

        // Check if telephone already exists (if provided)
        if (!empty($row['telephone']) && Stagiaire::where('telephone', $row['telephone'])->exists()) {
          $this->errors[] = "Ligne " . ($collection->search($row) + 2) . ": Le téléphone '{$row['telephone']}' existe déjà";
          continue;
        }

        // Check if CIN already exists (if provided)
        if (!empty($row['cin']) && Stagiaire::where('CIN', $row['cin'])->exists()) {
          $this->errors[] = "Ligne " . ($collection->search($row) + 2) . ": Le CIN '{$row['cin']}' existe déjà";
          continue;
        }

        // Create user
        $user = User::create([
          'nom' => $row['nom'],
          'prenom' => $row['prenom'],
          'identifiant' => $row['numero_inscription'],
          'email' => $row['email'] ?? null,
          'password' => Hash::make($row['numero_inscription']),
          'role' => 'stagiaire',
        ]);

        // Create stagiaire
        Stagiaire::create([
          'user_id' => $user->id,
          'groupe_id' => $groupe->id,
          'numero_inscription' => $row['numero_inscription'],
          'adresse' => $row['adresse'] ?? null,
          'telephone' => $row['telephone'] ?? null,
          'CIN' => $row['cin'] ?? null,
          'sexe' => $row['sexe'] ?? null,
          'date_naissance' => !empty($row['date_naissance']) ? date('Y-m-d', strtotime($row['date_naissance'])) : null,
          'lieu_naissance' => $row['lieu_naissance'] ?? null,
        ]);
      } catch (\Exception $e) {
        $this->errors[] = "Ligne " . ($collection->search($row) + 2) . ": " . $e->getMessage();
      }
    }
  }

  public function rules(): array
  {
    return [
      'nom' => 'required|string|max:255',
      'prenom' => 'required|string|max:255',
      'numero_inscription' => 'required|string|max:255',
      'code_groupe' => 'required|string|max:10',
      'email' => 'nullable|email|max:255',
      'telephone' => 'nullable|string|max:20',
      'cin' => 'nullable|string|max:20',
      'sexe' => 'nullable|in:Homme,Femme',
      'date_naissance' => 'nullable|date',
      'lieu_naissance' => 'nullable|string|max:255',
      'adresse' => 'nullable|string|max:500',
    ];
  }

  public function customValidationMessages()
  {
    return [
      'nom.required' => 'Le nom est requis',
      'prenom.required' => 'Le prénom est requis',
      'numero_inscription.required' => 'Le numéro d\'inscription est requis',
      'code_groupe.required' => 'Le code groupe est requis',
      'email.email' => 'L\'email doit être valide',
      'sexe.in' => 'Le sexe doit être Homme ou Femme',
      'date_naissance.date' => 'La date de naissance doit être une date valide',
    ];
  }

  public function getErrors()
  {
    return $this->errors;
  }
}
