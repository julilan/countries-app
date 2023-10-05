import { createSlice } from '@reduxjs/toolkit';
import {
  addFavouriteToFirebase,
  auth,
  clearFavouritesFromFirebase,
  removeFavouriteFromFirebase,
} from '../../auth/firebase';

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
      const user = auth.currentUser;
      if (user) {
        addFavouriteToFirebase(user.uid, action.payload);
      }
    },
    removeFavourite(state, action) {
      const newArray = [...state.favourites];
      newArray.splice(
        newArray.findIndex((e) => e === action.payload),
        1
      );
      // Update localStorage favourites
      state.favourites = [...newArray];
      localStorage.setItem('favourites', JSON.stringify(newArray));
      const user = auth.currentUser;
      if (user) {
        removeFavouriteFromFirebase(user.uid, action.payload);
      }
    },
    clearFavourites(state, action) {
      localStorage.removeItem('favourites');
      state.favourites = [];
      const user = auth.currentUser;
      if (user) {
        clearFavouritesFromFirebase(user.uid);
      }
    },
  },
});

export const { addFavourite, removeFavourite, clearFavourites } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;
