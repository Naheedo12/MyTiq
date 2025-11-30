<?php

namespace App\Events;

use App\Models\NewsletterSubscription;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewsletterConfirmMail
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $subscribe;

    public function __construct(NewsletterSubscription $subscribe)
    {
        $this->subscribe = $subscribe;
    }

   
}
