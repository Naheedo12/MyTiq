<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Event;
use App\Models\Ticket; 
use App\Models\NewsletterSubscription;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
public function run(): void
    {
        $users = User::factory(10)->create([
            'role' => 'user'
        ]);

        $adminId = 1; 

        $events = Event::factory(4)->create([
            'admin_id' => $adminId
        ]);

        foreach ($events as $event) {
            Ticket::factory(10)->create([
                'event_id' => $event->id,
                'user_id' => $users->random()->id,
            ]);
        }
        NewsletterSubscription::factory(12)->create([
            'confirmed' => true,
        ]);

        NewsletterSubscription::factory(3)->create([
            'confirmed' => false, 
        ]);
    }
}
