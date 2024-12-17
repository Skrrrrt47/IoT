'use client';
import { useEffect, useState } from 'react';

type Table = {
  id: number;
  status: boolean;
};

export default function Home() {
  const [tables, setTables] = useState<Table[]>([]); // Liste des tables
  const [selectedTable, setSelectedTable] = useState<number | null>(null); // Table sélectionnée

  // Fetch les tables depuis l'API
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch('http://localhost:3001/tables'); // Remplacez par l'URL de votre API
        if (response.ok) {
          const data = await response.json();
          setTables(data);
        } else {
          console.error('Failed to fetch tables');
        }
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };
    fetchTables();
  }, []);

  return (
    <div className="bg-gray-700 min-h-screen pt-5">
      <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-md shadow-md">
        <form>
          {/* Nom et Prénom */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom Prénom
            </label>
            <input
              type="text"
              id="name"
              placeholder="Prérémplir avec le Nom de la personne"
              className="w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Prérémplir avec les infos"
              className="w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Sélection de la table */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sélectionner une table
            </label>
            <select
              id="table"
              value={selectedTable ?? ''}
              onChange={(e) => setSelectedTable(parseInt(e.target.value))}
              className="w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="" disabled>
                -- Choisissez une table --
              </option>
              {tables.map((table) => (
                <option key={table.id} value={table.id}>
                  Table {table.id} - {table.status ? 'Disponible' : 'Occupée'}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Value"
              className="w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            ></textarea>
            - Dans la page de support, faire une liste déroulante pour choisir
            la table
          </div>

          {/* Bouton Submit */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
