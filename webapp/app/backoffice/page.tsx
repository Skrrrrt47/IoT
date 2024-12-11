"use client";
import { useEffect, useState } from "react";
import { Table } from "../types/type";
import CardTables from "../components/CardTables";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState<Table[] | null>(null);
  const router = useRouter();
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

  const handleClick = (id: number) => {
    router.push(`/backoffice/tables?tableId=${id}`);
  }

  return (
    <div className="min-h-screen flex flex-row items-center justify-center p-6 gap-6 bg-gray-800">
      {data && data.map((table: Table) => (
        <button key={table.id} onClick={() => handleClick(table.id)}>
          <CardTables  status={table.status} capacity={table.capacity} id={table.id} />
        </button>
      ))}
    </div>
  );
}
