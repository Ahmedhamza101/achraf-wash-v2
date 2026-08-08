<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class ReservationController extends Controller
{
    private const STATUSES = ['pending', 'confirmed', 'done', 'cancelled'];

    public function index(): JsonResponse
    {
        return response()->json(
            Reservation::orderBy('created_at', 'desc')->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $payload = $request->validate($this->reservationRules());

        $reservation = Reservation::create(array_merge($payload, [
            'status' => 'pending',
        ]));

        return response()->json(['reservation' => $reservation], 201);
    }

    public function adminStore(Request $request): JsonResponse
    {
        $payload = $request->validate(array_merge($this->reservationRules(), [
            'status' => ['sometimes', Rule::in(self::STATUSES)],
        ]));

        $payload['status'] = $payload['status'] ?? 'pending';

        $reservation = Reservation::create($payload);

        return response()->json(['reservation' => $reservation], 201);
    }

    public function updateStatus(Request $request, Reservation $reservation): JsonResponse
    {
        $payload = $request->validate([
            'status' => ['required', Rule::in(self::STATUSES)],
        ]);

        $reservation->update($payload);

        return response()->json($reservation);
    }

    private function reservationRules(): array
    {
        return [
            'marque' => ['required', 'string', 'max:255'],
            'modele' => ['required', 'string', 'max:255'],
            'annee' => ['required', 'string', 'max:255'],
            'couleur' => ['required', 'string', 'max:255'],
            'vehicle_type' => ['required', 'string', 'max:255'],
            'package_name' => ['required', 'string', 'max:255'],
            'package_price' => ['required', 'numeric'],
            'date' => ['required', 'date'],
            'time' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:1000'],
            'civilite' => ['required', 'string', 'max:20'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
