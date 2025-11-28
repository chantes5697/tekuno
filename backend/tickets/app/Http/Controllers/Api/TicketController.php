<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TicketRequest;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller{

    // GET /api/tickets

    public function index(Request $request){

        $query = Ticket::query();

        if ($request->filled('status')) {
            $query->where('status', $request->query('status'));
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->query('status'));
        }

        if ($request->filled('title')) {
            $title = $request->query('title');
            $query->where('title', 'like', "%{$title}%");
        }

        $perPage = (int) $request->query('per_page', 10);
        $tickets = $query->paginate($perPage)->appends($request->query());

        return TicketResource::collection($tickets)->response();


    }

     // POST /api/tickets
    public function store(TicketRequest $request)
    {
        $ticket = Ticket::create($request->validated());
        return (new TicketResource($ticket))->response()->setStatusCode(201);
    }

    // GET /api/tickets/{id}
    public function show(Ticket $ticket)
    {
        return new TicketResource($ticket);
    }

    // PUT/PATCH /api/tickets/{id}
    public function update(TicketRequest $request, Ticket $ticket)
    {
        $ticket->update($request->validated());
        return new TicketResource($ticket);
    }

    // DELETE /api/tickets/{id}
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();
        return response()->json(null, 204);
    }


}