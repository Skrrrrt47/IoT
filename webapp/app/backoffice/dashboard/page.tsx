"use client";
import { useEffect, useState } from "react";
import { Table } from "../../types/type";

enum Colors {
  green = "#00FF00",
  red = "#FF0000",
  orange = "#FFA500",
  blue = "#0000FF",
  black = "#000000",
}



export default function Dashboard() {
  const [tables, setTables] = useState<Table[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/tables");
        const json = await response.json();
        setTables(json);
      } catch (error) {
        console.error("Failed to fetch tables:", error);
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status: boolean) => {
    switch (status) {
      case true:
        return Colors.green;
      case false:
        return Colors.red;
      default:
        return Colors.black;
    }
  }

  const getCapacityColor = (capacity: number) => {
    if (capacity >= 15) {
      return Colors.green;
    } else if (capacity >= 7) {
      return Colors.orange;
    } else {
      return Colors.red;
    }
  }


  return (
    <div className="flex flex-col p-1 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables && tables.map((table: Table) => (
          <div key={table.id} className="flex bg-white border border-gray-200 rounded-lg shadow-lg p-2 space-x-4">
            {/* Left rectangle with imported SVG icons */}
            <div className="flex flex-col items-center space-y-3 bg-gray-100 p-3 rounded-lg">
              <svg fill={Colors.blue} version="1.1" id="Capa_1" width="40px" height="40px" viewBox="0 0 32 32">
                <g>
	                <path d="M17.962,24.725l1.806,0.096v2.531h-7.534v-2.406l1.045-0.094c0.568-0.063,0.916-0.254,0.916-1.014v-8.801
		              c0-0.699-0.188-0.92-0.791-0.92l-1.106-0.062v-2.626h5.666L17.962,24.725L17.962,24.725z M15.747,4.648
		              c1.394,0,2.405,1.047,2.405,2.374c0,1.331-1.014,2.313-2.438,2.313c-1.454,0-2.404-0.982-2.404-2.313
		              C13.31,5.695,14.26,4.648,15.747,4.648z M16,32C7.178,32,0,24.822,0,16S7.178,0,16,0c8.82,0,16,7.178,16,16S24.82,32,16,32z M16,3
		              C8.832,3,3,8.832,3,16s5.832,13,13,13s13-5.832,13-13S23.168,3,16,3z"/>
                </g>
              </svg>
              4
              <svg fill={getCapacityColor(table.capacity)} width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" d="M6.94601 5.99192C7.19996 5.53918 7.66425 5.25 8.18182 5.25C8.70673 5.25 9.18659 5.54588 9.43679 5.99192L10.745 5.99192C10.9952 5.54589 11.4751 5.25 12 5.25C12.5322 5.25 13.0276 5.55237 13.2741 5.99192H14.5824C14.8363 5.53918 15.3006 5.25 15.8182 5.25C16.5874 5.25 17.25 5.89965 17.25 6.75C17.25 7.60035 16.5874 8.25 15.8182 8.25C15.3006 8.25 14.8363 7.96082 14.5824 7.50808H13.2741C13.0276 7.94763 12.5322 8.25 12 8.25C11.4751 8.25 10.9952 7.95411 10.745 7.50808H9.43679C9.18659 7.95412 8.70673 8.25 8.18182 8.25C7.66425 8.25 7.19996 7.96082 6.94601 7.50808C6.82205 7.2871 6.75 7.02893 6.75 6.75C6.75 6.47107 6.82205 6.2129 6.94601 5.99192ZM8.18182 3.75C7.08423 3.75 6.1383 4.36577 5.63777 5.25808C5.39044 5.69899 5.25 6.20929 5.25 6.75C5.25 7.29071 5.39044 7.80101 5.63777 8.24192C5.9002 8.70975 6.28505 9.10157 6.75 9.36847V19.8718L7.95341 21H16.0466L17.25 19.8718V18C18.4926 18 19.5 16.9926 19.5 15.75V12.75C19.5 11.5074 18.4926 10.5 17.25 10.5V9.36944C18.1508 8.85242 18.75 7.86384 18.75 6.75C18.75 5.11507 17.459 3.75 15.8182 3.75C15.0917 3.75 14.4317 4.01974 13.9233 4.46086C13.3994 4.0163 12.7199 3.75 12 3.75C11.2768 3.75 10.6071 4.01801 10.0909 4.46088C9.57475 4.01801 8.90503 3.75 8.18182 3.75ZM15.75 9.74921C15.0505 9.7329 14.4158 9.46642 13.9233 9.03914C13.3994 9.4837 12.7199 9.75 12 9.75C11.2768 9.75 10.6071 9.48199 10.0909 9.03912C9.59101 9.46804 8.94707 9.73294 8.25 9.74921V19.222L8.54659 19.5H15.4534L15.75 19.222V9.74921ZM18 12.75V15.75C18 16.1642 17.6642 16.5 17.25 16.5V12C17.6642 12 18 12.3358 18 12.75ZM9.75 17.25V11.25H11.25V17.25H9.75ZM12.75 11.25V17.25H14.25V11.25H12.75Z"/>
              </svg>
              <svg fill={Colors.black} height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <g>
	                <g>
		                <g>
			                <path d="M337.903,222.891v0.001c13.214,0,25.815,2.676,37.291,7.511V81.14C375.196,36.399,338.796,0,294.055,0h-76.11
				              c-44.741,0-81.141,36.399-81.141,81.14v149.262c11.477-4.835,24.077-7.511,37.291-7.511H337.903z"/>
			                <path d="M337.903,256.284H174.097c-34.724,0-62.974,28.25-62.974,62.974v72.474h25.681V512h33.391V391.731h171.609V512h33.391
				              V391.731h25.681v-72.474h0C400.877,284.534,372.627,256.284,337.903,256.284z"/>
		                </g>
	                </g>
                </g>
              </svg>
              <svg fill={getStatusColor(table.status)} width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 18V7.8C20 6.11984 20 5.27976 19.673 4.63803C19.3854 4.07354 18.9265 3.6146 18.362 3.32698C17.7202 3 16.8802 3 15.2 3H8.8C7.11984 3 6.27976 3 5.63803 3.32698C5.07354 3.6146 4.6146 4.07354 4.32698 4.63803C4 5.27976 4 6.11984 4 7.8V18M20 18C20 19.6569 18.6569 21 17 21H7C5.34315 21 4 19.6569 4 18M20 18C20 16.3431 18.6569 15 17 15H7C5.34315 15 4 16.3431 4 18M11.5 6.5L10.5 9H13.5L12.5 11.5M7 18H9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg fill={Colors.black} id="Layer_1" data-name="Layer 1" viewBox="0 0 105.01 122.88">
                <title>maintenance</title>
                <path d="M.59,97C-.88,102.74.45,109.21,4,114.77c4.54-23.64,32.37-13.59,18.08,8.11,12.37-1,19.05-10.55,18.79-22.31-.12-5.54,0-8.55.87-11.07a13.16,13.16,0,0,1,1.67-3.21,11.5,11.5,0,0,1-.91-4.42v-.29a11.73,11.73,0,0,1,1.2-5l-7.43-7.23-2.06,2.73a53.12,53.12,0,0,1-6.66,6.63,18.68,18.68,0,0,1-4.59,2.07C13,84.19,3.65,85.11.59,97Zm58.16-21-44-42.84-6-1.06a3.65,3.65,0,0,1-1.9-1l-5.11-5a3.65,3.65,0,0,1-.07-5.15l6.17-6.23a3.64,3.64,0,0,1,5.14,0l4.53,4.49a3.58,3.58,0,0,1,1,1.83l2,7.31L64,70.79l4.43-4.46a.7.7,0,0,1,1,0l2.89,2.86a.7.7,0,0,1,.21.45c.12.89.19,1.61.26,2.22.15,1.49.23,2.24.5,2.5s1,.3,2.45.4h0c.62,0,1.37.1,2.37.2a.67.67,0,0,1,.43.2l22.22,22.4A11.49,11.49,0,0,1,104.44,110a11.87,11.87,0,0,1-2.59,4.42,11,11,0,0,1-4.22,2.85c-3.75,1.39-8.44.66-12.87-3.81L63.53,92a.76.76,0,0,1-.21-.44c-.18-1.21-.29-2.19-.38-3-.19-1.61-.29-2.45-.61-2.76s-1.26-.37-3.14-.43c-.65,0-1.41,0-2.3-.09a.7.7,0,0,1-.46-.2l-2.84-2.81a.71.71,0,0,1,0-1l5.17-5.22ZM70.29,90.64a1.76,1.76,0,0,1,0-2.5,1.78,1.78,0,0,1,2.51,0L92,107.6a1.77,1.77,0,0,1-2.5,2.52L70.29,90.64Zm5.28-5.34a1.77,1.77,0,0,1,2.49-2.52l19.25,19.48a1.77,1.77,0,1,1-2.49,2.52L75.57,85.3ZM67,55.36l5.94-7.77c7.15-9.71,25.79-4,30.36-21.75,1.46-5.7.13-12.16-3.39-17.73C95.37,31.75,67.55,21.7,81.84,0,69.47,1,62.79,10.55,63.05,22.31c.12,5.16,1.57,9.37-3.32,15.91L54,45.83,64.5,56.06a11.47,11.47,0,0,1,2.5-.7Z"/>
              </svg>




            </div>

            {/* Right rectangle with details */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-black">Table {table.id}</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                <p className="text-gray-700 mb-2">Status: {table.status ? "Occupied" : "Available"}</p>
                <p className="text-gray-700 mb-2">Capacity: {table.capacity}L</p>
                <p className="text-gray-700 mb-2">Maintenance Status: 1</p>
                <p className="text-gray-700 mb-2">Fill Level: 60%</p>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300">
                  View Table
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    
      {/* Add Table Button */}
      <div className="flex justify-center mt-8">
        <button
          className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg hover:bg-blue-700 transition-colors duration-300"
          onClick={() => console.log("Add Table button clicked")}
        >
          +
        </button>
      </div>
    </div>
  );
}
