import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../../types/interfaces/IIngredient";

interface IPortalSliceInitialState {
  ingredient: IIngredient | null;
  isOpenOrderDetails: boolean;
  isOpenIngredientDetail: boolean;
  isOpenModalWithMessage: string | null;
}
const portalSlice = createSlice({
  name: 'portalSlice',
  initialState: {
    ingredient: null,
    isOpenOrderDetails: false,
    isOpenIngredientDetail: false,
    isOpenModalWithMessage: null,
  } as IPortalSliceInitialState,
  reducers: {
    setIsOpenOrderDetails(state, action: PayloadAction<boolean>) {
      state.isOpenOrderDetails = action.payload
    },
    setIsOpenIngredientDetail(state, action: PayloadAction<{isOpen: boolean, ingredient: IIngredient}>) {
      state.isOpenIngredientDetail = action.payload.isOpen;
      state.ingredient = action.payload.ingredient;
    },
    setIsOpenModalWithMessage(state, action: PayloadAction<string>) {
      state.isOpenModalWithMessage = action.payload;
    },

    closeAllModal(state) {
      state.isOpenIngredientDetail = false;
      state.isOpenOrderDetails = false;
      state.ingredient = null;
      state.isOpenModalWithMessage = '';
    }
  }
});

export default portalSlice.reducer;
export const modalActions = portalSlice.actions;