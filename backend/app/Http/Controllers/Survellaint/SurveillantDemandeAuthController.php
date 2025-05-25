<?php

namespace App\Http\Controllers\Survellaint;

use Illuminate\Http\Request;
use App\Models\DemandeAutorisation;
use App\Http\Controllers\Controller;

class SurveillantDemandeAuthController extends Controller
{
    public function index()
    {
        $demanderAuths = DemandeAutorisation::with('stagiaire.user', 'surveillantGeneral.user')->get();
        return response()->json($demanderAuths, 200);
    }

    

    public function update(Request $request, $id)
    {
        $demandeAuth = DemandeAutorisation::find($id);
        if (!$demandeAuth) {
            return response()->json(['error' => 'Demande d\'autorisation non trouvée'], 404);
        }

        $validated = $request->validate([
            'status' => 'required|string',
        ]);

        $demandeAuth->status = $validated['status'];
        $demandeAuth->save();

        return response()->json(['message' => 'Statut de la demande d\'autorisation mis à jour avec succès'], 200);
    }


}
