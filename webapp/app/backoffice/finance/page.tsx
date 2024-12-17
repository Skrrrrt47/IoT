"use client";
import React from "react";
import StatBox from "@/app/components/StatBox";
import { Beer, Command } from "@/app/types/type";
import { useState, useEffect } from "react";

function TableDetails() {
  const [commands, setCommands] = useState<Command[] | null>(null);

  const [total, setTotal] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [popularBeer, setPopularBeer] = useState<Beer | null>(null);
  const [nbTables, setNbTables] = useState(0);
  const [nbAvailableTables, setNbAvailableTables] = useState(0);

  function getMostFrequentBeerId(commands: Command[]): number | null {
    const beerCounts: Record<number, number> = {};
    for (const command of commands) {
      beerCounts[command.beerId] = (beerCounts[command.beerId] || 0) + 1;
    }
    let maxCount = 0;
    let mostFrequentBeerId: number | null = null;

    for (const [beerId, count] of Object.entries(beerCounts)) {
      if (count > maxCount) {
        maxCount = count;
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
        setCommands(data);
      } catch (error) {
        console.error("Error fetching commands:", error);
      }
    };
    fetchCommands();
  }, []);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch(`http://localhost:3001/tables/count`);
        const data = await response.json();
        setNbTables(data.count);
        const responseAvailable = await fetch(`http://localhost:3001/tables`);
        const tables = await responseAvailable.json();
        const availableTables = tables.filter(
          (table: { status: boolean }) => table.status
        ).length;
        setNbAvailableTables(availableTables);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };
    fetchTables();
  }, []);

  useEffect(() => {
    if (commands) {
      const total = commands.reduce((acc, command) => acc + command.price, 0);
      setTotal(total);
      const capacity = commands.reduce(
        (acc, command) => acc + command.nbBeers,
        0
      );
      setCapacity(capacity);
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

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-800 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-8 animate-fade-in">All Tables Overview</h1>
      <div className="flex items-center gap-6 w-full max-w-6xl">
        {/* Left navigation arrow */}

        {/* StatBoxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <StatBox icon={"/circle.svg"} title="Growth Revenue" value={total + " €"} />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <StatBox icon={"/circle.svg"} title="Beer Served" value={capacity} />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <StatBox
              icon={"/circle.svg"}
              title="Most Popular Beer"
              value={popularBeer?.name ?? ""}
            />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <StatBox
              icon={"/circle.svg"}
              title="Operational Tables"
              value={nbTables ? nbAvailableTables + "/" + nbTables : ""}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default TableDetails;
