<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'admin_id',
        'title',
        'description',
        'location',
        'date',
        'capacity',
        'price',
        'image_path',
        'status',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}

