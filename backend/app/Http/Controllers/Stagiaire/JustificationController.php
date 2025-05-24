<?php

namespace App\Http\Controllers\Stagiaire;

use App\Models\Absence;
use Illuminate\Http\Request;
use App\Models\Justification;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class JustificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $stagiaire = $user->stagiaire;
        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }
        $justifications = $stagiaire->justifications()->with('surveillantGeneral.user')->orderByDesc('created_at')->get();
        return response()->json($justifications, 200);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $stagiaire = $user->stagiaire;
        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }

        $validated = $request->validate([
           'intitule' => 'required|string|max:255',
            'document' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'status' => 'in:en_attente,valide,refuse',
            'absence_ids' => 'required|array|min:1',
            'absence_ids.*' => 'exists:absences,id'
        ]);

        $documentPath = null;
        if ($request->hasFile('document')) {
            $documentPath = $request->file('document')->store('justifications', 'public');
        }

        $justification = Justification::create([
            'intitule' => $validated['intitule'],
            'document' => $documentPath,
            'stagiaire_id' => $stagiaire->id,
            'status' => $validated['status'] ?? 'en_attente',
        ]);

        Absence::whereIn('id', $validated['absence_ids'])
        ->where('stagiaire_id', $stagiaire->id)
        ->update(['justification_id' => $justification->id]);


        return response()->json($justification, 201);
    }
    public function show(string $id)
    {
        $justification = Justification::with('surveillantGeneral.user')->find($id);
        if (!$justification) {
            return response()->json(['message' => 'Justification non trouvée'], 404);
        }

        $absenceIds = Absence::where('justification_id', $id)
            ->whereHas('justification', function($q) {
                $q->where('status', '!=', 'valide');
            })
            ->pluck('id')
            ->toArray();

        $result = $justification->toArray();
        $result['absence_ids'] = $absenceIds;
        $result['document'] = $justification->document ? basename($justification->document) : null;

        return response()->json($result, 200);
    }

    public function update(Request $request, string $id)
    {
        $justification = Justification::find($id);
        if (!$justification) {
            return response()->json(['message' => 'Justification non trouvée'], 404);
        }

        $validated = $request->validate([
            'intitule' => 'sometimes|required|string|max:255',
            'document' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'status' => 'in:en_attente,valide,refuse',
            'absence_ids' => 'sometimes|array|min:1',
            'absence_ids.*' => 'exists:absences,id'
        ]);

        if (isset($validated['absence_ids'])) {
            Absence::where('justification_id', $justification->id)
                ->update(['justification_id' => null]);
            Absence::whereIn('id', $validated['absence_ids'])
                ->update(['justification_id' => $justification->id]);
        }

        if ($request->hasFile('document')) {
            if ($justification->document && Storage::disk('public')->exists($justification->document)) {
                Storage::disk('public')->delete($justification->document);
            }
            $justification->document = $request->file('document')->store('justifications', 'public');
        }

        if (isset($validated['intitule'])) {
            $justification->intitule = $validated['intitule'];
        }
        if (isset($validated['status'])) {
            $justification->status = $validated['status'];
        }

        $justification->save();
        $result = $justification->toArray();
        $result['document'] = $justification->document ? basename($justification->document) : null;
        return response()->json($justification, 200);
    }

    public function destroy(string $id)
    {
        $justification = Justification::find($id);
        if (!$justification) {
            return response()->json(['message' => 'Justification non trouvée'], 404);
        }
        if ($justification->document && Storage::disk('public')->exists($justification->document)) {
            Storage::disk('public')->delete($justification->document);
        }
        $justification->delete();
        return response()->json(['message' => 'Justification supprimée avec succès'], 200);
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