import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IIngredient } from '../../types/interfaces/IIngredient';
import { IFeedOrder } from '../../types/interfaces/IOrder';
import { TLocationState } from '../../types/types/types';

interface IPortalSliceInitialState {
  order: IFeedOrder;
  isOpenModalWithOrder: boolean;
  isOpenModalWithOrderDetails: boolean;
  ingredientForModal: IIngredient | null;
  isOpenModalWithMessage: string | null;
  location: TLocationState | null;
}

const portalSlice = createSlice({
  name: 'portalSlice',
  initialState: {
    order: {},
    isOpenModalWithOrder: false,
    isOpenModalWithOrderDetails: false,
    ingredientForModal: null,
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
      state, action: PayloadAction<IIngredient>,
    ) {
      state.ingredientForModal = action.payload;
    },
    setIsOpenModalWithMessage(state, action: PayloadAction<string>) {
      state.isOpenModalWithMessage = action.payload;
    },

    closeAllModal(state) {
      state.ingredientForModal = null;
      state.isOpenModalWithOrder = false;
      state.isOpenModalWithOrderDetails = false;
      state.isOpenModalWithMessage = '';
    },
  },
});

export default portalSlice.reducer;
export const modalActions = portalSlice.actions;