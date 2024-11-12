"use client";
import { useEffect, useState } from "react";
import { Table } from "../../types/type";

import MaintenanceIcon from "../../icons/maintenance-icon.svg";
import InfoIcon from "../../icons/info-circle.svg";
import ChairIcon from "../../icons/chair-svgrepo-com.svg";
import PowerIcon from "../../icons/power-bank-svgrepo-com.svg";
import BeerIcon from "../../icons/beer-svgrepo-com.svg";

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

  let maintenance = "green";

  return (
    <div className="flex flex-col p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables && tables.map((table: Table) => (
          <div key={table.id} className="flex bg-white border border-gray-200 rounded-lg shadow-lg p-6 space-x-4">
            {/* Left rectangle with imported SVG icons */}
            <div className="flex flex-col items-center space-y-3 bg-gray-100 p-2 rounded-lg">
              <BeerIcon style={{ color: table.capacity > 80 ? 'green' : table.capacity > 50 ? 'yellow' : 'red' }} />
              <PowerIcon style={{ color: table.status ? 'green' : 'red' }} />
              <MaintenanceIcon style={{ color: maintenance === "green" ? 'green' : maintenance === "orange" ? 'orange' : 'red' }} />
              <ChairIcon className="text-gray-600" />
            </div>

            {/* Right rectangle with details */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-black">Table {table.id}</h2>
                <InfoIcon className="text-gray-500" />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                <p className="text-gray-700 mb-2">Status: {table.status ? "Occupied" : "Available"}</p>
                <p className="text-gray-700 mb-2">Capacity: {table.capacity}L</p>
                <p className="text-gray-700 mb-2">Maintenance Status: {maintenance}</p>
                <p className="text-gray-700 mb-2">Fill Level: {table.capacity}%</p>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300">
                  View Table
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
