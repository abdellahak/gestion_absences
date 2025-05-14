<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveillantGeneral extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date_recrutement',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
