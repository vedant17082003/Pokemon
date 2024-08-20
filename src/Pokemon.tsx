import React from 'react';
import { useLocation } from 'react-router-dom';
import { CardContainer, CardBody, CardItem } from './components/ui/3d-card';

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
}

const Pokemon = () => {
    const location = useLocation();
    const pokemonData: Pokemon = location.state.pokemonData;

    if (!pokemonData) return <div>No Pokémon data available</div>;

    return (
        <CardContainer className="inter-var w-full max-w-sm mx-auto">
            <CardBody className="bg-gray-50 relative dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem
                    translateZ={50}
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                    {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
                </CardItem>
                <CardItem
                    translateZ={60}
                    className="px-4 py-2 rounded-xl bg-black dark:bg-yellow-400 dark:text-black text-white text-xs font-bold mt-2"
                >
                    {pokemonData.types.map(curType => curType.type.name).join(", ")}
                </CardItem>
                <CardItem translateZ={100} className="w-full h-full mt-4 overflow-hidden">
                    <img
                        src={pokemonData.sprites.other.dream_world.front_default}
                        height="100"
                        width="100"
                        className="w-80 h-80 object-cover"
                        alt={pokemonData.name}
                    />
                </CardItem>

                <div className="flex justify-between items-center mt-20">
                    <CardItem className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white">
                        Height: {pokemonData.height}
                    </CardItem>
                    <CardItem className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white">
                        Weight: {pokemonData.weight}
                    </CardItem>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <CardItem className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white">
                        Speed: {pokemonData.stats[1]?.base_stat}
                    </CardItem>
                    <CardItem className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white">
                        Abilities: {pokemonData.abilities.map((abilityInfo) => abilityInfo.ability.name).join(", ")}
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}

export default Pokemon;
