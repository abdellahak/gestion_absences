<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groupe extends Model
{
    use HasFactory;

    protected $fillable = [
        'intitule',
        'filiere_id',
    ];

    public function formateurs()
    {
        return $this->belongsToMany(Formateur::class);
    }
}
