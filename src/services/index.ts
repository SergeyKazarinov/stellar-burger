import { combineReducers,configureStore } from '@reduxjs/toolkit';

import ingredientsForTheConstructorSlice from './slices/burgerConstructorSlice';
import ingredientsSlice from './slices/ingredientsSlice';
import portalSlice from './slices/portalSlice';
import profileSlice from './slices/profileSlice';
import scrollSlice from './slices/scrollSlice';
import wsSlice from './slices/wsSlice';


const rootReducer = combineReducers({
  scroll: scrollSlice,
  modal: portalSlice,
  ingredients: ingredientsSlice,
  burgerConstructor: ingredientsForTheConstructorSlice,
  profile: profileSlice,
  wsReducers: wsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;