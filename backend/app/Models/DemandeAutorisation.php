<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandeAutorisation extends Model
{
    use HasFactory;

    protected $fillable = [
        'stagiaire_id',
        'surveillant_general_id',
        'intitule',
        'description',
        'document',
        'date',
        'heure_debut',
        'heure_fin',
        'status'
    ];

    public function stagiaire()
    {
        return $this->belongsTo(Stagiaire::class);
    }

    public function surveillantGeneral()
    {
        return $this->belongsTo(SurveillantGeneral::class);
    }
}
