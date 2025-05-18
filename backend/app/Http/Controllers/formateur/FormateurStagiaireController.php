<?php

namespace App\Http\Controllers\formateur;

use App\Http\Controllers\Controller;
use App\Models\Groupe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FormateurStagiaireController extends Controller
{
    public function stagiaires($groupeId = null)
    {
        $user = Auth::user();

        if (is_null($groupeId)) {
            $formateur = $user->formateur;
            if (!$formateur) {
                return response()->json(['error' => 'Formateur non trouvé'], 403);
            }
            $stagiaires = [];
            foreach ($formateur->groupes as $groupe) {
                $stagiaires = array_merge(
                    $stagiaires,
                    $groupe->stagiaires()->with('user')->get()->all()
                );
            }
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

        $stagiaires = $groupe->stagiaires()->with('user')->get();
        return response()->json($stagiaires, 200);
    }
}
