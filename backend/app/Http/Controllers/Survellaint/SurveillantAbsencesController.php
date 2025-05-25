<?php

namespace App\Http\Controllers\Survellaint;

use App\Models\Absence;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SurveillantAbsencesController extends Controller
{
public function index()
{
    $absence = Absence::with(
        'stagiaire.user',
    'formateur.user', 'justification')->get();

    return response()->json($absence, 200);}
}