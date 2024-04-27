<?php

namespace App\Http\Controllers;

use App\Models\Pristustvo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PrisustvoController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'event_id' => 'required|exists:events,id',
                'napomena' => 'nullable|string',
            ]);

            $validatedData['user_id'] = Auth::id();  

            $pristustvo = Pristustvo::create($validatedData);
            return response()->json(['pristustvo' => $pristustvo], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create pristustvo'], 500);
        }
    }
}
