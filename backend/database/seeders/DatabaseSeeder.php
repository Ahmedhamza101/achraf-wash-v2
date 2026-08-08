<?php

namespace Database\Seeders;

use App\Models\Reservation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(AdminUserSeeder::class);

        Reservation::create([
            'marque' => 'Toyota',
            'modele' => 'Corolla',
            'annee' => '2021',
            'couleur' => 'Blanc',
            'vehicle_type' => 'berline',
            'package_name' => 'Lavage Spécial',
            'package_price' => 100,
            'date' => now()->addDays(3)->format('Y-m-d'),
            'time' => '14:00',
            'city' => 'Casablanca',
            'address' => '15 Rue de la Gare',
            'civilite' => 'Monsieur',
            'first_name' => 'Youssef',
            'last_name' => 'Benkirane',
            'email' => 'youssef@example.com',
            'phone' => '0612345678',
            'notes' => 'Merci de bien nettoyer l’intérieur.',
            'status' => 'pending',
        ]);
    }
}
