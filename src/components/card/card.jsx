import React from 'react';
import styles from './card.module.css';
import { Link } from 'react-router-dom';
import SkeletonCard from './skeletonCard';
import { Grid, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../../redux/slices/favoritePokemonSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Card = ({ pokemon, isLoading }) => {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite.favorite);

  const isFavorite = Boolean(favorite.find((item) => item?.id === pokemon?.id));

  const handleFavorite = (data) => {
    dispatch(addFavorite(data));
  };

  if (isLoading) return <SkeletonCard />;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div className={styles.card}>
        <h5>Name: {pokemon.name}</h5>
        <Link to={`/pokemon-details/${pokemon.id}`}>
          <img src={pokemon.images.small} alt={pokemon.name} />
        </Link>
        <div className={styles.shortInfo}>
          <div>
            <p>Rarity: {pokemon.rarity}</p>
            <p>
              Types:{' '}
              {pokemon.types.map((type, idx) => (
                <span key={idx}>{type}</span>
              ))}
            </p>
          </div>
          <IconButton onClick={() => handleFavorite(pokemon)}>
            {isFavorite ? (
              <FavoriteIcon sx={{ color: 'red' }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: 'red' }} />
            )}
          </IconButton>
        </div>
      </div>
    </Grid>
  );
};

export default Card;
