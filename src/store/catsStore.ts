import { configureStore, combineReducers, Middleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
// import { ICat } from '../models/types';
import { catsAPI } from '../services/CatsService';
import { catsFavSlice, catsSlice } from './slice/catFavSlicer';

// просто проверка
const ping: Middleware = (store) => (next) => (action) => {
  console.log('ping', action.type);
  return next(action);
};

const rootReducer = combineReducers({
  catsFav: catsFavSlice.reducer,
  cats: catsSlice.reducer,
  [catsAPI.reducerPath]: catsAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(catsAPI.middleware).concat(ping),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(catsAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
