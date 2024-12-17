'use client';

import { useEffect, useState } from 'react';
import { Beer } from '../../types/type';
import { useRouter } from 'next/navigation';

export default function Menu() {
  const [data, setData] = useState<Beer[] | null>(null);
  const router = useRouter();

  const fetchBeers = async () => {
    try {
      const response = await fetch('http://localhost:3001/beers');
      const json = await response.json();
      setData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (beerId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/beers/${beerId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(`Beer ${beerId} has been deleted.`);
        fetchBeers(); // Refresh the beer list
      } else {
        alert('Failed to delete the beer.');
      }
    } catch (error) {
      console.error('Error deleting beer:', error);
      alert('An error occurred while deleting the beer.');
    }
  };

  const handleEdit = (beerId: number) => {
    router.push(`/backoffice/menu/edit?id=${beerId}`);
  };

  const handleAdd = () => {
    router.push('/backoffice/menu/add');
  };

  useEffect(() => {
    fetchBeers();
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center text-white p-6 relative">
      {/* Titre */}
      <h1 className="text-3xl font-bold mb-8 animate-fade-in">
        Menu Management
      </h1>

      {/* Liste des bières */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {data &&
          data.map((beer: Beer) => (
            <div
              key={beer.id}
              className="w-full border border-gray-200 rounded-lg p-4 bg-gray-100 shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
            >
              <img
                src={beer.urlImg}
                alt={beer.name}
                className="w-full h-56 object-cover mb-4 rounded"
              />
              <div className="beer-info text-gray-800">
                <h2 className="text-lg font-bold">{beer.name}</h2>
                <p className="text-sm text-gray-600">{beer.description}</p>
                <p className="text-lg font-semibold mt-2">{beer.price} €</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleEdit(beer.id)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(beer.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Bouton Add Beer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-lg"
        >
          Add Beer
        </button>
      </div>
    </div>
  );
}
