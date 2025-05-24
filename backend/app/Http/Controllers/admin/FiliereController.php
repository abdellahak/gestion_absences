<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Filiere;
use Illuminate\Http\Request;

class FiliereController extends Controller
{
    public function index()
    {
        $data = Filiere::all();
        return response()->json($data, 200);
    }

    public function show($id)
    {
        $filiere = Filiere::find($id);
        if (!$filiere) {
            return response()->json(['message' => 'Filiere non trouvée'], 404);
        }
        return response()->json($filiere, 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'code' => "required|string|unique:filieres,code|max:10",
            'intitule' => 'required|string|max:255|unique:filieres,intitule',
        ],
        [
            'code.required' => 'Le code est requis',
            'code.string' => 'Le code doit être une chaîne de caractères',
            'code.unique' => 'Cet code est déjà utilisé',
            'code.max' => 'Le code ne doit pas dépasser 10 caractères',
            'intitule.required' => 'L\'intitulé est requis',
            'intitule.unique' => 'Cet intitulé est déjà enregistré',
            'intitule.string' => 'L\'intitulé doit être une chaîne de caractères',
            'intitule.max' => 'L\'intitulé ne doit pas dépasser 255 caractères',
        ]);

        Filiere::create([
            'code' => strtoupper($data['code']),
            'intitule' => $data['intitule'],
        ]);

        return response()->json(['message' => 'Filiere créée avec succès'], 201);
    }

    public function update(Request $request, $id)
    {
        $filiere = Filiere::find($id);
        if (!$filiere) {
            return response()->json(['message' => 'Filiere non trouvée'], 404);
        }

        $data = $request->validate([
            'code' => "required|string|max:10|unique:filieres,code,$id",
            'intitule' => 'required|string|max:255|unique:filieres,intitule,' . $id,
        ],
        [
            'code.required' => 'Le code est requis',
            'code.string' => 'Le code doit être une chaîne de caractères',
            'code.unique' => 'Cet code est déjà utilisé',
            'code.max' => 'Le code ne doit pas dépasser 10 caractères',
            'intitule.required' => 'L\'intitulé est requis',
            'intitule.unique' => 'Cet intitulé est déjà enregistré',
            'intitule.string' => 'L\'intitulé doit être une chaîne de caractères',
            'intitule.max' => 'L\'intitulé ne doit pas dépasser 255 caractères',
        ]);

        if($data['code'] == $filiere->code && $data['intitule'] == $filiere->intitule) {
            return response()->json(['error' => 'Aucune modification apportée'], 400);
        }

        $filiere->update([
            'code' => $data['code'],
            'intitule' => $data['intitule'],
        ]);

        return response()->json(['message' => 'Filiere mise à jour avec succès'], 200);
    }

    public function destroy($id)
    {
        $filiere = Filiere::find($id);
        if (!$filiere) {
            return response()->json(['message' => 'Filiere non trouvée'], 404);
        }
        $filiere->delete();
        return response()->json(['message' => 'Filiere supprimée avec succès'], 200);
    }
}
