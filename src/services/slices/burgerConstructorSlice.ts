import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IMessageResponse } from '../../types/interfaces/IAuthorization';
import { IIngredient } from '../../types/interfaces/IIngredient';
import { IOrder } from '../../types/interfaces/IOrder';
import { TOrderArray } from '../../types/types/TOrderArray';
import { ORDER_SERVER_ERROR_MESSAGE } from '../../utils/constants';
import { sendOrderThunk } from '../asyncThunk/ordersThunk';

interface IBurgerConstructorSlice {
  errorMessage: string;
  bunsForTheBurgerConstructor: IIngredient[];
  ingredientsForTheBurgerConstructor: IIngredient[];
  ingredientsForTheOrder: TOrderArray;
  order: IOrder | null
  isLoaderOrder: boolean;
}

interface ISortIngredients {
  ingredientDrop: {
    item: IIngredient;
    index: number;
  };
  index: number;
}

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructorSlice',
  initialState: {
    errorMessage:'',
    bunsForTheBurgerConstructor: [],
    ingredientsForTheBurgerConstructor: [],
    ingredientsForTheOrder: [],
    order: null,
    isLoaderOrder: false,
  } as IBurgerConstructorSlice,
  reducers: {
    setBunsForTheBurgerConstructor(state, action: PayloadAction<IIngredient>) {
      state.bunsForTheBurgerConstructor = [action.payload];
    },
    addIngredientsForTheBurgerConstructor(state, action: PayloadAction<IIngredient>) {
      state.ingredientsForTheBurgerConstructor = [action.payload, ...state.ingredientsForTheBurgerConstructor ];
    },
    removeIngredientForTheBurgerConstructor(state, action: PayloadAction<number>) {
      state.ingredientsForTheBurgerConstructor = state.ingredientsForTheBurgerConstructor.filter((item, index) => index !== action.payload);
    },
    sortIngredients(state, action: PayloadAction<ISortIngredients>) {
      const newArr = state.ingredientsForTheBurgerConstructor.filter((item, index) => index !== action.payload.ingredientDrop.index);
      const arrStart = newArr.slice(0, action.payload.index);
      const arrEnd = newArr.slice(action.payload.index);
      state.ingredientsForTheBurgerConstructor = [...arrStart, action.payload.ingredientDrop.item, ...arrEnd];
    },
    setIngredientsForTheOrder(state) {
      const bunID = state.bunsForTheBurgerConstructor.map(item => item._id);
      const ingredientID = state.ingredientsForTheBurgerConstructor.map(item => item._id);
      state.ingredientsForTheOrder = [...bunID, ...ingredientID, ...bunID];
    },
    clearBurgerConstructor(state) {
      state.bunsForTheBurgerConstructor = [];
      state.ingredientsForTheBurgerConstructor = [];
    },
    setOrder(state, action: PayloadAction<null | IOrder>) {
      state.order = action.payload;
    },
    clearErrorMessage(state) {
      state.errorMessage = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendOrderThunk.pending, (state) => {
        state.isLoaderOrder = true;
      })
      .addCase(sendOrderThunk.fulfilled, (state, action: PayloadAction<IOrder>) => {
        state.isLoaderOrder = false;
        state.order = action.payload;
      })
      .addCase(sendOrderThunk.rejected.type, (state, action: PayloadAction<IMessageResponse>) => {
        state.isLoaderOrder = false;
        state.errorMessage = ORDER_SERVER_ERROR_MESSAGE;
        console.log(action.payload);
      });
  },
});

export default burgerConstructorSlice.reducer;
export const burgerConstructorActions = burgerConstructorSlice.actions;