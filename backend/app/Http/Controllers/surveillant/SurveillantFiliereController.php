<?php

namespace App\Http\Controllers\surveillant;

use App\Models\Filiere;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SurveillantFiliereController extends Controller
{
    public function index()
    {
        $surveillantFilieres = Filiere::all(); // Logic to get all surveillant filieres
        return response()->json($surveillantFilieres, 200);
      
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'intitule' => 'required|string|max:255',
            'code' => 'required|string|unique:filieres,code|max:10',
        ], [
            'intitule.required' => 'L\'intitulé est requis',
            'intitule.string' => 'L\'intitulé doit être une chaîne de caractères',
            'intitule.max' => 'L\'intitulé ne doit pas dépasser 255 caractères',
            'code.required' => 'Le code est requis',
            'code.string' => 'Le code doit être une chaîne de caractères',
            'code.unique' => 'Le code doit être unique',
            'code.max' => 'Le code ne doit pas dépasser 50 caractères',
        ]);

        $filiere = Filiere::create($validated);

        return response()->json(['message' => 'Surveillant filiere created successfully', 'data' => $filiere], 201);
    }

    public function show($id)
    {
        $surveillantFiliere = Filiere::find($id); // Logic to get a specific surveillant filiere
        if (!$surveillantFiliere) {
            return response()->json(['message' => 'Surveillant filiere not found'], 404);
        }
        return response()->json($surveillantFiliere, 200);
    }

    public function update(Request $request, $id)
    {
        // Logic to update a specific surveillant filiere
        $filiere = Filiere::find($id);
        if (!$filiere) {
            return response()->json(['message' => 'Surveillant filiere not found'], 404);
        }
        $validated = $request->validate([
            'intitule' => 'required|string|max:255',
            'code' => "required|string|max:50|unique:filieres,code,$id",
        ], [
            'intitule.required' => 'L\'intitulé est requis',
            'intitule.string' => 'L\'intitulé doit être une chaîne de caractères',
            'intitule.max' => 'L\'intitulé ne doit pas dépasser 255 caractères',
            'code.required' => 'Le code est requis',
            'code.string' => 'Le code doit être une chaîne de caractères',
            'code.unique' => 'Le code doit être unique',
            'code.max' => 'Le code ne doit pas dépasser 50 caractères',
        ]);
        $filiere->update($validated);
        return response()->json(['message' => 'Surveillant filiere updated successfully', 'data' => $filiere], 200);
    }

    public function destroy($id)
    {
        // Logic to delete a specific surveillant filiere
        return response()->json(['message' => 'Surveillant filiere deleted successfully'], 200);
    }
}
