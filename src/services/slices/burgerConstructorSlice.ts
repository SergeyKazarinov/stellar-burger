import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../../types/interfaces/IIngredient";
import { sendOrderThunk } from "../asyncThunk/orders";
import { TOrderArray } from "../../types/types/TOrderArray";

interface IBurgerConstructorSlice {
  bunsForTheBurgerConstructor: IIngredient[];
  ingredientsForTheBurgerConstructor: IIngredient[];
  totalPrice: number;
  ingredientsForTheOrder: TOrderArray;
  order: {
    name: string;
    order: {number: number};
    success: boolean;
  } | null;
  isLoaderOrder: boolean;
}

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructorSlice',
  initialState: {
    bunsForTheBurgerConstructor: [],
    ingredientsForTheBurgerConstructor: [],
    totalPrice: 0,
    ingredientsForTheOrder: [],
    order: null,
    isLoaderOrder: false,
  } as IBurgerConstructorSlice,
  reducers: {
    setBunsForTheBurgerConstructor(state, action: PayloadAction<IIngredient>) {
      if (state.bunsForTheBurgerConstructor.length !== 0 && state.bunsForTheBurgerConstructor[0]._id !== action.payload._id) {
        state.bunsForTheBurgerConstructor = [action.payload];
      } else {
        state.bunsForTheBurgerConstructor = [action.payload];
      }
    },

    addIngredientsForTheBurgerConstructor(state, action: PayloadAction<IIngredient>) {
      state.ingredientsForTheBurgerConstructor = [action.payload, ...state.ingredientsForTheBurgerConstructor ]
    },

    setTotalPrice(state) {
      const ingredientTotalPrice = state.ingredientsForTheBurgerConstructor.reduce((sum: number, item: IIngredient) => sum += item.price, 0);
      const bunsTotalPrice = state.bunsForTheBurgerConstructor.reduce((sum: number, item: IIngredient) => sum += (item.price * 2), 0);

      state.totalPrice = ingredientTotalPrice + bunsTotalPrice;
    },

    setIngredientsForTheOrder(state) {
      const bunID = state.bunsForTheBurgerConstructor.map(item => item._id);
      const ingredientID = state.ingredientsForTheBurgerConstructor.map(item => item._id);
      state.ingredientsForTheOrder = [...bunID, ...ingredientID, ...bunID];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(sendOrderThunk.pending, (state, action) => {
        state.isLoaderOrder = true;
      })
      .addCase(sendOrderThunk.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoaderOrder = false;
        state.order = action.payload;
      })
      .addCase(sendOrderThunk.rejected, (state, action) => {
        state.isLoaderOrder = false;
        console.log(action.payload);
      })
  }
});

export default burgerConstructorSlice.reducer;
export const {
  setBunsForTheBurgerConstructor,
  setTotalPrice,
  setIngredientsForTheOrder,
  addIngredientsForTheBurgerConstructor,
} = burgerConstructorSlice.actions;