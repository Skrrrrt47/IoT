"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditBeer() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [price, setPrice] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const beerId = searchParams.get("id"); // Extract beer ID from URL

  useEffect(() => {
    // Fetch beer data to populate the form
    const fetchBeer = async () => {
      try {
        const response = await fetch(`http://localhost:3001/beers/${beerId}`);
        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setType(data.type);
          setDescription(data.description);
          setUrlImg(data.urlImg);
          setPrice(data.price);
        } else {
          alert("Failed to fetch beer data.");
        }
      } catch (error) {
        console.error("Error fetching beer data:", error);
      }
    };

    if (beerId) {
      fetchBeer();
    }
  }, [beerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedBeer = {
      name,
      type,
      description,
      urlImg,
      price,
    };

    try {
      const response = await fetch(`http://localhost:3001/beers/${beerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBeer),
      });

      if (response.ok) {
        alert("Beer successfully updated!");
        router.push("/backoffice/menu"); // Redirect to the menu page
      } else {
        alert("Failed to update beer.");
      }
    } catch (error) {
      console.error("Error updating beer:", error);
      alert("An error occurred while updating the beer.");
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center text-white p-6">
      <h1 className="text-3xl font-bold mb-8 animate-fade-in">Edit Beer</h1>
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded-lg shadow-lg w-full md:w-1/2"
        >
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type Field */}
          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-800 font-semibold mb-2">
              Type
            </label>
            <input
              id="type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-800 font-semibold mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image URL Field */}
          <div className="mb-4">
            <label htmlFor="urlImg" className="block text-gray-800 font-semibold mb-2">
              Image URL
            </label>
            <input
              id="urlImg"
              type="url"
              value={urlImg}
              onChange={(e) => setUrlImg(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price Field */}
          <div className="mb-6">
            <label htmlFor="price" className="block text-gray-800 font-semibold mb-2">
              Price (€)
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Beer Preview */}
        <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Preview</h2>
          {urlImg && (
            <img
              src={urlImg}
              alt={name}
              className="w-full h-56 object-cover mb-4 rounded"
            />
          )}
          <h3 className="text-lg font-bold text-gray-800">{name || "Name"}</h3>
          <p className="text-sm text-gray-600 italic">{type || "Type"}</p>
          <p className="text-sm text-gray-600 mt-2">{description || "Description"}</p>
          <p className="text-lg font-semibold text-gray-800 mt-4">
            {price ? `${price} €` : "Price"}
          </p>
        </div>
      </div>
    </div>
  );
}
