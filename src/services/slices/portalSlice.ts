import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../../types/interfaces/IIngredient";

interface IPortalSliceInitialState {
  ingredient: IIngredient | null;
  isOpenOrderDetails: boolean;
  isOpenIngredientDetail: boolean;
}
const portalSlice = createSlice({
  name: 'portalSlice',
  initialState: {
    ingredient: null,
    isOpenOrderDetails: false,
    isOpenIngredientDetail: false
  } as IPortalSliceInitialState,
  reducers: {
    setIsOpenOrderDetails(state, action: PayloadAction<boolean>) {
      state.isOpenOrderDetails = action.payload
    },
    setIsOpenIngredientDetail(state, action: PayloadAction<{isOpen: boolean, ingredient: IIngredient}>) {
      state.isOpenIngredientDetail = action.payload.isOpen;
      state.ingredient = action.payload.ingredient;
    },

    closeAllModal(state) {
      state.isOpenIngredientDetail = false;
      state.isOpenOrderDetails = false;
      state.ingredient = null;
    }
  }
});

export default portalSlice.reducer;
export const { setIsOpenOrderDetails, setIsOpenIngredientDetail, closeAllModal } = portalSlice.actions;