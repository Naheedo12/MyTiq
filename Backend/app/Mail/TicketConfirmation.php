<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Ticket;
use App\Models\User;
use App\Models\Event;

class TicketConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $ticket;
    public $user;
    public $event;

    public function __construct(Ticket $ticket, User $user, Event $event)
    {
        $this->ticket = $ticket;
        $this->user = $user;
        $this->event = $event;
    }

    public function build()
    {
        return $this->markdown('emails.ticket-confirmation')
                    ->subject('Votre ticket MyTiq est confirmé');
    }
}


