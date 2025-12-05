<?php

namespace App\Http\Controllers;

use App\Events\NewsletterConfirmMail;
use App\Http\Requests\NewslatterRequest;
use App\Models\NewsletterSubscription;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;

class NewsletterController extends Controller
{
    public function index(){
        $newsletter=NewsletterSubscription::all();
        return response()->json(['newsletter'=>$newsletter]);
    }
    public function subscribe(NewslatterRequest $request){
        $news=$request->validated();
        $token=Str::random(40);
        $news['token']=$token;
        $news['subscribed_at']=now();
        $news['confirmed']=false;
       $subscribe= NewsletterSubscription::create($news);

       event(new NewsletterConfirmMail($subscribe));

        return response()->json(['message'=>'Un email de confirmation a été envoyé.',
                                 'subscribe'=> $subscribe]);

    }


    public function confirm(NewslatterRequest $request)
{
    $request->validated();

    $subscription = NewsletterSubscription::where('token', $request->token)->first();

    if (!$subscription) {
        return response()->json(['message' => 'Token invalide'], 404);
    }

    if ($subscription->confirmed) {
        return response()->json(['message' => 'Déjà confirmé'], 200);
    }

    $subscription->update([
        'confirmed' => true
    ]);

    return response()->json([
        'message' => 'Votre abonnement a été confirmé !',
        'status' => 'confirmed'
    ]);
}
 public function check(NewslatterRequest $request)
{
    $request->validated();

    $subscription = NewsletterSubscription::where('email', $request->email)->first();

    if (!$subscription) {
        return response()->json(['message' => 'Email pas trouvé'], 404);
    }

    if ($subscription->confirmed) {
        return response()->json(['message' => 'Email Déjà confirmé'], 200);
    }

    return response()->json(['message' => 'Email Pas encore confirmé'], 200);



}

}
