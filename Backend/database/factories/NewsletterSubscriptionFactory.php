<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class NewsletterSubscriptionFactory extends Factory
{
    public function definition()
    {
        return [
            'email' => fake()->unique()->safeEmail(),
            'subscribed_at' => now(),
            'confirmed' => fake()->boolean(),
            'token' => Str::random(32),
        ];
    }
}
