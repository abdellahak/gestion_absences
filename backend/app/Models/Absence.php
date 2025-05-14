<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'stagiaire_id',
        'formateur_id',
        'date_absence',
        'heure_debut',
        'heure_fin',
    ];

    public function stagiaire()
    {
        return $this->belongsTo(Stagiaire::class);
    }
    public function formateur()
    {
        return $this->belongsTo(Formateur::class);
    }
}
