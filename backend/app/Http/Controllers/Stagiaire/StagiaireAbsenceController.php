<?php

namespace App\Http\Controllers\Stagiaire;

use App\Models\Absence;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class StagiaireAbsenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $stagiaire = $user->stagiaire;
        $perPage = $request->get('per_page', 10);
        $search = $request->get('search');

        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }

        $query = Absence::with(['formateur.user', 'justification'])
            ->where('stagiaire_id', $stagiaire->id);

        // Add search functionality
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('date_absence', 'like', "%{$search}%")
                    ->orWhereHas('formateur.user', function ($q) use ($search) {
                        $q->where('nom', 'like', "%{$search}%")
                            ->orWhere('prenom', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by status if specified
        if ($request->has('status') && $request->status) {
            if ($request->status === 'non_justifiee') {
                // Filter for absences without justifications
                $query->whereNull('justification_id');
            } else {
                // Filter for absences with specific justification status
                $query->whereHas('justification', function ($q) use ($request) {
                    $q->where('status', $request->status);
                });
            }
        }

        $absences = $query->orderBy('date_absence', 'desc')->paginate($perPage);
        return response()->json($absences, 200);
    }

    /**
     * Get all absences for justification form (not paginated)
     */
    public function forJustification()
    {
        $user = Auth::user();
        $stagiaire = $user->stagiaire;

        if (!$stagiaire) {
            return response()->json(['message' => 'Stagiaire non trouvé'], 404);
        }

        $absences = Absence::with(['formateur.user', 'justification'])
            ->where('stagiaire_id', $stagiaire->id)
            ->orderBy('date_absence', 'desc')
            ->get();

        return response()->json($absences, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
