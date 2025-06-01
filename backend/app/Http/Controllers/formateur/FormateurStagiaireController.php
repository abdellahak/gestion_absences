<?php

namespace App\Http\Controllers\formateur;

use App\Http\Controllers\Controller;
use App\Models\Groupe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FormateurStagiaireController extends Controller
{
    public function stagiaires(Request $request, $groupeId = null)
    {
        $user = Auth::user();
        $perPage = $request->get('per_page', 10);
        $search = $request->get('search');

        if (is_null($groupeId)) {
            $formateur = $user->formateur;
            if (!$formateur) {
                return response()->json(['error' => 'Formateur non trouvé'], 403);
            }

            $formateurGroupeIds = $formateur->groupes()->pluck('groupe_id')->toArray();

            if (empty($formateurGroupeIds)) {
                return response()->json([
                    'data' => [],
                    'current_page' => 1,
                    'last_page' => 1,
                    'total' => 0,
                    'per_page' => $perPage
                ]);
            }

            $query = \App\Models\Stagiaire::with(['user', 'groupe'])
                ->whereIn('groupe_id', $formateurGroupeIds);

            if ($search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('nom', 'like', "%{$search}%")
                        ->orWhere('prenom', 'like', "%{$search}%");
                })->orWhere('numero_inscription', 'like', "%{$search}%");
            }

            $stagiaires = $query->paginate($perPage);
            return response()->json($stagiaires, 200);
        }

        $groupe = Groupe::where('id', $groupeId)
            ->whereHas('formateurs', function ($q) use ($user) {
                $q->where('formateur_id', $user->formateur->id);
            })
            ->first();

        if (!$groupe) {
            return response()->json(['error' => 'Groupe non trouvé ou accès refusé'], 403);
        }

        $query = $groupe->stagiaires()->with('user');

        if ($search) {
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('nom', 'like', "%{$search}%")
                    ->orWhere('prenom', 'like', "%{$search}%");
            })->orWhere('numero_inscription', 'like', "%{$search}%");
        }

        $stagiaires = $query->paginate($perPage);
        return response()->json($stagiaires, 200);
    }
}
