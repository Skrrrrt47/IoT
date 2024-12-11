"use client";
import { useEffect, useState } from "react";
import { Beer, Command } from "../../types/type";
import { comma } from "postcss/lib/list";
import { div } from "framer-motion/client";

export default function Home() {
  const [data, setData] = useState<Command[] | null>(null);
  useEffect(() => {
    // on pourrait insulter des gens ici, ils le verront pas... dans le groupe y'a un gros chimpanzé
  }, []);

  return (
    <div className="bg-gray-700 min-h-screen pt-5">
      <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-md shadow-md ">
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom Prénom
            </label>
            <input
              type="text"
              id="name"
              placeholder="Prérémplir avec le Nom de la personne"
              className="w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Prérémplir avec les infos"
              className="w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sélectionner des tables
            </label>
            <input
              type="text"
              id="tables"
              className="w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Value"
              className="w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            ></textarea>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-gray-800  text-white py-2 rounded-md hover:bg-gray-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
