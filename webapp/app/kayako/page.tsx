"use client";
import { useEffect, useState } from "react";
import { Table } from "../types/type";

export default function Dashboard() {
  const [tables, setTables] = useState<Table[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/tables");
        const json = await response.json();
        setTables(json);
      } catch (error) {
        console.error("Failed to fetch tables:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables && tables.map((table: Table) => (
          <div key={table.id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-black mb-2">Table {table.id}</h2>
            <p className="text-gray-700 mb-4">Status: {table.status ? "Occupied" : "Available"}</p>
            <p className="text-gray-700 mb-4">Capacity: {table.capacity}L</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300">
              View Table
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
