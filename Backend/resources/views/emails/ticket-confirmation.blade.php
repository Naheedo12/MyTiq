@component('mail::message')
# Votre ticket est confirmé 🎫

Bonjour {{ $user->name }},  

Votre réservation pour l'événement a été confirmée avec succès !  

- **Référence du ticket :** {{ $ticket->reference }}  
- **Numéro de siège :** {{ $ticket->seat_number }}  
- **Date d'achat :** {{ $ticket->purchased_at->format('d/m/Y H:i') }}  
- **Prix :** {{ number_format($ticket->price, 2, ',', ' ') }} MAD  

Merci,<br>
@endcomponent
