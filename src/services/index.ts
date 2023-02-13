import { combineReducers,configureStore } from '@reduxjs/toolkit';

import ingredientsForTheConstructorSlice from './slices/burgerConstructorSlice';
import ingredientsSlice from './slices/ingredientsSlice';
import ordersSlice from './slices/ordersSlice';
import portalSlice from './slices/portalSlice';
import profileSlice from './slices/profileSlice';
import scrollSlice from './slices/scrollSlice';


const rootReducer = combineReducers({
  scroll: scrollSlice,
  modal: portalSlice,
  ingredients: ingredientsSlice,
  burgerConstructor: ingredientsForTheConstructorSlice,
  profile: profileSlice,
  feedOrders: ordersSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;