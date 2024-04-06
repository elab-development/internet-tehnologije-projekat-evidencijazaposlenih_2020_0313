<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventType;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class EventTypeController extends Controller
{
    public function index()
    {
        $eventTypes = EventType::all();

        return response()->json(['event_types' => $eventTypes]);
    }

    public function show($id)
    {
        $eventType = EventType::findOrFail($id);

        return response()->json(['event_type' => $eventType]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'note' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $eventType = EventType::create($request->all());

        return response()->json(['event_type' => $eventType], 201);
    }

    public function update(Request $request, $id)
    {
        $eventType = EventType::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'note' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $eventType->update($request->all());

        return response()->json(['event_type' => $eventType]);
    }

    public function destroy($id)
    {
        $eventType = EventType::findOrFail($id);
        $eventType->delete();

        return response()->json(['message' => 'Event type deleted successfully']);
    }
}
