<?php

namespace App\Listeners;

use App\Events\NewsletterConfirmMail;
use App\Mail\ConfirmMail;
use Illuminate\Support\Facades\Mail;

class SendConfirmMail
{

     public function handle(NewsletterConfirmMail $event)
    {
        Mail::to($event->subscribe->email)
            ->send(new ConfirmMail($event->subscribe));
    }
}
