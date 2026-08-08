<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminStatsController;
use App\Http\Controllers\AdminTarifController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

Route::post('auth/token', [AuthController::class, 'token']);
Route::post('reservations', [ReservationController::class, 'store']);
Route::post('messages', [MessageController::class, 'store']);

Route::post('admin/login', [AdminAuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('admin/reservations', [ReservationController::class, 'index']);
    Route::post('admin/reservations', [ReservationController::class, 'adminStore']);
    Route::patch('admin/reservations/{reservation}', [ReservationController::class, 'updateStatus']);
    Route::get('auth/user', [AuthController::class, 'user']);

    Route::get('admin/me', [AdminAuthController::class, 'me']);
    Route::post('admin/logout', [AdminAuthController::class, 'logout']);
    Route::get('admin/stats', [AdminStatsController::class, 'index']);

    Route::get('admin/messages', [MessageController::class, 'index']);
    Route::patch('admin/messages/{message}', [MessageController::class, 'updateStatus']);

    Route::get('admin/tarifs', [AdminTarifController::class, 'index']);
    Route::post('admin/tarifs', [AdminTarifController::class, 'store']);
    Route::patch('admin/tarifs/{tarif}', [AdminTarifController::class, 'update']);
    Route::delete('admin/tarifs/{tarif}', [AdminTarifController::class, 'destroy']);
});
