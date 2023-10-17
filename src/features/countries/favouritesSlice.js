import { createSlice } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import toast from 'react-hot-toast';
import {
  addFavouriteToFirebase,
  auth,
  clearFavouritesFromFirebase,
  db,
  removeFavouriteFromFirebase,
} from '../../auth/firebase';

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    favourites: [],
    isLoading: true,
  },
  reducers: {
    addFavourite: (state, action) => {
      // The line below is not necessary but can be useful as a check to see if localStorage favourite already exists
      if (state.favourites.some((fav) => fav === action.payload))
        state.favourites = [...state.favourites];
      state.favourites = [...state.favourites, action.payload];
      const user = auth.currentUser;
      if (user) {
        addFavouriteToFirebase(user.uid, action.payload);
        toast.success(`${action.payload} added to favourites`);
      }
    },
    removeFavourite(state, action) {
      const newArray = [...state.favourites];
      newArray.splice(
        newArray.findIndex((e) => e === action.payload),
        1
      );
      state.favourites = [...newArray];
      const user = auth.currentUser;
      if (user) {
        removeFavouriteFromFirebase(user.uid, action.payload);
        toast.success(`${action.payload} removed from favourites`);
      }
    },
    clearFavourites(state, action) {
      state.favourites = [];
      const user = auth.currentUser;
      if (user) {
        clearFavouritesFromFirebase(user.uid);
        toast.success(`Favourites cleared`);
      }
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    getFavourites(state, action) {
      state.favourites = action.payload;
    },
  },
});

export const getFavouritesFromSource = () => async (dispatch) => {
  const user = auth.currentUser;
  if (user) {
    const q = await getDocs(collection(db, `users/${user.uid}/favourites`));
    const favourites = q.docs.map((doc) => doc.data().name);
    dispatch(getFavourites(favourites));
    dispatch(isLoading(false));
  }
};

export const {
  addFavourite,
  removeFavourite,
  clearFavourites,
  isLoading,
  getFavourites,
} = favouritesSlice.actions;
export default favouritesSlice.reducer;
