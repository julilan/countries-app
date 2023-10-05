import { createSlice } from '@reduxjs/toolkit';

const favourites =
  localStorage.getItem('favourites') !== null
    ? JSON.parse(localStorage.getItem('favourites'))
    : [];

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    favourites: favourites,
  },
  reducers: {
    addFavourite: (state, action) => {
      // The line below is not necessary but can be useful as a check to see if localStorage favourite already exists
      if (state.favourites.some((fav) => fav === action.payload))
        state.favourites = [...state.favourites];
      state.favourites = [...state.favourites, action.payload];
      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },
    removeFavourite(state, action) {
      const newArray = [...state.favourites];
      newArray.splice(
        newArray.findIndex((e) => e === action.payload),
        1
      );
      // Update localStorage favourites
      localStorage.setItem('favourites', JSON.stringify(newArray));
      state.favourites = [...newArray];
    },
    clearFavourites(state, action) {
      localStorage.removeItem('favourites');
      state.favourites = [];
    },
  },
});

export const { addFavourite, removeFavourite, clearFavourites } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;
