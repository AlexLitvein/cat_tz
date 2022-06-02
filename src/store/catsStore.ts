import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { ICat } from '../models/types';
import { catsAPI } from '../services/CatsService';
import { catsFavSlice } from './slice/catFavSlicer';

const rootReducer = combineReducers({
  catsFav: catsFavSlice.reducer,
  [catsAPI.reducerPath]: catsAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(catsAPI.middleware),
});

// type RootState = ReturnType<typeof store.getState>;
