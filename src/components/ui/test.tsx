import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardContainer, CardBody, CardItem } from './3d-card';
import { Button } from '@mui/material';

function capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

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

type ThreeDCardDemoProps = {
    pokemonData: Pokemon;
}

export function ThreeDCardDemo({ pokemonData }: ThreeDCardDemoProps) {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(`/pokemon/${pokemonData.id}`, { state: { pokemonData } });
    }

    return (
        <CardContainer className="inter-var w-full max-w-sm mx-auto">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem
                    translateZ={50}
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                    {capitalizeFirstLetter(pokemonData.name)}
                </CardItem>
                <CardItem
                    as="button"
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
                        className="w-80 h-80 object-cover group-hover/card:shadow-x"
                        alt={pokemonData.name}
                    />
                </CardItem>

                <div className='flex justify-center mt-4'>
                    <Button variant='contained'
                        color='secondary'
                        onClick={handleButtonClick}
                        className="px-4 py-2"
                    >
                        Click Me!
                    </Button>
                </div>
            </CardBody>
        </CardContainer>
    );
}
