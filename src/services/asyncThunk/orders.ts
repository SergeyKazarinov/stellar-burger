import { createAsyncThunk } from "@reduxjs/toolkit";
import { postOrders } from "../api";
import { TOrderArray } from "../../types/types/TOrderArray";


export const sendOrderThunk = createAsyncThunk(
  'orders/sendOrders',
  async (order: TOrderArray, thunkApi) => {
    try {
      const res = await postOrders(order);
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)