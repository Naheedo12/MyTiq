<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Event;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Str;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Events\TicketPurchased;

class TicketController extends Controller
{
    public function index()
    {
        return auth()->user()->tickets()->with('event')->get();
    }
    
    public function index_admin()
    {
        return Ticket::all();
    }

    public function store(StoreTicketRequest $request)
    {
        $event = Event::findOrFail($request->event_id);

        $user = auth()->user();
        $reference = strtoupper(Str::random(10));
        $seat = rand(1, $event->capacity);

        $ticket = Ticket::create([
            'user_id' => auth()->id(),
            'event_id' => $event->id,
            'reference' => $reference,
            'seat_number' => $seat,
            'purchased_at' => now(),
            'price' => $event->price,
        ]);

        $pdf = Pdf::loadView('tickets.pdf', [
            'ticket' => $ticket,
            'event' => $event,
            'user' => $user,
        ]);

        $pdfPath = 'tickets/ticket_'.$ticket->id.'.pdf';
        \Storage::put($pdfPath, $pdf->output());

        $ticket->update(['pdf_path' => $pdfPath]);

        TicketPurchased::dispatch($ticket);

        return response()->json([
            "message" => "Ticket réservé avec succès 🎫",
            "ticket" => $ticket
        ], 201);
    }

    public function show(Ticket $ticket)
    {
        return $ticket->load('event');
    }

    public function destroy($id)
    {
        $ticket = Ticket::find($id);

        if (!$ticket) {
            return response()->json(['message' => 'Ticket introuvable'], 404);
        }

        $ticket->delete();

        return response()->json(['message' => 'Ticket supprimé avec succès']);
    }

    public function downloadPdf(Ticket $ticket)
    {
        return response()->download(storage_path('app/' . $ticket->pdf_path));
    }
}
