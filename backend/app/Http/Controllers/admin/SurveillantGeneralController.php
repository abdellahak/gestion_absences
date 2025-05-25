<?php

namespace App\Http\Controllers\admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\SurveillantGeneral;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class SurveillantGeneralController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $surveillants = SurveillantGeneral::with(['user'])->get();
        return response()->json($surveillants, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $data = $request->validate(
            [
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'email' => 'nullable|email|unique:users,email',
                'identifiant' => 'required|string|unique:users,identifiant',
                'date_recrutement' => 'required|date',

            ],
            [
                'user_id.required' => 'L\'utilisateur est requis',
                'user_id.exists' => 'L\'utilisateur sélectionné est invalide',
                'date_recrutement.required' => 'La date de recrutement est requise',
                'date_recrutement.date' => 'La date de recrutement doit être une date valide',
                'identifiant.required' => 'L\'identifiant est requis',
                'identifiant.string' => 'L\'identifiant doit être une chaîne de caractères',
                'identifiant.unique' => 'L\'identifiant doit être unique',
                'nom.required' => 'Le nom est requis',
                'nom.string' => 'Le nom doit être une chaîne de caractères',
                'prenom.required' => 'Le prénom est requis',
                'prenom.string' => 'Le prénom doit être une chaîne de caractères',
                'email.email' => 'Veuillez entrer un email valide',
                'email.unique' => 'L\'email existe déjà',
            ]

        );

        $user = User::create([
            'nom' => $data['nom'],
            'prenom' => $data['prenom'],
            'identifiant' => $data['identifiant'],
            'email' => $data['email'] ?? null,
            'password' => Hash::make($data['identifiant']),
            'role' => 'surveillant',
        ]);

        SurveillantGeneral::create([
            'user_id' => $user->id,
            'date_recrutement' => $data['date_recrutement'],
        ]);




        return response()->json([
            'message' => 'Surveillant créé avec succès'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $surveillant = SurveillantGeneral::with(['user'])->find($id);
        if (!$surveillant) {
            return response()->json(['message' => 'Surveillant non trouvé'], 404);
        }
        return response()->json($surveillant, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $surveillant = SurveillantGeneral::find($id);
        if (!$surveillant) {
            return response()->json(['message' => 'Surveillant non trouvé'], 404);
        }

        $data = $request->validate(
            [
                'user_id' => 'required|exists:users,id',
                'identifiant' => 'required|string|unique:users,identifiant,' . $surveillant->user_id,
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'email' => 'nullable|email|unique:users,email,' . $surveillant->user_id,
                'date_recrutement' => 'required|date',
            ],
            [

                'user_id.required' => 'L\'utilisateur est requis',
                'user_id.exists' => 'L\'utilisateur sélectionné est invalide',
                'date_recrutement.required' => 'La date de recrutement est requise',
                'date_recrutement.date' => 'La date de recrutement doit être une date valide',
                'identifiant.required' => 'L\'identifiant est requis',
                'identifiant.string' => 'L\'identifiant doit être une chaîne de caractères',
                'identifiant.unique' => 'L\'identifiant doit être unique',
                'nom.required' => 'Le nom est requis',
                'nom.string' => 'Le nom doit être une chaîne de caractères',
                'prenom.required' => 'Le prénom est requis',
                'prenom.string' => 'Le prénom doit être une chaîne de caractères',
                'email.email' => 'Veuillez entrer un email valide',
                'email.unique' => 'L\'email existe déjà',
                'email.string' => 'L\'email doit être une chaîne de caractères',
                'email.max' => 'L\'email ne doit pas dépasser 255 caractères',
            ]
        );
        if ($surveillant->user->identifiant == $data['identifiant'] && $surveillant->user->email == $data['email'] && $surveillant->date_recrutement == $data['date_recrutement'] && $surveillant->user->nom == $data['nom'] && $surveillant->user->prenom == $data['prenom']) {
            return response()->json(['error' => 'Aucune modification apportée'], 400);
        }

        $surveillant->update([
            'user_id' => $data['user_id'],
            'date_recrutement' => $data['date_recrutement'],
        ]);
        $surveillant->user->update([
            'identifiant' => $data['identifiant'],
            'nom' => $data['nom'],
            'prenom' => $data['prenom'],
            'email' => $data['email'] ?? null,
        ]);

        return response()->json(['message' => 'Surveillant mis à jour avec succès'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $surveillant = SurveillantGeneral::find($id);
        if (!$surveillant) {
            return response()->json(['message' => 'Surveillant non trouvé'], 404);
        }

        $surveillant->delete();
        return response()->json(['message' => 'Surveillant supprimé avec succès'], 200);
    }
}
