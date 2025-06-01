<?php

namespace App\Http\Controllers\Survellaint;

use Illuminate\Http\Request;
use App\Models\DemandeAutorisation;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SurveillantDemandeAuthController extends Controller
{
    public function index(Request $request)
    {
        $query = DemandeAutorisation::with('stagiaire.user', 'stagiaire.groupe', 'surveillantGeneral.user');

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('date', 'like', "%{$searchTerm}%")
                  ->orWhere('objet', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%")
                  ->orWhereHas('stagiaire.user', function ($userQuery) use ($searchTerm) {
                      $userQuery->where('nom', 'like', "%{$searchTerm}%")
                               ->orWhere('prenom', 'like', "%{$searchTerm}%");
                  });
            });
        }

        // Group filtering
        if ($request->has('groupe_id') && !empty($request->groupe_id)) {
            $query->whereHas('stagiaire', function ($q) use ($request) {
                $q->where('groupe_id', $request->groupe_id);
            });
        }

        // Status filtering
        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        // Pagination
        $perPage = $request->get('per_page', 10);
        $demanderAuths = $query->orderBy('created_at', 'desc')->paginate($perPage);
        
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
