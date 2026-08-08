<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ACHRAF WASH Admin – Réservations</title>
    <style>
        body { font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 0; }
        header { background: #0369a1; color: white; padding: 1.5rem 2rem; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { padding: 0.8rem 1rem; text-align: left; border-bottom: 1px solid #e2e8f0; }
        th { background: #e2e8f0; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .badge { display: inline-flex; gap: 0.5rem; padding: 0.35rem 0.75rem; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; }
        .badge-pending { background: #fef3c7; color: #92400e; }
        .badge-confirmed { background: #d1fae5; color: #065f46; }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>Admin Dashboard</h1>
            <p>Liste des réservations ACHRAF WASH</p>
        </div>
    </header>
    <main class="container">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Véhicule</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Ville</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($reservations as $reservation)
                    <tr>
                        <td>{{ $reservation->id }}</td>
                        <td>{{ $reservation->first_name }} {{ $reservation->last_name }}<br>{{ $reservation->email }}</td>
                        <td>{{ $reservation->vehicle_type }}<br>{{ $reservation->marque }} {{ $reservation->modele }}</td>
                        <td>{{ $reservation->package_name }}</td>
                        <td>{{ $reservation->date }} {{ $reservation->time }}</td>
                        <td>{{ $reservation->city }}</td>
                        <td>
                            <span class="badge badge-{{ $reservation->status === 'pending' ? 'pending' : 'confirmed' }}">
                                {{ ucfirst($reservation->status) }}
                            </span>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </main>
</body>
</html>
