import { configureStore } from "@reduxjs/toolkit";
import { pokemonsReducer } from "./slices/pokemonSlice";
import { pokemonReducer } from "./slices/pokemonByIdSlice";
import { searchReducer } from "./slices/searchSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import {typesOfPokemonReducer} from "./slices/typeSlice";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    pokemons: pokemonsReducer,
    pokemon: pokemonReducer,
    search: searchReducer,
    typesOfPokemon: typesOfPokemonReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export default store;
