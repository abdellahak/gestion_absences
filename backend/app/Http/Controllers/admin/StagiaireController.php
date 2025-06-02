<?php

namespace App\Http\Controllers\admin;

use App\Models\User;
use App\Models\Stagiaire;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class StagiaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->get('search');

        $query = Stagiaire::with(['user', 'groupe']);

        // Add search functionality
        if ($search) {
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('nom', 'like', "%{$search}%")
                    ->orWhere('prenom', 'like', "%{$search}%");
            })->orWhere('numero_inscription', 'like', "%{$search}%");
        }

        // Filter by groupe if specified
        if ($request->has('groupe_id') && $request->groupe_id) {
            $query->where('groupe_id', $request->groupe_id);
        }

        $stagiaires = $query->paginate($perPage);
        return response()->json($stagiaires, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'groupe_id' => 'required|exists:groupes,id',
                'numero_inscription' => 'required|string|unique:stagiaires,numero_inscription',
                'email' => 'nullable|email|unique:users,email',
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
            ]
        );

        $user = User::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'identifiant' => $validated['numero_inscription'],
            'email' => $validated['email'] ?? null,
            'password' => Hash::make($validated['numero_inscription']),
            'role' => 'stagiaire',
        ]);

        $stagiaire = Stagiaire::create([
            'user_id' => $user->id,
            'groupe_id' => $validated['groupe_id'],
            'numero_inscription' => $validated['numero_inscription'],
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

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $stagiaire = Stagiaire::with('user')->find($id);
        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }

        $data = $request->validate([
            'groupe_id' => 'required|exists:groupes,id',
            'numero_inscription' => "required|string|unique:stagiaires,numero_inscription,$id",
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $stagiaire->user_id,
        ], [
            'groupe_id.required' => 'Le groupe est requis',
            'groupe_id.exists' => 'Le groupe sélectionné est invalide',
            'numero_inscription.required' => 'Le numéro d\'inscription est requis',
            'numero_inscription.unique' => 'Le numéro d\'inscription doit être unique',
            'nom.required' => 'Le nom est requis',
            'prenom.required' => 'Le prénom est requis',
            'email.email' => 'Veuillez entrer un email valide',
            'email.unique' => 'L\'email existe déjà',
        ]);

        if (
            $data['groupe_id'] == $stagiaire->groupe_id && $data['numero_inscription'] == $stagiaire->numero_inscription &&
            $data['nom'] == $stagiaire->user->nom && $data['prenom'] == $stagiaire->user->prenom &&
            ($data['email'] ?? $stagiaire->user->email) == $stagiaire->user->email
        ) {
            return response()->json(['error' => 'Aucune modification apportée'], 400);
        }

        // Mettre à jour le stagiaire
        $stagiaire->update([
            'groupe_id' => $data['groupe_id'],
            'numero_inscription' => $data['numero_inscription'],
        ]);

        // Mettre à jour le user lié
        $stagiaire->user->update([
            'nom' => $data['nom'],
            'prenom' => $data['prenom'],
            'email' => $data['email'] ?? $stagiaire->user->email,
        ]);

        return response()->json([
            'message' => 'Stagiaire mis à jour avec succès',
            'stagiaire' => [
                'id' => $stagiaire->id,
                'user_id' => $stagiaire->user_id,
                'groupe_id' => $stagiaire->groupe_id,
                'numero_inscription' => $stagiaire->numero_inscription,
                'nom' => $stagiaire->user->nom,
                'prenom' => $stagiaire->user->prenom,
                'email' => $stagiaire->user->email,
            ]
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $stagiaire = Stagiaire::find($id);
        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }
        $stagiaire->delete();
        return response()->json(['message' => 'Stagiaire supprimé avec succès'], 200);
    }
}
