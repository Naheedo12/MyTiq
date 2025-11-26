<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'event_id' => Event::factory(),
            'reference' => fake()->unique()->bothify('TICKET-####??'),
            'seat_number' => fake()->numberBetween(1, 150),
            'purchased_at' => now(),
            'price' => fake()->randomFloat(2, 10, 200),
            'pdf_path' => 'tickets/sample.pdf'
        ];
    }
}
