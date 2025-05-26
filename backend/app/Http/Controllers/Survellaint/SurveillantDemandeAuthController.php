<?php

namespace App\Http\Controllers\Survellaint;

use Illuminate\Http\Request;
use App\Models\DemandeAutorisation;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
    public function download($id)
    {
        $demandeAuth = DemandeAutorisation::find($id);
        if (!$demandeAuth) {
            return response()->json(['error' => 'La demande d\'autorisation n\'existe pas'], 404);
        }
        $filePath = $demandeAuth->document;
        if (!$filePath || !Storage::disk('public')->exists($filePath)) {
            return response()->json(['error' => 'Le fichier n\'existe pas'], 404);
        }
        return response()->download(storage_path('app/public/' . $filePath), basename($filePath));
    }


}
