import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/card/card';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';

const FavoritePokemons = () => {
  const pokemons = useSelector((state) => state.favorite.favorite);

  return (
    <Container sx={{ padding: '20px' }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {pokemons.length === 0 ? (
          <Typography variant="h6">Not Found</Typography>
        ) : (
          pokemons.map((pokemon) => <Card key={pokemon.id} pokemon={pokemon} />)
        )}
      </Grid>
    </Container>
  );
};

export default FavoritePokemons;
