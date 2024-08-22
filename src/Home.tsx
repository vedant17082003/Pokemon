import React, { useState, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LinearProgress } from '@mui/material';
import Navbar from './Navbar';
import { ThreeDCardDemo } from './components/ui/test';

// Define the Pokemon type
type Pokemon = {
    id: number;
    name: string;
    types: { type: { name: string } }[];
    height: number;
    weight: number;
    stats: { base_stat: number }[];
    abilities: { ability: { name: string } }[];
    sprites: {
        other: {
            dream_world: {
                front_default: string;
            };
        };
    };
};

// Fetch Pokémon data from the API
const getPokemon = async (): Promise<Pokemon[]> => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=24");
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
            const res = await fetch(pokemon.url);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return await res.json();
        })
    );
    return detailedPokemons;
};

function Home() {
    const { isLoading, isError, data, error } = useQuery<Pokemon[]>({
        queryKey: ['currpokemon'],
        queryFn: getPokemon,
    });

    const [search, setSearch] = useState<string>("");

    // Filter Pokémon based on search input
    const filteredData = data?.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LinearProgress />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h1 className="text-lg font-bold text-red-500">{(error as Error).message}</h1>
            </div>
        );
    }

    return (
        <>
            <div className='p-2'>
                <Navbar search={search} setSearch={setSearch} />
            </div>
            <div className='p-6 overflow-x-auto'>
                <div className='max-w-screen-xl mx-auto px-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                        {filteredData?.map((curPoki) => (
                            <ThreeDCardDemo key={curPoki.id} pokemonData={curPoki} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
