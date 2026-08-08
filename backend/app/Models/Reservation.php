<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'marque',
        'modele',
        'annee',
        'couleur',
        'vehicle_type',
        'package_name',
        'package_price',
        'date',
        'time',
        'city',
        'address',
        'civilite',
        'first_name',
        'last_name',
        'email',
        'phone',
        'notes',
        'status',
    ];

    protected $casts = [
        'package_price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
