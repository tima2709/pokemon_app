import { createSlice } from '@reduxjs/toolkit';

const typesOfPokemonSlice = createSlice({
    name: 'typesOfPokemon',
    initialState: {
        typeQuery: [],
    },
    reducers: {
        setTypesOfPokemon(state, action) {
            state.typeQuery = action.payload;
        },
    },
});

export const { setTypesOfPokemon } = typesOfPokemonSlice.actions;

export const typesOfPokemonReducer = typesOfPokemonSlice.reducer;
