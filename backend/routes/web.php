<?php

use App\Http\Controllers\AdminReservationController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin/reservations', [AdminReservationController::class, 'index']);
