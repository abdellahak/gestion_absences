<?php

namespace App\Http\Controllers\admin;

use App\Models\User;
use App\Models\Formateur;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class FormateurController extends Controller
{
    public function index()
    {
        $formateurs = Formateur::with(['user'])->get();
        return response()->json($formateurs, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'identifiant' => 'required|string|unique:users,identifiant',
            'email' => 'required|email|unique:users,email',
            'date_recrutement' => 'required|date',

        ],[
            'nom.required' => 'Le nom est requis',
            'prenom.required' => 'Le prénom est requis',
            'identifiant.required' => 'L\'identifiant est requis',
            'identifiant.unique' => 'L\'identifiant doit être unique',
            'email.email' => 'Veuillez entrer un email valide',
            'email.unique' => 'L\'email existe déjà',
            'date_recrutement.required' => 'La date de recrutement est requise',
            'date_recrutement.date' => 'La date de recrutement doit être une date valide',
        ]
    );

        $user = User::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'identifiant' => $validated['identifiant'],
            'email' => $validated['email'] ?? null,
            'date_recrutement' => $validated['date_recrutement'],
            'password' => Hash::make($validated['identifiant']),
            'role' => 'formateur',
        ]);

        $formateur = Formateur::create([
            'user_id' => $user->id,
            'date_recrutement' => $validated['date_recrutement'],
            
        ]);

        return response()->json([
            'message' => 'Stagiaire créé avec succès',
            
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $formateur = Formateur::with('user')->find($id);
        if (!$formateur) {
            return response()->json(['message' => 'Formateur non trouvé'], 404);
        }
        return response()->json($formateur, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $formateur = Formateur::find($id);
        if (!$formateur) {
            return response()->json(['message' => 'Formateur non trouvé'], 404);
        }

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'identifiant' => 'required|string|unique:users,identifiant,' . $formateur->user_id,
            'email' => 'nullable|email|unique:users,email,' . $formateur->user_id,
            'date_recrutement' => 'required|date',
        ]);

        $user = User::find($formateur->user_id);
        $user->update([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'identifiant' => $validated['identifiant'],
            'email' => $validated['email'] ?? null,
            'date_recrutement' => $validated['date_recrutement'],
        ]);

        return response()->json(['message' => 'Formateur mis à jour avec succès'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $formateur = Formateur::find($id);
        if (!$formateur) {
            return response()->json(['message' => 'Formateur non trouvé'], 404);
        }

        $user = User::find($formateur->user_id);
        $user->delete();
        $formateur->delete();

        return response()->json(['message' => 'Formateur supprimé avec succès'], 200);
    } 
}
