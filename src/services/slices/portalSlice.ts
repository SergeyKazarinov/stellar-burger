import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IIngredient } from '../../types/interfaces/IIngredient';
import { IFeedOrder } from '../../types/interfaces/IOrder';
import { TLocationState } from '../../types/types/types';

interface IPortalSliceInitialState {
  ingredient: IIngredient;
  order: IFeedOrder;
  isOpenModalWithOrder: boolean;
  isOpenModalWithOrderDetails: boolean;
  isOpenIngredientDetail: boolean;
  isOpenModalWithMessage: string | null;
  location: TLocationState | null;
}

const portalSlice = createSlice({
  name: 'portalSlice',
  initialState: {
    ingredient: {},
    order: {},
    isOpenModalWithOrder: false,
    isOpenModalWithOrderDetails: false,
    isOpenIngredientDetail: false,
    isOpenModalWithMessage: null,
    location: null,
  } as IPortalSliceInitialState,
  reducers: {
    setIsOpenModalWithOrderDetails(
      state,
      action: PayloadAction<{isOpen: boolean, order: IFeedOrder}>,
    ) {
      state.order = action.payload.order;
      state.isOpenModalWithOrderDetails = action.payload.isOpen;

    },
    setIsOpenModalWithOrder(state, action: PayloadAction<boolean>) {
      state.isOpenModalWithOrder = action.payload;
    },
    setIsOpenIngredientDetail(
      state, action: PayloadAction<{isOpen: boolean, ingredient: IIngredient}>,
    ) {
      state.isOpenIngredientDetail = action.payload.isOpen;
      state.ingredient = action.payload.ingredient;
    },
    setIsOpenModalWithMessage(state, action: PayloadAction<string>) {
      state.isOpenModalWithMessage = action.payload;
    },

    closeAllModal(state) {
      state.isOpenIngredientDetail = false;
      state.isOpenModalWithOrder = false;
      state.isOpenModalWithOrderDetails = false;
      // state.ingredient = null;
      state.isOpenModalWithMessage = '';
    },
  },
});

export default portalSlice.reducer;
export const modalActions = portalSlice.actions;