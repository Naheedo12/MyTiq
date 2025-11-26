<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    public function definition()
    {
        return [
            'admin_id' => User::factory(),
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'location' => fake()->city(),
            'date' => fake()->date(),
            'capacity' => fake()->numberBetween(50, 500),
            'price' => fake()->randomFloat(2, 10, 200),
            'image_path' => fake()->imageUrl(),
            'status' => fake()->randomElement(['active', 'canceled', 'completed']),
        ];
    }
}
