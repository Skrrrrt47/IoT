"use client";
import './Dashboard.css';
import { useEffect, useState } from "react";
import { Table } from "../types/type";

export default function Dashboard() {
  const [tables, setTables] = useState<Table[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001//tables");
        const json = await response.json();
        setTables(json);
      } catch (error) {
        console.error("Failed to fetch tables:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="grid">
        {tables &&
          tables.map((table: Table) => (
            <div key={table.id} className="card">
              <h2>Table {table.id}</h2>
              <p className={`status ${table.status ? "occupied" : "available"}`}>
                Status: {table.status ? "Occupied" : "Available"}
              </p>
              <p>Capacity: {table.capacity}L</p>
              <button className="btn">View Table</button>
            </div>
          ))}
      </div>
    </div>
  );
}
