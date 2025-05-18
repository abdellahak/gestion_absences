<?php

namespace App\Http\Controllers;

use App\Models\Formateur;
use App\Models\Stagiaire;
use App\Models\SurveillantGeneral;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function getUser()
    {
        $user = Auth::user();
        $userData = [
            'id' => $user->id,
            'nom' => $user->nom,
            'prenom' => $user->prenom,
            'identifiant' => $user->identifiant,
            'email' => $user->email,
        ];
        if ($user->role === 'stagiaire') {
            $stagiaire = Stagiaire::where('user_id', $user->id)->first();
            if ($stagiaire) {
                $userData['adresse'] = $stagiaire->adresse;
                $userData['telephone'] = $stagiaire->telephone;
                $userData['sexe'] = $stagiaire->sexe;
                $userData['date_naissance'] = $stagiaire->date_naissance;
                $userData['lieu_naissance'] = $stagiaire->lieu_naissance;
                $userData['CNI'] = $stagiaire->CNI;
                $userData['groupe_id'] = $stagiaire->groupe_id;
                $userData['numero_inscription'] = $stagiaire->numero_inscription;
            }
        }
        if ($user->role === 'formateur') {
            $formateur = Formateur::where('user_id', $user->id)->first();
            if ($formateur) {
                $userData['date_recrutement'] = $formateur->date_recrutement;
                $userData['groupes'] = $formateur->groupes()->get();
                $userData['groupes'] = $formateur->groupes()->get()->map(function ($groupe) {
                    return [
                        'id' => $groupe->id,
                        'nom' => $groupe->nom,
                        'date_debut' => $groupe->date_debut,
                        'date_fin' => $groupe->date_fin,
                    ];
                });
            }
        }
        if ($user->role === 'surveillant') {
            $surveillantGeneral = SurveillantGeneral::where('user_id', $user->id)->first();
            if ($surveillantGeneral) {
                $userData['date_recrutement'] = $surveillantGeneral->date_recrutement;
            }
        }
        return response()->json($userData, 200);
    }







    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $modified = false;

        if ($request->has('email') && $request->email !== $user->email) {
            $modified = true;
        }

        $userData = $request->validate([
            'email' => 'nullable|email|unique:users,email,' . $user->id,
        ], [
            'email.unique' => 'L\'email est déjà utilisé par un autre utilisateur.',
            'email.email' => 'L\'email doit être une adresse email valide.',
        ]);

        if ($user->role === "stagiaire") {
            $stagiaire = Stagiaire::where('user_id', $user->id)->first();

            if ($stagiaire) {
                if (($request->has('telephone') && $request->telephone !== $stagiaire->telephone) ||
                    ($request->has('adresse') && $request->adresse !== $stagiaire->adresse) ||
                    ($request->has('sexe') && $request->sexe !== $stagiaire->sexe) ||
                    ($request->has('date_naissance') && $request->date_naissance !== $stagiaire->date_naissance) ||
                    ($request->has('lieu_naissance') && $request->lieu_naissance !== $stagiaire->lieu_naissance)
                ) {
                    $modified = true;
                }
            }

            $stagiaireData = $request->validate([
                'telephone' => 'nullable|string|unique:stagiaires,telephone,' . $user->id . ',user_id',
                'adresse' => 'nullable|string',
                'sexe' => 'nullable|in:Homme,Femme',
                'date_naissance' => 'nullable|date',
                'lieu_naissance' => 'nullable|string',
            ], [
                'telephone.unique' => 'Le numéro de téléphone est déjà utilisé par un autre stagiaire.',
                'telephone.string' => 'Le numéro de téléphone doit être une chaîne de caractères.',
                'adresse.string' => 'L\'adresse doit être une chaîne de caractères.',
                'sexe.in' => 'Le sexe doit être soit "Homme" soit "Femme".',
                'date_naissance.date' => 'La date de naissance doit être une date valide.',
                'lieu_naissance.string' => 'Le lieu de naissance doit être une chaîne de caractères.',
                'CNI.unique' => 'La carte d\'identité nationale est déjà utilisée par un autre stagiaire.',
                'CNI.string' => 'La carte d\'identité nationale doit être une chaîne de caractères.',
            ]);
        }

        if (!$modified) {
            return response()->json(['error' => 'Aucune modification apportée'], 400);
        }

        $targetUser = User::find($user->id);
        if (!empty($userData)) {
            $targetUser->update($userData);
        }

        if ($user->role === "stagiaire" && !empty($stagiaireData)) {
            $stagiaire = Stagiaire::where('user_id', $user->id)->first();
            if ($stagiaire) {
                $stagiaire->update($stagiaireData);
            }
        }

        return response()->json([
            'message' => 'Profile mis à jour avec succès.',
        ], 200);
    }
}
