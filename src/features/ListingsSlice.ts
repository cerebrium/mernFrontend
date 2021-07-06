import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxListings, ApolloListing } from '../../types'

// define initial state
let initialState: ReduxListings = {}

export const ListingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    addListings: (state, action) => {
      return { ...state.listings, ...action.payload }
    },
    // needs work
    updateListing: (state, action: PayloadAction<ReduxListings>) => {
      state = action.payload

      return (state)
    }
  },
});

export const { addListings, updateListing } = ListingsSlice.actions;

export const selectListings = (state: ReduxListings) => state.listings;

export default ListingsSlice.reducer;
