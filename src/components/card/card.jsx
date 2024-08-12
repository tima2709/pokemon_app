import React from 'react';
import styles from './card.module.css'
import {Link} from "react-router-dom";
import SkeletonCard from "./skeletonCard";
import {Grid} from "@mui/material";

const Card = ({pokemon, isLoading}) => {

    if (isLoading) return <SkeletonCard/>

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <div className={styles.card}>
                <h5>Name: {pokemon.name}</h5>
                <Link to={`/pokemon-details/${pokemon.id}`}>
                    <img src={pokemon.images.small} alt={pokemon.name}/>
                </Link>
                <div>
                    <p>Rarity: {pokemon.rarity}</p>
                    <p>Types: {pokemon.types.map((type) => <span>{type}</span>)}</p>
                </div>
            </div>
        </Grid>
    );
};

export default Card;