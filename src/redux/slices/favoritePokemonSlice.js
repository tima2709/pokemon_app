import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorite: [],
};

const favoriteSlice = createSlice({
  name: 'favoritePokemons',
  initialState,
  reducers: {
    addFavorite(state, action) {
      const exist = state.favorite.find((el) => el.id === action.payload.id);

      if (!exist) {
        state.favorite.push(action.payload);
      } else {
        state.favorite = state.favorite.filter(
          (el) => el.id !== action.payload.id
        );
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
