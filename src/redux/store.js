import { configureStore } from '@reduxjs/toolkit';
import { pokemonsReducer } from './slices/pokemonSlice';
import { pokemonReducer } from './slices/pokemonByIdSlice';
import { searchReducer } from './slices/searchSlice';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import { typesOfPokemonReducer } from './slices/typeSlice';
import { favoriteReducer } from './slices/favoritePokemonSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const favoritePersistConfig = {
  key: 'favorite',
  storage,
};

const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  pokemon: pokemonReducer,
  search: searchReducer,
  typesOfPokemon: typesOfPokemonReducer,
  favorite: persistReducer(favoritePersistConfig, favoriteReducer),
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
