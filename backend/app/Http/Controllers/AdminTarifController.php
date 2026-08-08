<?php

namespace App\Http\Controllers;

use App\Models\Tarif;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminTarifController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Tarif::orderBy('vehicle_type')->orderBy('sort_order')->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'vehicle_type' => ['required', 'string', 'max:255'],
            'package_name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
            'description' => ['nullable', 'string', 'max:2000'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer'],
        ]);

        $tarif = Tarif::create($payload);

        return response()->json($tarif, 201);
    }

    public function update(Request $request, Tarif $tarif): JsonResponse
    {
        $payload = $request->validate([
            'vehicle_type' => ['sometimes', 'required', 'string', 'max:255'],
            'package_name' => ['sometimes', 'required', 'string', 'max:255'],
            'price' => ['sometimes', 'required', 'numeric'],
            'description' => ['nullable', 'string', 'max:2000'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer'],
        ]);

        $tarif->update($payload);

        return response()->json($tarif);
    }

    public function destroy(Tarif $tarif): JsonResponse
    {
        $tarif->delete();

        return response()->json(null, 204);
    }
}
