import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { catsAPI } from '../services/CatsService';

const rootReducer = combineReducers({
  [catsAPI.reducerPath]: catsAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(catsAPI.middleware),
});

// type RootState = ReturnType<typeof store.getState>;
