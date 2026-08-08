<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MessageController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $message = Message::create(array_merge($payload, [
            'status' => 'unread',
        ]));

        return response()->json(['message' => $message], 201);
    }

    public function index(): JsonResponse
    {
        return response()->json(
            Message::orderBy('created_at', 'desc')->get()
        );
    }

    public function updateStatus(Request $request, Message $message): JsonResponse
    {
        $payload = $request->validate([
            'status' => ['required', Rule::in(['read', 'unread'])],
        ]);

        $message->update($payload);

        return response()->json($message);
    }
}
