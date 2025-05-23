<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formateur extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'date_recrutement',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function groupes()
    {
        return $this->belongsToMany(Groupe::class);
    }

    public function stagiaires()
    {
        return $this->hasMany(Stagiaire::class);
    }
}
