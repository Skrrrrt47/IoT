"use client";
import { Table } from "./types/type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function TableList() {
  const router = useRouter();
  const [tables, setTables] = useState<Table[]>([]);

  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        // Fetch the tables
        const response = await fetch("http://localhost:3001/tables");
        const json = await response.json();
        console.log(json);
        setTables(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTables();
  }, []); // Run only once when the component mounts

  // Wait for the user data to load
  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  // Handle user not signed in
  if (!user) {
    return <p>User not found. Please sign in.</p>;
  }

  const userRole = user.publicMetadata.role;

  // Redirect if userRole is not "client"

  const handleTableClick = (tableId: number) => {
    router.push(`/tables?tableId=${tableId}`);
  };

  return (
    <div className="min-h-screen flex flex-row items-center justify-center p-6 gap-6 bg-gray-800">
      {tables && tables.map((table: Table) => (
        <div key={table.id} className="w-80 border border-gray-200 rounded-lg p-4 bg-white shadow-lg">
          <div className="beer-info text-black">
            <h2 className="text-lg font-bold">{table.id}</h2>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
              onClick={() => handleTableClick(table.id)}
            >
              Use
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
