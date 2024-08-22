import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const CustomCard = styled(Card)(({ theme }) => ({
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    overflow: 'hidden',
    maxWidth: 500,
    width: '100%',
    height: 'auto',
    margin: '16px 8px',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[10],
    },
}));

const ImageWrapper = styled('div')({
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
    width: '100%',
});

const capitalizeFirstLetter = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ThreeDCardDemo({ pokemonData }: ThreeDCardDemoProps) {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(`/pokemon/${pokemonData.id}`, { state: { pokemonData } });
    }

    return (
        <CustomCard className="inter-var mx-auto">
            <CardContent className="bg-gray-50 dark:bg-black dark:border-white/[0.2] p-4">
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 'bold', mb: 2 }} // Remove color from sx
                    className="text-2xl font-bold text-white" // Ensure text color is white
                >
                    {capitalizeFirstLetter(pokemonData.name)}
                </Typography>
                <Chip
                    label={pokemonData.types.map(curType => curType.type.name).join(", ")}
                    color="secondary"
                    sx={{ mb: 2 }}
                    className="px-4 py-2 rounded-xl bg-black dark:bg-yellow-400 dark:text-black text-white text-xs font-bold"
                />
                <ImageWrapper>
                    <CardMedia
                        component="img"
                        image={pokemonData.sprites.other.dream_world.front_default}
                        alt={pokemonData.name}
                        sx={{ objectFit: 'cover', height: '100%', width: '100%' }}
                    />
                </ImageWrapper>

                <div className='flex justify-center mt-4'>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={handleButtonClick}
                        className="px-4 py-2"
                    >
                        Click Me!
                    </Button>
                </div>
            </CardContent>
        </CustomCard>
    );
}
