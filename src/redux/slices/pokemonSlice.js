import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {baseURL, getQueryString} from "../../api/pokemonApi";

export const getPokemons = createAsyncThunk('pokemons/getPokemons', async ({page, pageSize, name, types}) => {
    const typesOfPokemon = types.map(type => `types%3A${type.toLowerCase()}`).join('%20OR%20');
    const query = getQueryString([
        {key: 'page', value: `${page}`},
        {key: 'pageSize', value: `${pageSize}`},
        {key: 'q', value: `name:${name.trim().replaceAll(' ', '*')}*+${typesOfPokemon.trim().replaceAll(' ', '*')}`},
    ])
    const {data} = await axios(`${baseURL}/cards/${query}`)
    return data
})

export const getTypes = createAsyncThunk('pokemons/getTypes', async () => {
    const {data} = await axios(`${baseURL}/types`)
    return data.data
})


const initialState = {
    data: [],
    types: [],
    page: 1,
    totalCount: 10,
    pageSize: 12,
    status: "idle",
    error: null
}

const pokemonSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        setPageSize(state, action) {
            state.pageSize = action.payload;
            state.page = 1;
        },
        setPage(state, action) {
            state.page = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getPokemons.pending, (state) => {
                state.data = [];
                state.status = "loading";
                state.error = null
            })
            .addCase(getPokemons.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.totalCount = action.payload.totalCount
                state.status = "success"
            })
            .addCase(getPokemons.rejected, (state, action) => {
                state.data = [];
                state.status = "failed";
                state.error = action.error.message
            })
            .addCase(getTypes.fulfilled, (state, action) => {
                state.types = action.payload
            })
    }
})
export const {setPageSize, setPage} = pokemonSlice.actions;
export const pokemonsReducer = pokemonSlice.reducer