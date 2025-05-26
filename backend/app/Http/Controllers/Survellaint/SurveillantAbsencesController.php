<?php

namespace App\Http\Controllers\Survellaint;

use App\Models\Groupe;
use App\Models\Absence;
use Illuminate\Http\Request;
use App\Models\Justification;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SurveillantAbsencesController extends Controller
{
    public function index()
    {
        $absences = Absence::with(
            'stagiaire.user',
            'formateur.user',
            'justification'
        )->get();

        $absences->transform(function ($absence) {
        if ($absence->heure_debut) {
            $absence->heure_debut = date('H:i', strtotime($absence->heure_debut));
        }
        if ($absence->heure_fin) {
            $absence->heure_fin = date('H:i', strtotime($absence->heure_fin));
        }
        return $absence;
    });

        return response()->json($absences, 200);
    }


    public function update(Request $request, $id)
    {
        $absence = Absence::find($id);
        if (!$absence) {
            return response()->json(['error' => 'Absence non trouvée'], 404);
        }

        $justification = $absence->justification;
        if (!$justification) {
            return response()->json(['error' => 'Justification non trouvée'], 404);
        }

        $validated = $request->validate([
            'status' => 'required|string',
        ]);

        $justification->status = $validated['status'];
        $justification->save();

        return response()->json(['message' => 'Statut de la justification et surveillant mis à jour avec succès'], 200);
    }


    public function download($id)
    {
        $justification = Justification::find($id);
        if (!$justification) {
            return response()->json(['error' => 'La justification n\'existe pas'], 404);
        }
        $filePath = $justification->document;
        if (!$filePath || !Storage::disk('public')->exists($filePath)) {
            return response()->json(['error' => 'Le fichier n\'existe pas'], 404);
        }
        return response()->download(storage_path('app/public/' . $filePath), basename($filePath));
    }

    public function absences($groupeId = null ){
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