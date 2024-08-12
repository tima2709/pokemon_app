import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPokemon} from "../redux/slices/pokemonByIdSlice";
import {Loader} from "../components/loader/loader";
import styles from './pagesStyles.module.css'
import {Container} from "@mui/material";

const PokemonDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const card = useSelector(state => state.pokemon.pokemon);
    const status = useSelector(state => state.pokemon.status);
    
    useEffect(() => {
        dispatch(getPokemon(id))
    },[dispatch, id])

    console.log(card)

    if (status === 'loading') {
        return (
            <div className={styles.details_loader_container}>
                <Loader />
            </div>
        );
    }

    return (
        <Container>
            <div className={styles.card_details_container}>
                <div className={styles.card_details}>
                    {card ? (
                        <>
                            <h1 className={styles.card_details__title}>{card.name}</h1>
                            <ul className={styles.card_details__details}>
                                <li>
                                    <span className={styles.detail_category}>Supertype: </span>
                                    {card.supertype}
                                </li>
                                <li>
                                    <span className={styles.detail_category}>Subtypes: </span>{' '}
                                    {card.subtypes?.join(', ')}
                                </li>
                                {card.types && (
                                    <li>
                                        <span className={styles.detail_category}>Types: </span>{' '}
                                        {card.types?.join(', ')}
                                    </li>
                                )}
                                {card.level && (
                                    <li>
                                        <span className={styles.detail_category}>Level: </span>{' '}
                                        {card.level}
                                    </li>
                                )}
                                {card.hp && (
                                    <li>
                                        <span className={styles.detail_category}>HP: </span> {card.hp}
                                    </li>
                                )}
                                {card.abilities && (
                                    <li>
                                        <span className={styles.detail_category}>Abilities: </span>
                                        {card.abilities?.map((ability) => ability.name).join(', ')}
                                    </li>
                                )}
                                {card.attacks && (
                                    <li>
                                        <span className={styles.detail_category}>Attacks: </span>
                                        {card.attacks?.map((attack) => attack.name).join(', ')}
                                    </li>
                                )}
                                {card.rarity && (
                                    <li>
                                        <span className={styles.detail_category}>Rarity: </span>{' '}
                                        {card.rarity}
                                    </li>
                                )}
                            </ul>
                            {card.flavorText && (
                                <p className={styles.card_details__description}>{card.flavorText}</p>
                            )}
                            <img
                                className={styles.card_details__image}
                                src={card.images?.large}
                                alt={card.name}
                            ></img>
                        </>
                    ) : (
                        <span>Card not found</span>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default PokemonDetails;