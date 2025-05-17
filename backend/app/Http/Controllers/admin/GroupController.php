<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Groupe;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groupes = Groupe::with('filiere')->get();
        return response()->json($groupes, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $groupe = $request->validate([
            'intitule' => 'required|string|max:255',
            'code' => 'required|string|unique:groupes,code|max:10',
            'filiere_id' => 'required|exists:filieres,id',
        ], [
            'intitule.required' => 'L\'intitulé est requis',
            'intitule.string' => 'L\'intitulé doit être une chaîne de caractères',
            'intitule.max' => 'L\'intitulé ne doit pas dépasser 255 caractères',
            'code.required' => 'Le code est requis',
            'code.string' => 'Le code doit être une chaîne de caractères',
            'code.unique' => 'Le code doit être unique',
            'code.max' => 'Le code ne doit pas dépasser 50 caractères',
            'filiere_id.required' => 'La filière est requise',
            'filiere_id.exists' => 'La filière sélectionnée est invalide',
        ]);

        Groupe::create($groupe);

        return response()->json(['message' => 'Groupe créé avec succès'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $groupe = Groupe::find($id);
        if (!$groupe) {
            return response()->json(['message' => 'Groupe non trouvé'], 404);
        }
        return response()->json($groupe, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $groupe = Groupe::find($id);
        if (!$groupe) {
            return response()->json(['message' => 'Groupe non trouvé'], 404);
        }

        $data = $request->validate([
            'intitule' => 'required|string|max:255',
            'code' => "required|string|max:50|unique:groupes,code,$id",
            'filiere_id' => 'required|exists:filieres,id',
        ], [
            'intitule.required' => 'L\'intitulé est requis',
            'intitule.string' => 'L\'intitulé doit être une chaîne de caractères',
            'intitule.max' => 'L\'intitulé ne doit pas dépasser 255 caractères',
            'code.required' => 'Le code est requis',
            'code.string' => 'Le code doit être une chaîne de caractères',
            'code.unique' => 'Le code doit être unique',
            'code.max' => 'Le code ne doit pas dépasser 50 caractères',
            'filiere_id.required' => 'La filière est requise',
            'filiere_id.exists' => 'La filière sélectionnée est invalide',
        ]);

        $groupe->update($data);

        return response()->json(['message' => 'Groupe mis à jour avec succès'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $groupe = Groupe::find($id);
        if (!$groupe) {
            return response()->json(['message' => 'Groupe non trouvé'], 404);
        }
        $groupe->delete();
        return response()->json(['message' => 'Groupe supprimé avec succès'], 200);
    }
}
