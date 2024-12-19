"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StatBox from "@/app/components/StatBox";
import { Beer, Command } from "@/app/types/type";
import { useState, useEffect } from "react";

function TableDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tableId = searchParams.get("tableId");
  const [commands, setCommands] = useState<Command[] | null>(null);

  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState(0);
  const [popularBeer, setPopularBeer] = useState<Beer | null>(null);
  const [capacity, setCapacity] = useState(0);

  function getMostFrequentBeerId(commands: Command[]): number | null {
    const beerCounts: Record<number, number> = {};
    for (const command of commands) {
      beerCounts[command.beerId] = (beerCounts[command.beerId] || 0) + 1;
    }
    let maxCount = 0;
    let mostFrequentBeerId: number | null = null;

    for (const [beerId, count] of Object.entries(beerCounts)) {
      if (count > maxCount) {
        maxCount = Number(beerId);
        mostFrequentBeerId = Number(beerId);
      }
    }

    return mostFrequentBeerId;
  }

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch(`http://localhost:3001/commands/`);
        const data = await response.json();
        const filteredData = data.filter(
          (command: Command) => command.tableId === parseInt(tableId!)
        );
        setCommands(filteredData);
      } catch (error) {
        console.error("Error fetching commands:", error);
      }
    };
    fetchCommands();
  }, [tableId]);

  useEffect(() => {
    const fetchTableDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/tables/${tableId}`);
        const data = await response.json();
        setCapacity(data.capacity);
      } catch (error) {
        console.error("Error fetching table details:", error);
      }
    };
    fetchTableDetails();
  }, [tableId]);

  useEffect(() => {
    if (commands) {
      const totalAmount = commands.reduce(
        (acc, command) => acc + command.price,
        0
      );
      setTotal(totalAmount);

      const totalOrders = commands.reduce(
        (acc, command) => acc + command.nbBeers,
        0
      );
      setOrders(totalOrders);

      const mostFrequentBeerId = getMostFrequentBeerId(commands);
      if (mostFrequentBeerId) {
        const fetchPopularBeer = async () => {
          const response = await fetch(
            `http://localhost:3001/beers/${mostFrequentBeerId}`
          );
          const data = await response.json();
          setPopularBeer(data);
        };
        fetchPopularBeer();
      }
    }
  }, [commands]);

  const navigateToTable = (direction: "prev" | "next") => {
    const newTableId =
      direction === "prev" ? parseInt(tableId!) - 1 : parseInt(tableId!) + 1;
    if (newTableId < 1) {
      return;
    }
    router.push(`/backoffice/tables?tableId=${newTableId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-800 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-8 animate-fade-in text-white">
        Table Details n°{tableId}
      </h1>
      <div className="flex items-center gap-6 w-full max-w-6xl">
        {/* Flèche pour la table précédente */}
        <button
          className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-110"
          onClick={() => navigateToTable("prev")}
        >
          <img
            src="/arrow-bar-left-svgrepo-com.svg"
            alt="Previous Table"
            className="w-6 h-6"
          />
        </button>

        {/* StatBoxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <StatBox
              icon="/circle.svg"
              title="Table revenue"
              value={total + " €"}
            />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <StatBox icon="/circle.svg" title="Beer served" value={orders} />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <StatBox
              icon="/circle.svg"
              title="Most popular beer"
              value={popularBeer?.name ?? ""}
            />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <StatBox
              icon="/circle.svg"
              title="Table reserves"
              value={(capacity ? (capacity / 20) * 100 : "0") + "%"}
            />
          </div>
        </div>

        {/* Flèche pour la table suivante */}
        <button
          className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-110"
          onClick={() => navigateToTable("next")}
        >
          <img
            src="/arrow-right-line.svg"
            alt="Next Table"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
}

export default TableDetails;
