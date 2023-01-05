import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../../types/interface/IIngredient";

interface IBurgerConstructorSlice {
  bunsForTheBurgerConstructor: IIngredient[];
  ingredientsForTheBurgerConstructor: IIngredient[];
  totalPrice: number;
}

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructorSlice',
  initialState: {
    bunsForTheBurgerConstructor: [],
    ingredientsForTheBurgerConstructor: [],
    totalPrice: 0,

  } as IBurgerConstructorSlice,
  reducers: {
    setBunsForTheBurgerConstructor(state, action: PayloadAction<IIngredient[]>) {
      if (state.bunsForTheBurgerConstructor.length !== 0 && state.bunsForTheBurgerConstructor[0]._id !== action.payload[0]._id) {
        state.bunsForTheBurgerConstructor = action.payload;

      } else {
        state.bunsForTheBurgerConstructor = action.payload;
        console.log(action.payload)
      }
    },

    setIngredientsForTheBurgerConstructor(state, action: PayloadAction<IIngredient[]>) {
      state.ingredientsForTheBurgerConstructor = action.payload;
    },
    setTotalPrice(state) {
      const ingredientTotalPrice = state.ingredientsForTheBurgerConstructor.reduce((sum: number, item: IIngredient) => {
        return sum += item.price;
      }, 0);
      const bunsTotalPrice = state.bunsForTheBurgerConstructor.reduce((sum: number, item: IIngredient) => {
        return sum += (item.price * 2);
      }, 0);

      state.totalPrice = ingredientTotalPrice + bunsTotalPrice;
    }
  }
});

export default burgerConstructorSlice.reducer;
export const { setBunsForTheBurgerConstructor, setIngredientsForTheBurgerConstructor, setTotalPrice } = burgerConstructorSlice.actions;