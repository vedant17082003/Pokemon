import React, { useEffect, useState, ChangeEvent } from 'react';
import { ThreeDCardDemo } from './components/ui/test';

interface Pokemon {
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
}

const Home: React.FC = () => {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=24";
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    const fetchPoki = async () => {
        try {
            const res = await fetch(API);
            if (!res.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await res.json();
            const DetailPokiData = data.results.map(async (curPoki: { url: string }) => {
                const res = await fetch(curPoki.url);
                if (!res.ok) {
                    throw new Error('Network response was not ok.');
                }
                const data = await res.json();
                return data;
            });
            const detailedResponse = await Promise.all(DetailPokiData);
            setPokemon(detailedResponse as Pokemon[]);
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
            setError(error.message || 'An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPoki();
    }, []);

    // Search filtering
    const searchData = pokemon.filter((currpokemon) =>
        currpokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h1 className="text-lg font-bold">Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h1 className="text-lg font-bold text-red-500">{error}</h1>
            </div>
        );
    }

    return (
        <>
            <div className='p-2'>
                <nav className='flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800'>
                    <div>
                        <img src='logo.png' alt='pokemon' className="w-48" />
                    </div>
                    <div className='text-black dark:text-white'>
                        <input
                            type="text"
                            value={search}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400"
                            placeholder="Search Pokémon..."
                        />
                    </div>
                </nav>
            </div>
            <div className='p-6 overflow-x-auto'>
                <div className='max-w-screen-xl mx-auto px-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                        {searchData.map((curPoki) => (
                            <ThreeDCardDemo key={curPoki.id} pokemonData={curPoki} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
