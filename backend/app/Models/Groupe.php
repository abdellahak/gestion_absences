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
        'code'
    ];

    public function formateurs()
    {
        return $this->belongsToMany(Formateur::class);
    }
    
    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }
}
