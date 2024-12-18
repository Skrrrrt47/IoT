// BeerCard.tsx
import React from "react";

interface Beer {
  id: number;
  name: string;
  description: string;
  price: number;
  urlImg: string;
}

interface BeerCardProps {
  beer: Beer;
  quantity: number;
  onQuantityChange: (beerId: number, value: number) => void;
  onOrder: (beerId: number, beerPrice: number) => void;
}

const BeerCard: React.FC<BeerCardProps> = ({
  beer,
  quantity,
  onQuantityChange,
  onOrder,
}) => {
  return (
    <div className="w-80 border border-gray-200 rounded-lg p-4 bg-white shadow-lg">
      <img
        src={beer.urlImg}
        alt={beer.name}
        className="w-full h-56 object-cover mb-4"
      />
      <div className="beer-info text-black">
        <h2 className="text-lg font-bold">{beer.name}</h2>
        <p className="text-sm">{beer.description}</p>
        <p className="text-lg font-semibold mt-2">{beer.price} €</p>
        <select
          value={quantity}
          onChange={(e) => onQuantityChange(beer.id, parseInt(e.target.value))}
          className="mt-4 w-full border border-gray-200 rounded-lg p-2"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button
          onClick={() => onOrder(beer.id, beer.price)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
        >
          Command
        </button>
      </div>
    </div>
  );
};

export default BeerCard;
