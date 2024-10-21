"use client";
import { useEffect,useState } from "react";

export default function Home() {
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/");
      const json = await response.json();
      setData(json.message);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {data}
    </div>
  );
}
