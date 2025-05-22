<?php

namespace App\Http\Controllers\surveillant;

use App\Models\User;
use App\Models\Stagiaire;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class SurveillantStagiaireController extends Controller
{
    public function index()
    {
        $stagiaires = Stagiaire::with(['user', 'groupe'])->get();
        return response()->json($stagiaires, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'groupe_id' => 'required|exists:groupes,id',
                'numero_inscription' => "required|string|max:50|unique:stagiaires,numero_inscription,",
                'email' => 'nullable|email|unique:users,email',
                'telephone' => 'nullable|string|max:15',
                'adresse' => 'nullable|string|max:255',
                'CIN' => 'nullable|string|max:20|unique:stagiaires,CIN',
                'sexe' => 'nullable|string|max:10',
                'date_naissance' => 'nullable|date',
                'lieu_naissance' => 'nullable|string|max:255',
            ],
            [
                'nom.required' => 'Le nom est requis',
                'prenom.required' => 'Le prénom est requis',
                'groupe_id.required' => 'Le groupe est requis',
                'groupe_id.exists' => 'Le groupe sélectionné est invalide',
                'numero_inscription.required' => 'Le numéro d\'inscription est requis',
                'numero_inscription.unique' => 'Le numéro d\'inscription doit être unique',
                'email.email' => 'Veuillez entrer un email valide',
                'email.unique' => 'L\'email existe déjà',
                'telephone.string' => 'Le téléphone doit être une chaîne de caractères',
                'telephone.max' => 'Le téléphone ne doit pas dépasser 15 caractères',
                'adresse.string' => 'L\'adresse doit être une chaîne de caractères',
                'adresse.max' => 'L\'adresse ne doit pas dépasser 255 caractères',
                'CIN.string' => 'La CIN doit être une chaîne de caractères',
                'CIN.max' => 'La CIN ne doit pas dépasser 20 caractères',
                'CIN.unique' => 'La CIN existe déjà',
                'sexe.string' => 'Le sexe doit être une chaîne de caractères',
                'sexe.max' => 'Le sexe ne doit pas dépasser 10 caractères',
                'date_naissance.date' => 'La date de naissance doit être une date valide',
                'lieu_naissance.string' => 'Le lieu de naissance doit être une chaîne de caractères',
                'lieu_naissance.max' => 'Le lieu de naissance ne doit pas dépasser 255 caractères',
            ]
        );

        $user = User::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'identifiant' => $validated['numero_inscription'],
            'email' => $validated['email'] ?? null,
            'password' => Hash::make($validated['numero_inscription']),

        ]);

        $stagiaire = Stagiaire::create([
            'user_id' => $user->id,
            'groupe_id' => $validated['groupe_id'],
            'numero_inscription' => $validated['numero_inscription'],
            'telephone' => $validated['telephone'] ?? null,
            'adresse' => $validated['adresse'] ?? null,
            'CIN' => $validated['CIN'] ?? null,
            'sexe' => $validated['sexe'] ?? null,
            'date_naissance' => $validated['date_naissance'] ?? null,
            'lieu_naissance' => $validated['lieu_naissance'] ?? null,

        ]);

        return response()->json([
            'message' => 'Stagiaire créé avec succès',

        ], 201);
    }

    public function show($id)
    {
        $stagiaire = Stagiaire::with('user')->findOrFail($id);
        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }
        return response()->json([
            'id' => $stagiaire->id,
            'user_id' => $stagiaire->user_id,
            'groupe_id' => $stagiaire->groupe_id,
            'numero_inscription' => $stagiaire->numero_inscription,
            'nom' => $stagiaire->user->nom,
            'prenom' => $stagiaire->user->prenom,
            'email' => $stagiaire->user->email,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $stagiaire = Stagiaire::find($id);
        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }

        $validated = $request->validate(
            [
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'groupe_id' => 'required|exists:groupes,id',
                'numero_inscription' => "required|string|max:50|unique:stagiaires,numero_inscription,$id",
                'email' => 'nullable|email|unique:users,email',
                'telephone' => 'nullable|string|max:15',
                'adresse' => 'nullable|string|max:255',
                'CIN' => "nullable|string|max:20|unique:stagiaires,CIN,$id",
                'sexe' => 'nullable|string|max:10',
                'date_naissance' => 'nullable|date|before:today',
                'lieu_naissance' => 'nullable|string|max:255',

            ],
            [
                'nom.required' => 'Le nom est requis',
                'prenom.required' => 'Le prénom est requis',
                'groupe_id.required' => 'Le groupe est requis',
                'groupe_id.exists' => 'Le groupe sélectionné est invalide',
                'numero_inscription.required' => 'Le numéro d\'inscription est requis',
                'numero_inscription.unique' => 'Le numéro d\'inscription doit être unique',
                'email.email' => 'Veuillez entrer un email valide',
                'email.unique' => 'L\'email existe déjà',
                'telephone.string' => 'Le téléphone doit être une chaîne de caractères',
                'telephone.max' => 'Le téléphone ne doit pas dépasser 15 caractères',
                'adresse.string' => 'L\'adresse doit être une chaîne de caractères',
                'adresse.max' => 'L\'adresse ne doit pas dépasser 255 caractères',
                'CIN.string' => 'La CIN doit être une chaîne de caractères',
                'CIN.max' => 'La CIN ne doit pas dépasser 20 caractères',
                'sexe.string' => 'Le sexe doit être une chaîne de caractères',
                'sexe.max' => 'Le sexe ne doit pas dépasser 10 caractères',
                'date_naissance.date' => 'La date de naissance doit être une date valide',
                'date_naissance.before' => 'La date de naissance doit être une date avant aujourd\'hui',
                'lieu_naissance.string' => 'Le lieu de naissance doit être une chaîne de caractères',
                'lieu_naissance.max' => 'Le lieu de naissance ne doit pas dépasser 255 caractères',

            ]
        );

        $user = User::find($stagiaire->user_id);
        if ($user) {
            $user->update([
                'nom' => $validated['nom'],
                'prenom' => $validated['prenom'],
                'identifiant' => $validated['numero_inscription'],
                'email' => $validated['email'] ?? null,
            ]);
        }

        $stagiaire->update([
            'groupe_id' => $validated['groupe_id'],
            'numero_inscription' => $validated['numero_inscription'],
            'telephone' => $validated['telephone'] ?? null,
            'adresse' => $validated['adresse'] ?? null,
            'CIN' => $validated['CIN'] ?? null,
            'sexe' => $validated['sexe'] ?? null,
            'date_naissance' => $validated['date_naissance'] ?? null,
            'lieu_naissance' => $validated['lieu_naissance'] ?? null,
        ]);

        return response()->json(['message' => 'Stagiaire mis à jour avec succès', 'data' => $stagiaire], 200);
    }

    public function destroy($id)
    {
        $stagiaire = Stagiaire::find($id);
        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }

        $user = User::find($stagiaire->user_id);
        if ($user) {
            $user->delete();
        }

        $stagiaire->delete();

        return response()->json(['message' => 'Stagiaire supprimé avec succès'], 200);
    }
}
