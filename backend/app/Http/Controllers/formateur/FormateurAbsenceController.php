<?php

namespace App\Http\Controllers\formateur;

use App\Http\Controllers\Controller;
use App\Models\Absence;
use App\Models\Stagiaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FormateurAbsenceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $formateur = $user->formateur;

        if (!$formateur) {
            return response()->json(['error' => 'Formateur non trouvé'], 403);
        }

        $absences = Absence::where('formateur_id', $formateur->id)
            ->with([
                'stagiaire:id,user_id,groupe_id',
                'stagiaire.user:id,nom,prenom,email',
                'stagiaire.groupe:id,intitule,code',
            ])
            ->orderBy('date_absence', 'desc')
            ->get();

        return response()->json($absences);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'stagiaires' => 'required|array',
            'stagiaires.*' => 'required|exists:stagiaires,id',
            'date_absence' => 'required|date',
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i|after:heure_debut',
        ], [
            'stagiaires.required' => 'Veuillez sélectionner au moins un stagiaire',
            'date_absence.required' => 'La date d\'absence est requise',
            'date_absence.date' => 'La date d\'absence doit être une date valide',
            'heure_debut.required' => 'L\'heure de début est requise',
            'heure_debut.date_format' => 'L\'heure de début doit être au format HH:MM',
            'heure_fin.required' => 'L\'heure de fin est requise',
            'heure_fin.date_format' => 'L\'heure de fin doit être au format HH:MM',
            'heure_fin.after' => 'L\'heure de fin doit être après l\'heure de début',
        ]);
        
        $absencesWithSameDateAndTime = Absence::where('date_absence', $validated['date_absence'])
            ->where('heure_debut', $validated['heure_debut'])
            ->exists();
        if ($absencesWithSameDateAndTime) {
            return response()->json(['error' => 'Une absence avec la même date et heure existe déjà'], 400);
        }

        $user = Auth::user();
        $formateur = $user->formateur;

        if (!$formateur) {
            return response()->json(['error' => 'Formateur non trouvé'], 400);
        }

        $stagiaireIds = $validated['stagiaires'];
        $absences = [];

        foreach ($stagiaireIds as $stagiaireId) {
            $stagiaire = Stagiaire::find($stagiaireId);
            if (!$stagiaire) {
                continue;
            }
            $hasAccess = $formateur->groupes()->where('groupe_id', $stagiaire->groupe_id)->exists();
            if (!$hasAccess) {
                continue;
            }
            $absences[] = Absence::create([
                'stagiaire_id' => $stagiaireId,
                'formateur_id' => $formateur->id,
                'date_absence' => $validated['date_absence'],
                'heure_debut' => $validated['heure_debut'],
                'heure_fin' => $validated['heure_fin'],
            ]);
        }

        if (empty($absences)) {
            return response()->json(['error' => 'Aucune absence n\'a été ajoutée. Vérifiez les stagiaires sélectionnés.'], 403);
        }

        return response()->json(['message' => 'Absences ajoutées avec succès'], 201);
    }
}
