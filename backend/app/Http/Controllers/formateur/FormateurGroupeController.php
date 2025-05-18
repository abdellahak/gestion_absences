<?php

namespace App\Http\Controllers\formateur;

use App\Http\Controllers\Controller;
use App\Models\Formateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FormateurGroupeController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->role != "formateur") {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $groupes = Formateur::where('user_id', $user->id)->first()->groupes()->with('filiere')->get();
        return response()->json($groupes);
    }
}
