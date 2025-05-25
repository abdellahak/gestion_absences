<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Justification extends Model
{
    use HasFactory;

    protected $fillable = [
        'surveillant_general_id',
        'intitule',
        'document',
        'status',
        'stagiaire_id'
    ];

    public function absences() 
    {
        return $this->hasMany(Absence::class);
    }

    public function surveillantGeneral()
    {
        return $this->belongsTo(SurveillantGeneral::class);
    }
}
