<?php

namespace App\Providers;

use App\Events\NewsletterConfirmMail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Events\UserRegistered;
use App\Listeners\SendConfirmMail;
use App\Listeners\SendWelcomeEmail;
use App\Events\TicketPurchased;
use App\Listeners\SendTicketConfirmationMail;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        UserRegistered::class => [
            SendWelcomeEmail::class],

        TicketPurchased::class => [
            SendTicketConfirmationMail::class,
        ],
        NewsletterConfirmMail::class =>[
            SendConfirmMail::class,
        ],
    ];


    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
