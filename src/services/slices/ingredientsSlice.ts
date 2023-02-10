import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "../asyncThunk/ingredientsThunk";
import { IIngredient } from "../../types/interfaces/IIngredient";

interface IIngredientsInitialState {
  ingredients: IIngredient[];
  fetchIngredientsPending: boolean;
  errorMessage: string | unknown;
}


const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState: {
    ingredients: [],
    fetchIngredientsPending: false,
    errorMessage: '',
  } as IIngredientsInitialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state, action) => {
        state.fetchIngredientsPending = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<IIngredient[]>) => {
        state.ingredients = action.payload
        state.fetchIngredientsPending = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.fetchIngredientsPending = false;
        state.errorMessage = action.payload
        console.log(action.payload)
      })
  }
});

export default ingredientsSlice.reducer;