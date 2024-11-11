"use client";
import { useEffect, useState } from "react";
import { Beer } from "./types/type";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const [data, setData] = useState<Beer[] | null>(null);
  const { isSignedIn, user, isLoaded } = useUser()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
        const json = await response.json();
        setData(json);
        console.log(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    console.log(user);
  }, []);

  if (!isLoaded || !user) return <p>Loading...</p>;

  const userRole = user.publicMetadata.role;

  return (
    <>
      {userRole  === "client" ? (
        <div className="flex flex-wrap justify-center gap-6 p-6">
          {data && data.map((beer: Beer) => (
            <div key={beer.id} className="w-80 border border-gray-200 rounded-lg p-4 bg-white shadow-lg">
              <img src={beer.image} alt={beer.name} className="w-full h-auto mb-4" />
              <div className="beer-info text-black">
                <h2 className="text-lg font-bold">{beer.name}</h2>
                <p className="text-sm">{beer.description}</p>
                <p className="text-lg font-semibold mt-2">{beer.price} €</p>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300">
                  Commander
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : 
      <>
        {redirect("/backoffice")}
      </>}
    </>
  );
}
