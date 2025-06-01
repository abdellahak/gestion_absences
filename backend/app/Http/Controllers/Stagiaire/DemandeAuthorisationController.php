<?php

namespace App\Http\Controllers\Stagiaire;

use Illuminate\Http\Request;
use App\Models\DemandeAutorisation;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DemandeAuthorisationController extends Controller
{
    // Liste des demandes du stagiaire connecté
    public function index()
    {
        $user = Auth::user();
        $stagiaire = $user->stagiaire;
        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }
        $demandes = DemandeAutorisation::where('stagiaire_id', $stagiaire->id)
            ->orderByDesc('created_at')
            ->get();

        $demandes->transform(function ($demande) {
            $demande->heure_debut = date('H:i', strtotime($demande->heure_debut));
            $demande->heure_fin = date('H:i', strtotime($demande->heure_fin));
            return $demande;
        });

        return response()->json($demandes, 200);
    }

    // Ajouter une nouvelle demande
    public function store(Request $request)
    {
        $user = Auth::user();
        $stagiaire = $user->stagiaire;
        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }

        $data = $request->validate([
            'intitule' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'document' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'date' => 'required|date',
            'heure_debut' => 'required',
            'heure_fin' => 'required',
        ], [
            'intitule.required' => "L'intitulé est requis",
            'description.required' => "La description est requise",
            'date.required' => "La date est requise",
            'heure_debut.required' => "L'heure de début est requise",
            'heure_fin.required' => "L'heure de fin est requise",
        ]);
        $documentPath = null;
        if ($request->hasFile('document')) {
            $documentPath = $request->file('document')->store('documents', 'public');
        }

        $demande = DemandeAutorisation::create([
            'stagiaire_id' => $stagiaire->id,
            'intitule' => $data['intitule'],
            'description' => $data['description'],
            'document' => $documentPath,
            'date' => $data['date'],
            'heure_debut' => $data['heure_debut'],
            'heure_fin' => $data['heure_fin'],
            'status' => 'en_attente',
        ]);

        return response()->json(['message' => 'Demande ajoutée avec succès', 'demande' => $demande], 201);
    }

    // Modifier une demande (seulement si en_attente)
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $stagiaire = $user->stagiaire;
        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }

        $demande = DemandeAutorisation::where('stagiaire_id', $stagiaire->id)->find($id);
        if (!$demande) {
            return response()->json(['message' => 'Demande non trouvée'], 404);
        }
        if ($demande->status !== 'en_attente') {
            return response()->json(['message' => 'Modification non autorisée'], 403);
        }

        $data = $request->validate([
            'intitule' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'document' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'date' => 'required|date',
            'heure_debut' => 'required',
            'heure_fin' => 'required',
        ], [
            'intitule.required' => "L'intitulé est requis",
            'description.required' => "La description est requise",
            'date.required' => "La date est requise",
            'heure_debut.required' => "L'heure de début est requise",
            'heure_fin.required' => "L'heure de fin est requise",
        ]);

        if ($request->hasFile('document')) {
            $documentPath = $request->file('document')->store('documents', 'public');
            $data['document'] = $documentPath;
        }
        $demande->update($data);

        $result = $demande->toArray();
        $result['document'] = $demande->document ? basename($demande->document) : null;

        return response()->json([
            'message' => 'Demande modifiée avec succès',
            'demande' => $result,
        ], 200);
    }

    // Supprimer une demande (seulement si en_attente)
    public function destroy($id)
    {
        $user = Auth::user();
        $stagiaire = $user->stagiaire;
        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }

        $demande = DemandeAutorisation::where('stagiaire_id', $stagiaire->id)->find($id);
        if (!$demande) {
            return response()->json(['message' => 'Demande non trouvée'], 404);
        }
        if ($demande->status !== 'en_attente') {
            return response()->json(['message' => 'Suppression non autorisée'], 403);
        }

        $demande->delete();
        return response()->json(['message' => 'Demande supprimée avec succès'], 200);
    }

    public function download($id)
    {
        $fichier = DemandeAutorisation::find($id);
        if (!$fichier) {
            return response()->json(['error' => 'la demande n\'existe pas'], 404);
        }
        $filePath = $fichier->document;
        if (!Storage::disk('public')->exists($filePath)) {
            return response()->json(['error' => 'le fichier n\'existe pas'], 404);
        }
        return response()->download(storage_path('app/public/' . $filePath), $fichier->intitule);
    }
}
