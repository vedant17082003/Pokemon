import React from 'react';
import { MouseEnterProvider } from './3d-card';
import { CardContainer, CardBody, CardItem } from './3d-card';

function capitalizeFirstLetter(str) {
    if (!str);
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export function ThreeDCardDemo({ pokemonData }) {
    return (
        <MouseEnterProvider>
            <CardContainer className="inter-var w-full max-w-sm mx-auto">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                    <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                        {capitalizeFirstLetter(pokemonData.name)}
                    </CardItem>
                    <CardItem
                        as="button"
                        translateZ="60"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-yellow-400 dark:text-black text-white text-xs font-bold mt-2"
                    >
                        {pokemonData.types.map(curType => curType.type.name).join(", ")}

                    </CardItem>
                    <CardItem translateZ="100" className="w-full h-full mt-4 overflow-hidden ">
                        <img
                            src={pokemonData.sprites.other.dream_world.front_default}  // Use Pokémon image here
                            height="100"
                            width="100"
                            className="w-80 h-80 object-cover  group-hover/card:shadow-x"

                            alt={pokemonData.name}
                        />
                    </CardItem>
                    <div className="flex justify-between items-center mt-20">
                        <CardItem className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white"
                        >
                            <span>Height: {pokemonData.height} </span>
                        </CardItem>
                        <CardItem className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white"
                        >
                            Weight: {pokemonData.weight}
                        </CardItem>

                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <CardItem className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white"
                        >
                            Speed: {pokemonData.stats[1].base_stat}
                        </CardItem>
                        <CardItem className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white"
                        >
                            <p>
                                Abillities: {pokemonData.abilities
                                    .map((abilityInfo) => abilityInfo.ability.name)
                                    .slice(0, 1)
                                    .join(", ")}
                            </p>

                        </CardItem>

                    </div>
                </CardBody>
            </CardContainer>
        </MouseEnterProvider>
    );
}
