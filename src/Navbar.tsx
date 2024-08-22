import React, { ChangeEvent } from 'react';
import { AppBar, Toolbar, IconButton, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/material/Icon';

// Define the type for Navbar props
type NavbarProps = {
    search: string;
    setSearch: (value: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({ search, setSearch }) => {
    return (
        <AppBar position="static"
            sx={{ backgroundColor: 'black' }}
        >
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <img src='logo.png' alt='pokemon' style={{ width: 150 }} />
                </Typography>
                <TextField
                    value={search}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    variant="outlined"
                    placeholder="Search Pokémon..."
                    size="small"
                    sx={{ backgroundColor: 'grey' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end">
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
