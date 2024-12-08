"use client";
import { useEffect, useState } from "react";
import { Beer, Command } from "../types/type";

export default function Home() {
  const [data, setData] = useState<Command[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/commands");
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
    <div>
      {data &&
        data.map((command: Command) => (
          <div key={command.id}>
            <h2>{command.nbBeers}</h2>
            <p>{command.beerId}</p>
            <p>{command.price}</p>
          </div>
        ))}
    </div>
  );
}
