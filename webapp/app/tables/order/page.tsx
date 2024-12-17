"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Command, Beer } from "@/app/types/type";
import { useRouter } from "next/navigation";

export default function OrderPayment() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");
  const [orderDetails, setOrderDetails] = useState<Command | null>(null);
  const [beerDetails, setBeerDetails] = useState<Beer | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (orderId) {
      const fetchOrderDetails = async () => {
        try {
          const response = await fetch(`http://localhost:3001/commands/${orderId}`);
          const data = await response.json();
          setOrderDetails(data);
        } catch (error) {
          console.error("Error fetching order details:", error);
        }
      };
      fetchOrderDetails();
    }
  }, [orderId]);

  useEffect(() => {
    if (orderDetails?.beerId) {
      const fetchBeerDetails = async () => {
        try {
          const response = await fetch(`http://localhost:3001/beers/${orderDetails.beerId}`);
          const data = await response.json();
          console.log(data);
          setBeerDetails(data);
        } catch (error) {
          console.error("Error fetching beer details:", error);
        }
      };
      fetchBeerDetails();
    }
  }, [orderDetails]);

  const handlePayment = async () => {
    // add payment logic here

    router.push("/tables/order/done?tableId=" + orderDetails?.tableId);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-black">Order Payment</h1>

        {orderDetails && beerDetails ? (
          <div className="flex gap-4">
            {/* Left Section - Order Details */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-black">Table ID: {orderDetails.tableId}</h2>
              <h2 className="text-lg font-semibold text-black">Order ID: {orderId}</h2>
              <ul className="my-4 border-t border-gray-200 pt-4">
                <li className="flex flex-col text-gray-700 gap-2">
                  <strong><span className="">Beer: {beerDetails.name}</span></strong>
                  <strong><span>Quantity: {orderDetails.nbBeers}</span></strong>
                  <strong><span>Price per unit: {beerDetails.price}</span></strong>
                </li>
              </ul>
              <div className="text-lg font-bold mb-4 text-black">
                Total: {orderDetails.price} €
              </div>

              {/* Payment Section */}
              <div>
                <button
                  onClick={handlePayment}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                >
                  Pay Now
                </button>
              </div>
            </div>

            {/* Right Section - Beer Image */}
            <div className="flex-1 flex items-center justify-center">
              {beerDetails.urlImg ? (
                <img
                  src={beerDetails.urlImg}
                  alt={beerDetails.name}
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              ) : (
                <p className="text-gray-500 text-center">No image available</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-white">Loading order details...</p>
        )}
      </div>
    </div>
  );
}