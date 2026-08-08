<?php

namespace App\Http\Controllers;

use App\Models\Reservation;

class AdminReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::orderBy('created_at', 'desc')->get();

        return view('admin.reservations', [
            'reservations' => $reservations,
        ]);
    }
}
