'use client';
import { Table } from './types/type';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function TableList() {
  const router = useRouter();
  const [tables, setTables] = useState<Table[]>([]);

  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch('http://localhost:3001/tables');
        const json = await response.json();
        console.log(json);
        setTables(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTables();
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <p>User not found. Please sign in.</p>;
  }

  const handleTableClick = (tableId: number) => {
    router.push(`/tables?tableId=${tableId}`);
  };

  const handleBackToBackoffice = () => {
    router.push('/backoffice');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-800 text-white p-6 relative">
      {/* Bouton Go to Backoffice */}
      <div className="absolute top-6 left-6">
        <button
          onClick={handleBackToBackoffice}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
        >
          Go to Backoffice
        </button>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-8 animate-fade-in">
        Available Tables
      </h1>

      {/* Liste des tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {tables.map((table: Table) => (
          <div
            key={table.id}
            className="w-full border border-gray-200 rounded-lg p-6 bg-white shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <h2 className="text-xl font-bold text-black mb-2">
              Table {table.id}
            </h2>
            <p className="text-gray-700 mb-4">
              Status:{' '}
              <span className="font-semibold">
                {!table.status ? 'Un-available' : 'Available'}
              </span>
            </p>
            <button
              className={`mt-4 py-2 px-4 rounded transition-colors duration-300 ${
                !table.status
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-700'
              }`}
              onClick={() => table.status && handleTableClick(table.id)}
              disabled={!table.status}
            >
              Use Table
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
