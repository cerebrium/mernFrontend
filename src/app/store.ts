import { configureStore } from '@reduxjs/toolkit'
import listingsReducer from '../features/ListingsSlice';

export default configureStore({
  reducer: {
    listings: listingsReducer
  },
});