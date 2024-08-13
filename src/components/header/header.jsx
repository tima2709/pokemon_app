import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alpha, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Button, Container } from '@mui/material';
import { setPage } from '../../redux/slices/pokemonSlice';
import { search } from '../../redux/slices/searchSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { setTypesOfPokemon } from '../../redux/slices/typeSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const dispatch = useDispatch();
  const searchItem = useSelector((state) => state.search.searchQuery);
  const [value, setValue] = useState(searchItem);
  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch(setPage(1));
    dispatch(search(value));
    dispatch(setTypesOfPokemon([]));
    navigate('/');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    dispatch(setPage(1));
    dispatch(search(''));
    dispatch(setTypesOfPokemon([]));
    setValue('');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleClearSearch}
          >
            <CatchingPokemonIcon />
          </IconButton>
          <NavLink to={'/'} onClick={handleClearSearch}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block', color: 'white' } }}
            >
              Pokemon
            </Typography>
          </NavLink>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <IconButton onClick={handleClearSearch}>
              <CloseIcon />
            </IconButton>
          </Search>
          <Button
            variant="contained"
            disabled={value.length < 1}
            onClick={handleSearch}
          >
            Search
          </Button>
          <NavLink
            to={'/favorite-pokemons'}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <IconButton
              size="large"
              edge="start"
              aria-label="open drawer"
              sx={{
                ml: 2,
                color: '#ffffff',
              }}
            >
              <FavoriteIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block', color: 'white' } }}
            >
              Favorite
            </Typography>
          </NavLink>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
