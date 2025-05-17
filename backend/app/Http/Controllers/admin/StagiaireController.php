<?php

namespace App\Http\Controllers\admin;

use App\Models\User;
use App\Models\Stagiaire;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StagiaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stagiaires = Stagiaire::with(['user', 'groupe'])->get();
        return response()->json($stagiaires, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $stagiaire = $request->validate([
            'user_id' => 'required|exists:users,id',
            'groupe_id' => 'required|exists:groupes,id',
            'numero_inscription' => 'required|string|unique:stagiaires,numero_inscription',
                
        ], [
            'user_id.required' => 'L\'utilisateur est requis',
            'user_id.exists' => 'L\'utilisateur sélectionné est invalide',
            'groupe_id.required' => 'Le groupe est requis',
            'groupe_id.exists' => 'Le groupe sélectionné est invalide',
            'numero_inscription.required' => 'Le numéro d\'inscription est requis',
            'numero_inscription.unique' => 'Le numéro d\'inscription doit être unique',
        ]);

        Stagiaire::create($stagiaire);

        return response()->json(['message' => 'Stagiaire créé avec succès'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $stagiaire = Stagiaire::find($id);
        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }
        return response()->json($stagiaire, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $stagiaire = Stagiaire::find($id);
        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }

        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'groupe_id' => 'required|exists:groupes,id',
            'numero_inscription' => "required|string|unique:stagiaires,numero_inscription,$id",
        ]
        , [
                'user_id.required' => 'L\'utilisateur est requis',
                'user_id.exists' => 'L\'utilisateur sélectionné est invalide',
                'groupe_id.required' => 'Le groupe est requis',
                'groupe_id.exists' => 'Le groupe sélectionné est invalide',
                'numero_inscription.required' => 'Le numéro d\'inscription est requis',
                'numero_inscription.unique' => 'Le numéro d\'inscription doit être unique',
            ]);


        $stagiaire->update($data);

        return response()->json(['message' => 'Stagiaire mis à jour avec succès'], 200);
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
