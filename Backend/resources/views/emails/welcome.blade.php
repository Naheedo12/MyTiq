@component('mail::message')
# Bienvenue {{ $user->name }} 🎉

Merci de vous être inscrit·e sur **MyTiq** !  
Vous pouvez dès maintenant consulter les événements et acheter des billets.

@component('mail::button', ['url' => config('app.url')])
Voir les événements
@endcomponent

Si vous avez des questions, répondez à cet email.

Merci,<br>
@endcomponent
