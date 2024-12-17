'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import StatBox from '@/app/components/StatBox';
import { Beer, Command } from '@/app/types/type';

function TableDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tableId = searchParams.get('tableId');
  const [commands, setCommands] = useState<Command[] | null>(null);

  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState(0);
  const [popularBeer, setPopularBeer] = useState<Beer | null>(null);
  const [capacity, setCapacity] = useState(0);
  const [latestCommands, setLatestCommands] = useState<Command[]>([]);

  // Fonction pour recharger les données
  const loadData = async () => {
    console.log('Loading data for table', tableId);

    await fetchTableDetails();

    // Fetch commands and calculate directly
    const latestCommandsData = await fetchLatestCommands();
    console.log('Latest commands fetched : ' + latestCommandsData.length);

    const filteredCommands = latestCommandsData.filter(
      (command: Command) => command.tableId === parseInt(tableId!)
    );

    setLatestCommands(filteredCommands);

    // Calcul des chiffres clés
    const total = filteredCommands.reduce(
      (acc: number, command: Command) => acc + command.price,
      0
    );
    setTotal(total);

    const orders = filteredCommands.reduce(
      (acc: number, command: Command) => acc + command.nbBeers,
      0
    );
    setOrders(orders);

    const beers = filteredCommands.map((command: Command) => command.beerId);
    const popularBeerId = beers
      .sort(
        (a: any, b: any) =>
          beers.filter((v: any) => v === a).length -
          beers.filter((v: any) => v === b).length
      )
      .pop();

    if (popularBeerId) {
      const beer = await fetchBeer(popularBeerId);
      setPopularBeer(beer);
    }
  };

  const fetchLatestCommands = async () => {
    try {
      const response = await fetch(`http://localhost:3001/commands`);
      const data = await response.json();
      return data; // Retourner les données directement
    } catch (error) {
      console.error('Error fetching latest commands:', error);
      return []; // Retourner un tableau vide en cas d'erreur
    }
  };

  const fetchBeer = async (beerId: any) => {
    try {
      const response = await fetch(`http://localhost:3001/beers/${beerId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching beer details:', error);
    }
  };

  // Fetch table details
  const fetchTableDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tables/${tableId}`);
      const data = await response.json();
      setCapacity(data.capacity);
    } catch (error) {
      console.error('Error fetching table details:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, [tableId]);

  const navigateToTable = (direction: 'prev' | 'next') => {
    const newTableId =
      direction === 'prev' ? parseInt(tableId!) - 1 : parseInt(tableId!) + 1;

    if (newTableId < 1) {
      return; // Empêche d'aller sur un ID inférieur à 1
    }

    router.push(`/backoffice/tables?tableId=${newTableId}`);
  };

  const returnBack = () => {
    router.push('/backoffice');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-800 text-gray-800 p-6">
      {/* Bouton Retour */}
      <div className="absolute top-6 left-6">
        <button
          onClick={returnBack}
          className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300 shadow-md"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8 animate-fade-in text-white">
        Table Details n°{tableId}
      </h1>

      {/* StatBoxes */}
      <div className="flex items-center gap-6 w-full max-w-6xl mb-8">
        <button
          className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-110"
          onClick={() => navigateToTable('prev')}
        >
          <img
            src="/arrow-bar-left-svgrepo-com.svg"
            alt="Previous Table"
            className="w-6 h-6"
          />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <StatBox
              icon="/circle.svg"
              title="Growth Revenue"
              value={total + ' €'}
            />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <StatBox icon="/circle.svg" title="Beer served" value={orders} />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <StatBox
              icon="/circle.svg"
              title="Most popular beer"
              value={popularBeer?.name ?? ''}
            />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <StatBox
              icon="/circle.svg"
              title="Stock de la Table"
              value={(capacity ? (capacity / 20) * 100 : '0') + '%'}
            />
          </div>
        </div>

        <button
          className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-110"
          onClick={() => navigateToTable('next')}
        >
          <img
            src="/arrow-right-line.svg"
            alt="Next Table"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Historique des dernières commandes */}
      <div className="w-full max-w-6xl bg-gray-100 p-6 rounded-lg shadow-lg mt-8">
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

export default TableDetails;
