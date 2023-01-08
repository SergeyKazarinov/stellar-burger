import { combineReducers,configureStore } from "@reduxjs/toolkit";
import scrollSlice from "./slices/scrollSlice";
import portalSlice from "./slices/portalSlice";
import ingredientsSlice from "./slices/ingredientsSlice";
import ingredientsForTheConstructorSlice from "./slices/burgerConstructorSlice";


const rootReducer = combineReducers({
  scroll: scrollSlice,
  modal: portalSlice,
  ingredients: ingredientsSlice,
  burgerConstructor: ingredientsForTheConstructorSlice,
});

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;