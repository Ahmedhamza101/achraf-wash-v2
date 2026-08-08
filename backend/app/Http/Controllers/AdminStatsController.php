<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;

class AdminStatsController extends Controller
{
    public function index(): JsonResponse
    {
        $now = Carbon::now();

        return response()->json([
            'pending_reservations' => Reservation::where('status', 'pending')->count(),
            'reservations_this_week' => Reservation::whereBetween('date', [
                $now->copy()->startOfWeek(),
                $now->copy()->endOfWeek(),
            ])->count(),
            'unread_messages' => Message::where('status', 'unread')->count(),
            'revenue_this_month' => (float) Reservation::whereYear('date', $now->year)
                ->whereMonth('date', $now->month)
                ->where('status', '!=', 'cancelled')
                ->sum('package_price'),
        ]);
    }
}
