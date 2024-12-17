'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StatBox from '@/app/components/StatBox';
import { Beer, Command } from '@/app/types/type';

export default function Finance() {
  const router = useRouter();
  const [commands, setCommands] = useState<Command[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBeers, setTotalBeers] = useState(0);
  const [popularBeer, setPopularBeer] = useState<Beer | null>(null);
  const [nbTables, setNbTables] = useState(0);
  const [nbAvailableTables, setNbAvailableTables] = useState(0);
  const [latestCommands, setLatestCommands] = useState<Command[]>([]);

  // Récupération des commandes
  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch('http://localhost:3001/commands');
        const data = await response.json();
        setCommands(data);

        // Calcul des statistiques
        calculateStats(data);

        // Historique des dernières commandes
        setLatestCommands(data.slice(0, 10)); // Les 10 commandes les plus récentes
      } catch (error) {
        console.error('Error fetching commands:', error);
      }
    };

    fetchCommands();
  }, []);

  // Récupération des informations sur les tables
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch('http://localhost:3001/tables');
        const tables = await response.json();

        const availableTables = tables.filter(
          (table: { status: boolean }) => table.status
        ).length;

        setNbTables(tables.length);
        setNbAvailableTables(availableTables);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  // Fonction pour calculer les statistiques
  const calculateStats = (commands: Command[]) => {
    const total = commands.reduce((acc, command) => acc + command.price, 0);
    const beersServed = commands.reduce(
      (acc, command) => acc + command.nbBeers,
      0
    );

    setTotalRevenue(total);
    setTotalBeers(beersServed);

    const beerCounts: Record<number, number> = {};
    commands.forEach((command) => {
      beerCounts[command.beerId] = (beerCounts[command.beerId] || 0) + 1;
    });

    const mostPopularBeerId = Object.keys(beerCounts).reduce((a, b) =>
      beerCounts[Number(a)] > beerCounts[Number(b)] ? a : b
    );

    fetchPopularBeer(Number(mostPopularBeerId));
  };

  // Récupérer les détails de la bière la plus populaire
  const fetchPopularBeer = async (beerId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/beers/${beerId}`);
      const data = await response.json();
      setPopularBeer(data);
    } catch (error) {
      console.error('Error fetching popular beer:', error);
    }
  };

  const returnBack = () => {
    router.push('/backoffice');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-800 text-white p-6">
      {/* Bouton Retour */}
      <div className="absolute top-6 left-6">
        <button
          onClick={returnBack}
          className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300 shadow-md"
        >
          ← Back
        </button>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-8 animate-fade-in">
        Finance Overview
      </h1>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mb-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
          <StatBox
            icon={'/circle.svg'}
            title="Growth Revenue"
            value={totalRevenue + ' €'}
          />
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
          <StatBox
            icon={'/circle.svg'}
            title="Beer Served"
            value={totalBeers}
          />
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
          <StatBox
            icon={'/circle.svg'}
            title="Most Popular Beer"
            value={popularBeer?.name ?? 'N/A'}
          />
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
          <StatBox
            icon={'/circle.svg'}
            title="Operational Tables"
            value={`${nbAvailableTables}/${nbTables}`}
          />
        </div>
      </div>

      {/* Historique des commandes */}
      <div className="w-full max-w-6xl bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Order History</h2>
        {latestCommands.length > 0 ? (
          <ul className="space-y-3">
            {latestCommands.map((command) => (
              <li
                key={command.id}
                className="border-b border-gray-300 pb-2 flex justify-between text-gray-700"
              >
                <span>
                  <strong>Order ID:</strong> {command.id} |{' '}
                  <strong>Table:</strong> {command.tableId} |{' '}
                  <strong>Beers:</strong> {command.nbBeers}
                </span>
                <span>
                  <strong>Price:</strong> {command.price} € |{' '}
                  <strong>Date:</strong>{' '}
                  {new Date(command.date).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent orders available.</p>
        )}
      </div>
    </div>
  );
}
