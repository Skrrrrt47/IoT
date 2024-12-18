"use client";

import { useEffect, useState } from "react";
import { Beer } from "../types/type";
import { useRouter } from "next/navigation";
import BeerCard from "./BeerCard";

interface Beer_CommandProps {
  tableId: string;
}

function Beer_Command({ tableId }: Beer_CommandProps): JSX.Element {
  const [data, setData] = useState<Beer[] | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const router = useRouter();

  // Handle quantity change
  const handleQuantityChange = (beerId: number, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [beerId]: value,
    }));
  };

  // Handle order submission
  const handleOrder = async (beerId: number, price: number) => {
    const quantity = quantities[beerId] || 1;

    const response = await fetch("http://localhost:3001/commands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/beers");
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
      <h1 className="text-3xl font-bold text-white mb-6">Beer Command</h1>
      <div className="flex flex-wrap justify-center gap-6 p-6 w-full max-w-6xl">
        {data &&
          data.map((beer) => (
            <BeerCard
              key={beer.id}
              beer={beer}
              quantity={quantities[beer.id] || 1}
              onQuantityChange={handleQuantityChange}
              onOrder={handleOrder}
            />
          ))}
      </div>
    </div>
  );
}

export default Beer_Command;
