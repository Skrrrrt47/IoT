"use client";

import { useEffect, useState } from "react";
import { Beer } from "../types/type";
import { useRouter } from "next/navigation";

export default function Beer_Command({ tableId }: { tableId: string }) {
  const [data, setData] = useState<Beer[] | null>(null);
  const [gptResponse, setGptResponse] = useState<string | null>(null); // To store GPT response
  const [loading, setLoading] = useState<boolean>(false); // For loading state
  const router = useRouter();

  const [number, setNumber] = useState(1);

  async function handleOrder(beerId: number, price: number) {
    const response = await fetch("http://localhost:3001/commands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableId: parseInt(tableId),
        beerId: beerId,
        nbBeers: number,
        date: new Date().toISOString(),
        price: number * price,
      }),
    });
    const responseJson = await response.json();
    console.log(responseJson);
    router.push(`/tables/order?orderId=${responseJson.id}`);
  }

async function fetchGPTResponse(prompt: string) {
  setLoading(true);
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Remplacez par "gpt-4" si vous avez accès à GPT-4
        messages: [
          { role: "system", content: "You are a helpful assistant." }, // Contexte
          { role: "user", content: prompt }, // Message utilisateur
        ],
        temperature: 1,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorMessage}`);
    }

    const responseJson = await response.json();
    if (responseJson.choices && responseJson.choices.length > 0) {
      setGptResponse(responseJson.choices[0].message.content.trim());
    } else {
      throw new Error("No choices found in API response.");
    }
  } catch (error) {
    console.error("Error fetching GPT response:", error);
    setGptResponse("An error occurred while fetching the response.");
  } finally {
    setLoading(false);
  }
}

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
                  value={number}
                  onChange={(e) => setNumber(parseInt(e.target.value))}
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
