<?php

namespace App\Http\Controllers\Survellaint;

use App\Models\Absence;
use Illuminate\Http\Request;
use App\Models\Justification;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class SurveillantAbsencesController extends Controller
{
public function index()
{
    $absence = Absence::with(
        'stagiaire.user',
    'formateur.user', 'justification')->get();

    return response()->json($absence, 200);}
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

        return response()->json(['message' => 'Statut de la justification mis à jour avec succès'], 200);
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

}