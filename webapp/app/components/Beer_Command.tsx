'use client';

import { useEffect, useState } from 'react';
import { Beer } from '../types/type';
import { useRouter } from 'next/navigation';

export default function Beer_Command({ tableId }: { tableId: string }) {
  const [data, setData] = useState<Beer[] | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({}); // Map beer ID to quantity
  const router = useRouter();

  const handleClickBack = () => {
    router.push('/'); // Redirection vers la page d'accueil ou une autre page
  };

  async function checkIfTableLock(tableId: string) {
    const response = await fetch(`http://localhost:3001/tables/${tableId}`);
    const data = await response.json();
    return data.status;
  }

  async function handleOrder(beerId: number, price: number) {
    const status = await checkIfTableLock(tableId);
    if (!status) {
      alert('Table is locked. You cannot order something now.');
      return;
    }
    const quantity = quantities[beerId] || 1; // Default to 1 if no quantity is set
    const response = await fetch('http://localhost:3001/commands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tableId: parseInt(tableId),
        beerId: beerId,
        nbBeers: quantity,
        date: new Date().toISOString(),
        price: quantity * price,
      }),
    });
    const responseJson = await response.json();
    console.log(responseJson);
    router.push(`/tables/order?orderId=${responseJson.id}`);
  }

  const handleQuantityChange = (beerId: number, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [beerId]: newQuantity,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/beers');
        const json = await response.json();
        setData(json);
        console.log(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-800">
      {/* Bouton Retour */}
      <div className="absolute top-6 left-6">
        <button
          onClick={handleClickBack}
          className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300 shadow-md"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-3xl font-bold text-white mb-6 pt-8">Beer Command</h1>
      <div className="flex flex-wrap justify-center gap-6 p-6 w-full max-w-6xl">
        {data &&
          data.map((beer: Beer) => (
            <div
              key={beer.id}
              className="w-80 border border-gray-200 rounded-lg p-4 bg-white shadow-lg"
            >
              <img
                src={beer.urlImg}
                alt={beer.name}
                className="w-full h-56 object-cover mb-4"
              />
              <div className="beer-info text-black">
                <h2 className="text-lg font-bold">{beer.name}</h2>
                <p className="text-sm">{beer.description}</p>
                <p className="text-lg font-semibold mt-2">{beer.price} €</p>
                <select
                  value={quantities[beer.id] || 1} // Default to 1 if not set
                  onChange={(e) =>
                    handleQuantityChange(beer.id, parseInt(e.target.value))
                  }
                  className="mt-4 w-full border border-gray-200 rounded-lg p-2"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button
                  onClick={() => handleOrder(beer.id, beer.price)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                >
                  Command
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
