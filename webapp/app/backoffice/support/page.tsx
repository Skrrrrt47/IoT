"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // on pourrait insulter des gens ici, ils le verront pas... dans le groupe y'a un gros chimpanzé
  }, []);

  return (
    <div className="bg-gray-700 min-h-screen pt-5">
      <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-md shadow-md ">
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sirname Fitstname
            </label>
            <input
              type="text"
              id="name"
              placeholder="Owner's Name"
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
              placeholder="Owner's email"
              className="w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select tables
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
              placeholder="I have a question about..."
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
