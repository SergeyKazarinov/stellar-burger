import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IData } from "../../types/interface/IData";

interface IPortalSliceInitialState {
  ingredient: IData;
  isOpenOrderDetails: boolean;
  isOpenIngredientDetail: boolean;
}
const portalSlice = createSlice({
  name: 'portalSlice',
  initialState: {
    ingredient: {},
    isOpenOrderDetails: false,
    isOpenIngredientDetail: false
  } as IPortalSliceInitialState,
  reducers: {
    setIsOpenOrderDetails(state, action: PayloadAction<boolean>) {
      state.isOpenOrderDetails = action.payload
    },
    setIsOpenIngredientDetail(state, action: PayloadAction<{isOpen: boolean, ingredient: IData}>) {
      state.isOpenIngredientDetail = action.payload.isOpen;
      state.ingredient = action.payload.ingredient;
    },

    closeAllModal(state) {
      state.isOpenIngredientDetail = false;
      state.isOpenOrderDetails = false;
    }
  }
});

export default portalSlice.reducer;
export const { setIsOpenOrderDetails, setIsOpenIngredientDetail, closeAllModal } = portalSlice.actions;