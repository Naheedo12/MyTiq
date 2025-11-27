<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Ticket</title>
    <style>
        body { font-family: sans-serif; text-align: center; }
        .ticket { border: 2px dashed #333; padding: 20px; margin-top: 40px; }
    </style>
</head>
<body>
    <h2>Ticket de réservation</h2>

    <div class="ticket">
        <p><strong>Name :</strong> {{ $user->name }}</p>
        <hr>
        <p><strong>Événement :</strong> {{ $event->title }}</p>
        <p><strong>Lieu :</strong> {{ $event->location }}</p>
        <p><strong>Date :</strong> {{ $event->date }}</p>
        <p><strong>Prix :</strong> {{ $ticket->price }} MAD</p>
        <hr>
        <p><strong>Référence :</strong> {{ $ticket->reference }}</p>
        <p><strong>Numéro de siège :</strong> {{ $ticket->seat_number }}</p>
        <p><strong>Réservé le :</strong> {{ $ticket->purchased_at }}</p>
    </div>
</body>
</html>
