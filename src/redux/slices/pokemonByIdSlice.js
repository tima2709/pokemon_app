import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getPokemon = createAsyncThunk('pokemon/getPokemon', async (id ) => {
    const {data} = await axios(`https://api.pokemontcg.io/v2/cards/${id}`)
    return data.data
})


const initialState = {
    pokemon: {},
    status: "idle"
}

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPokemon.pending, (state) => {
                state.pokemon = [];
                state.status = "loading"
            })
            .addCase(getPokemon.fulfilled, (state, action) => {
                state.pokemon = action.payload;
                state.status = "loaded"
            })
            .addCase(getPokemon.rejected, (state) => {
                state.pokemon = [];
                state.status = "error"
            })
    }
})

export const pokemonReducer = pokemonSlice.reducer