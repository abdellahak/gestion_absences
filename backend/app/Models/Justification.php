<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Justification extends Model
{
    use HasFactory;

    protected $fillable = [
        'absence_id',
        'surveillant_general_id',
        'intitule',
        'document',
        'status',
    ];

    public function absence()
    {
        return $this->belongsTo(Absence::class);
    }

    public function surveillantGeneral()
    {
        return $this->belongsTo(SurveillantGeneral::class);
    }
}
