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
        
        $data = $request->validate([
          
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'nullable|email|unique:users,email',
            'date_recrutement' => 'required|date',
            
        ],[
           
            'date_recrutement.required' => 'La date de recrutement est requise',
            'date_recrutement.date' => 'La date de recrutement doit être une date valide',
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

           $surveillant = Surveillantgeneral::create([
            'user_id' => $user->id,
          
            'date_recrutement' => $data['date_recrutement'],
        
        ]);

       
        $surveillant = SurveillantGeneral::create($data);

  return response()->json([
            'message' => 'Surveillant créé avec succès',
            'surveillant' => [
                'id' => $surveillant->id,
                'user_id' => $user->id,
                'date_recrutement' => $surveillant->date_recrutement,
                'nom' => $user->nom,
                'prenom' => $user->prenom,
                'email' => $user->email,
            ]
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

        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'date_recrutement' => 'required|date',
        ],[
            'user_id.required' => 'L\'utilisateur est requis',
            'user_id.exists' => 'L\'utilisateur sélectionné est invalide',
            'date_recrutement.required' => 'La date de recrutement est requise',
            'date_recrutement.date' => 'La date de recrutement doit être une date valide',
        ]
    );

        $surveillant->update($data);
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
