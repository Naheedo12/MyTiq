<?php

namespace App\Listeners;

use App\Events\TicketPurchased;
use App\Mail\TicketConfirmation;
use Illuminate\Support\Facades\Mail;

class SendTicketConfirmationMail
{
    public function handle(TicketPurchased $event)
    {
        $ticket = $event->ticket;
        $user = $ticket->user;      
        $eventModel = $ticket->event; 

        Mail::to($user->email)
            ->send(new TicketConfirmation($ticket, $user, $eventModel));

    }
}

