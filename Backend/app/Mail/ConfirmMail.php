<?php

namespace App\Mail;

use App\Models\NewsletterSubscription;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ConfirmMail extends Mailable
{
    use Queueable, SerializesModels;
public $subscribe;

    public function __construct(NewsletterSubscription $subscribe)
    {
        $this->subscribe = $subscribe;
    }

    public function build()
    {
        return $this->subject("Confirmez votre abonnement")
                    ->view('emails.newsletter-confirmation')
                    ->with(['token' => $this->subscribe->token]);
    }
}
