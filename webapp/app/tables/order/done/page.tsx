"use client";
import { useEffect, useState } from "react";

export default function FillBeer() {
  const [filling, setFilling] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setFilling(true);
    const timer = setTimeout(() => {
      setLoaded(true);
      setFilling(false);
    }, 10 * 1000); // 4 seconds for beer to fill

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 font-sans">
      <div className="relative w-1/6 border-4 border-black  rounded-4xl h-80 bg-white shadow-lg">
        {/* Displaying the GIF animation */}
        <img
          src="/beer.gif" // Path to the GIF in the public folder
          alt="Filling beer"
          className={`absolute bottom-0 w-full transition-all duration-[8s] ease-in-out ${
            filling ? "h-full" : ""
          } ${loaded ? "h-full opacity-100" : ""}`}
        />
      </div>
      <div className="mt-6 text-xl font-semibold text-white">
        {filling ? "Filling..." : loaded ? "Enjoy your beer!" : "Waiting..."}
      </div>
    </div>
  );
}
