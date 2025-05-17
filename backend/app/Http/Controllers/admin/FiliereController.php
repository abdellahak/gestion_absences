<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Filiere;
use Illuminate\Http\Request;

class FiliereController extends Controller
{
    public function index()
    {
        $data = Filiere::all();
        return response()->json($data, 200);
    }

    public function show($id)
    {
        // Code to show a specific filiere
    }

    public function store(Request $request)
    {
        // Code to create a new filiere
    }

    public function update(Request $request, $id)
    {
        // Code to update an existing filiere
    }

    public function destroy($id)
    {
        // Code to delete a filiere
    }
}
