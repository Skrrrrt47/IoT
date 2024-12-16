"use client";
import { useEffect, useState } from "react";
import { Table } from "../types/type";
import CardTables from "../components/CardTables";

export default function Home() {
  const [data, setData] = useState<Table[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/tables");
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
    <div className="min-h-screen flex flex-col items-center bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold mb-8 animate-fade-in">Table Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {data &&
          data.map((table: Table) => (
            <div
              key={table.id}
              className="w-full rounded-lg transition-transform duration-300 hover:scale-105"
            >
              <CardTables
                status={table.status}
                capacity={table.capacity}
                id={table.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
