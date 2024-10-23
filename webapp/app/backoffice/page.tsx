"use client";
import { useEffect, useState } from "react";
import { Beer, Command } from "../types/type";
import { comma } from "postcss/lib/list";

export default function Home() {
  const [data, setData] = useState<Command[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/backoffice");
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
            <h2>{command.nb_beers}</h2>
            <p>{command.beer_id}</p>
            <p>{command.price}</p>
          </div>
        ))}
    </div>
  );
}
