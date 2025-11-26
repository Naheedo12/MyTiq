<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsletterSubscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'subscribed_at',
        'confirmed',
        'token',
    ];

    protected $casts = [
        'subscribed_at' => 'datetime',
        'confirmed' => 'boolean',
    ];
}
