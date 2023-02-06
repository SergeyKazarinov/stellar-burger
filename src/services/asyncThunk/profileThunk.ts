import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser, updateToken } from "../api/profileApi";
import { ILogin, IRegister } from "../../types/interfaces/IAuthorization";


export const fetchRegister = createAsyncThunk(
  'profile/fetchRegister',
  async ({email, password, name}: IRegister, thunkApi) => {
    try {
      const res = await registerUser({email, password, name});
      return res;
    } catch(e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  'profile/fetchLogin',
  async({email, password}: ILogin, thunkApi) => {
    try {
      const res = await loginUser({email, password});
      return res;
    } catch(e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)

export const fetchUpdateToken = createAsyncThunk(
  'profile/fetchUpdateToken',
  async(_, thunkApi) => {
    try {
      const res = await updateToken();
      return res;
    } catch(e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)

export const fetchLogout = createAsyncThunk(
  'profile/fetchLogout',
  async(_, thunkApi) => {
    try {
      const res = await logoutUser();
      return res;
    } catch(e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)