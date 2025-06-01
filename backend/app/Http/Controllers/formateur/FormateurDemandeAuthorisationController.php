<?php

namespace App\Http\Controllers\formateur;

use App\Http\Controllers\Controller;
use App\Models\DemandeAutorisation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FormateurDemandeAuthorisationController extends Controller
{
  /**
   * Display a listing of demandes from stagiaires in formateur's groups
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    $user = Auth::user();
    $formateur = $user->formateur;

    if (!$formateur) {
      return response()->json(['error' => 'Formateur non trouvé'], 403);
    }

    // Get all groupe IDs that belong to this formateur
    $formateurGroupeIds = $formateur->groupes()->pluck('groupe_id')->toArray();

    if (empty($formateurGroupeIds)) {
      return response()->json([]);
    }

    $query = DemandeAutorisation::whereHas('stagiaire', function ($query) use ($formateurGroupeIds) {
      $query->whereIn('groupe_id', $formateurGroupeIds);
    });

    // Filter by groupe if specified
    if ($request->has('groupe_id') && $request->groupe_id) {
      $query->whereHas('stagiaire', function ($query) use ($request) {
        $query->where('groupe_id', $request->groupe_id);
      });
    }

    // Search functionality
    if ($request->has('search') && $request->search) {
      $search = $request->search;
      $query->where(function ($query) use ($search) {
        $query->where('intitule', 'like', "%{$search}%")
          ->orWhere('description', 'like', "%{$search}%")
          ->orWhereHas('stagiaire.user', function ($query) use ($search) {
            $query->where('nom', 'like', "%{$search}%")
              ->orWhere('prenom', 'like', "%{$search}%");
          });
      });
    }

    $demandes = $query->with([
      'stagiaire:id,user_id,groupe_id',
      'stagiaire.user:id,nom,prenom,email',
      'stagiaire.groupe:id,intitule,code',
      'surveillantGeneral:id,user_id',
      'surveillantGeneral.user:id,nom,prenom'
    ])
      ->orderBy('created_at', 'desc')
      ->get();

    return response()->json($demandes, 200);
  }

  /**
   * Download document associated with a demande
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function download($id)
  {
    $user = Auth::user();
    $formateur = $user->formateur;

    if (!$formateur) {
      return response()->json(['error' => 'Formateur non trouvé'], 403);
    }

    // Get all groupe IDs that belong to this formateur
    $formateurGroupeIds = $formateur->groupes()->pluck('groupe_id')->toArray();

    $demande = DemandeAutorisation::whereHas('stagiaire', function ($query) use ($formateurGroupeIds) {
      $query->whereIn('groupe_id', $formateurGroupeIds);
    })->find($id);

    if (!$demande) {
      return response()->json(['message' => 'Demande non trouvée'], 404);
    }

    if (!$demande->document) {
      return response()->json(['message' => 'Aucun document trouvé'], 404);
    }

    if (!Storage::exists($demande->document)) {
      return response()->json(['message' => 'Fichier non trouvé'], 404);
    }

    return Storage::download($demande->document);
  }
}
