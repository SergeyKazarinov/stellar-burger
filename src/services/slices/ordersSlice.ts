import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFeedOrder } from "../../types/interfaces/IOrder";
import { IWebSocketResolve } from "../../types/interfaces/IWebSocket";

interface IOrderSlice {
  feedOrders: IFeedOrder[];
}

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: {
    feedOrders: [],
  } as IOrderSlice,
  reducers: {
    setFeedOrders(state, action: PayloadAction<IWebSocketResolve>) {
      state.feedOrders = action.payload.orders;
    }
  }
});

export default orderSlice.reducer;
export const orderSliceActions = orderSlice.actions;