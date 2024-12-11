"use client";
import React, { use } from 'react'
import { useSearchParams } from "next/navigation";
import StatBox from '@/app/components/StatBox';
import { Beer, Command } from '@/app/types/type';
import { useState,useEffect } from 'react';


function TableDetails() {

    const searchParams = useSearchParams();
    const tableId = searchParams.get("tableId");
    const [commands, setCommands] = useState<Command[] | null>(null);

    const [total, setTotal] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [popularBeer, setPopularBeer] = useState<Beer | null>(null);

    function getMostFrequentBeerId(commands: Command[]): number | null {
        const beerCounts: Record<number, number> = {};
        for (const command of commands) {
          beerCounts[command.beerId] = (beerCounts[command.beerId] || 0) + 1;
        }
        let maxCount = 0;
        let mostFrequentBeerId: number | null = null;
      
        for (const [beerId, count] of Object.entries(beerCounts)) {
          if (count > maxCount) {
            maxCount = count;
            mostFrequentBeerId = Number(beerId);
          }
        }
      
        return mostFrequentBeerId;
    }


    useEffect(() => {
        const fetchCommands = async () => {
            try {
                const response = await fetch(`http://localhost:3001/commands/`);
                const data = await response.json();
                const filteredData = data.filter((command: Command) => command.tableId === parseInt(tableId!));
                setCommands(filteredData);
            } catch (error) {
                console.error("Error fetching commands:", error);
            }
        };
        fetchCommands();
    }, [tableId]);

    useEffect(() => {
        if (commands) {
            console.log(commands);
            const total = commands.reduce((acc, command) => acc + command.price, 0);
            setTotal(total);
            const capacity = commands.reduce((acc, command) => acc + command.nbBeers, 0);
            setCapacity(capacity);
            const mostFrequentBeerId = getMostFrequentBeerId(commands);
            if (mostFrequentBeerId) {
                const fetchPopularBeer = async () => {

                    const response = await fetch(`http://localhost:3001/beers/${mostFrequentBeerId}`);
                    const data = await response.json();
                    setPopularBeer(data);
                }
                fetchPopularBeer();
            }
        }
    },[commands]);

  return (
    <div className='min-h-screen flex flex-col justify-start items-center bg-gray-700'>
        <h1 className='text-2xl font-bold mb-4 text-white'>Table Details n°{tableId}</h1>
        <div className='flex flex-row gap-10'>
        <StatBox icon={"/circle.svg"} title='CA Total' value={total} />
        <StatBox icon={"/circle.svg"} title='Numbers of beer served' value={capacity} />
        <StatBox icon={"/circle.svg"} title='Most Popular Beer' value={popularBeer?.name ?? ""} />
        </div>
    </div>
  )
}

export default TableDetails