<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class EventController extends Controller
{
    public function index()
    {
        // Dobij trenutno ulogovanog korisnika
        $user = Auth::user();

        // Dobij sve događaje povezane sa trenutno ulogovanim korisnikom
        $events = Event::where('user_id', $user->id)->get();

        return response()->json(['events' => $events]);
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);

        return response()->json(['event' => $event]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date|after:start_datetime',
            'event_type_id' => 'required|exists:event_types,id',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $user_id = Auth::id(); // Dobij ID trenutno ulogovanog korisnika

        $event = Event::create(array_merge($request->all(), ['user_id' => $user_id]));

        return response()->json(['event' => $event], 201);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date|after:start_datetime',
            'event_type_id' => 'required|exists:event_types,id',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $user_id = Auth::id(); // Dobij ID trenutno ulogovanog korisnika

        $event->update(array_merge($request->all(), ['user_id' => $user_id]));

        return response()->json(['event' => $event]);
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }
}
