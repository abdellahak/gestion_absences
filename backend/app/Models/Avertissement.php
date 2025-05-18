<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avertissement extends Model
{
    use HasFactory;

    protected $fillable = [
        'stagiaire_id',
        'description',
    ];

    public function stagiaire()
    {
        return $this->belongsTo(Stagiaire::class);
    }
}