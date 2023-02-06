import { createAsyncThunk } from "@reduxjs/toolkit";
import { TOrderArray } from "../../types/types/TOrderArray";
import { postOrders } from "../api/ingredientsApi";


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