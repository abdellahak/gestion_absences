<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stagiaire extends Model
{
    use HasFactory;

    protected $fillable = [
        'adresse',
        'telephone',
        'CNI',
        'sexe',
        'date_naissance',
        'lieu_naissance',
        'user_id',
        'groupe_id',
        'numero_inscription',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function groupe()
    {
        return $this->belongsTo(Groupe::class);
    }
}
