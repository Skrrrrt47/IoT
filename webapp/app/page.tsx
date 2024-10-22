"use client";
import { useEffect,useState } from "react";
import { Beer } from "./types/type";

export default function Home() {
  const [data, setData] = useState<Beer[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
        const json = await response.json();
        setData(json);
        console.log(json);
      }
      catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {data && data.map((beer : Beer) => (
        <div key={beer.id}>
          <h2>{beer.name}</h2>
          <p>{beer.description}</p>
          <p>{beer.price}</p>
          <img src={beer.image} alt={beer.name} />
        </div>
      ))}
    </div>
  );
}
