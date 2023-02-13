import { combineReducers,configureStore } from "@reduxjs/toolkit";
import scrollSlice from "./slices/scrollSlice";
import portalSlice from "./slices/portalSlice";
import ingredientsSlice from "./slices/ingredientsSlice";
import ingredientsForTheConstructorSlice from "./slices/burgerConstructorSlice";
import profileSlice from "./slices/profileSlice";
import ordersSlice from "./slices/ordersSlice";


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
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;