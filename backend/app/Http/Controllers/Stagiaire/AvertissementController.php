<?php

namespace App\Http\Controllers\Stagiaire;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Avertissement;

class AvertissementController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $stagiaire = $user->stagiaire;
        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }
        $avertissements = $stagiaire->avertissements()->orderByDesc('created_at')->get();
        return response()->json($avertissements, 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'stagiaire_id' => 'required|exists:stagiaires,id',
            'description' => 'required|string|max:255',
        ]);
        $avertissement = Avertissement::create($data);
        return response()->json(['message' => 'Avertissement ajouté', 'avertissement' => $avertissement], 201);
    }
}