import { combineReducers,configureStore } from "@reduxjs/toolkit";
import scrollSlice from "./slices/scrollSlice";


const rootReducer = combineReducers({
  scroll: scrollSlice,
});

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;