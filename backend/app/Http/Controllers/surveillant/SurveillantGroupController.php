<?php

namespace App\Http\Controllers\surveillant;

use App\Models\Groupe;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SurveillantGroupController extends Controller
{
    public function index()
    {
        $surveillantGroups = Groupe::with('filiere')->get(); // Logic to get all surveillant groups
        return response()->json($surveillantGroups, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
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

        $groupe = Groupe::create($validated);

        return response()->json(['message' => 'Surveillant group created successfully', 'data' => $groupe], 201);
    }

    public function show($id)
    {
        $surveillantGroup = Groupe::with('filiere')->find($id); // Logic to get a specific surveillant group
        if (!$surveillantGroup) {
            return response()->json(['message' => 'Surveillant group not found'], 404);
        }
        return response()->json($surveillantGroup, 200);
    }

    public function update(Request $request, $id)
    {
        $groupe = Groupe::find($id);
        if (!$groupe) {
            return response()->json(['message' => 'Surveillant group not found'], 404);
        }
        $validated = $request->validate([
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
        if($validated['code'] == $groupe->code && $validated['intitule'] == $groupe->intitule && $validated['filiere_id'] == $groupe->filiere_id){
            return response()->json(['error' => 'Aucune modification apportée'], 400);
        }

       

        $groupe->update($validated);

        return response()->json(['message' => 'Surveillant group updated successfully', 'data' => $groupe], 200);
    }

 
}
