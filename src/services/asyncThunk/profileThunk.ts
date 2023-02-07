import { createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPasswordApi, getUser, loginUser, logoutUser, registerUser, resetPasswordApi, updateToken } from "../api/profileApi";
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

export const fetchGetUser = createAsyncThunk(
  'profile/fetchGetUser',
  async(_, thunkApi) => {
    try {
      const res = await getUser();
      return res;
    } catch(e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)

export const fetchForgotPassword = createAsyncThunk(
  'profile/fetchForgotPassword',
  async (email: string, thunkApi) => {
    try {
      const res = await forgotPasswordApi(email);
      return res;
    } catch(e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)

export const fetchResetPassword = createAsyncThunk(
  'profile/fetchResetPassword',
  async({password, token}: {password: string, token: string}, thunkApi) => {
    try {
      const res = await resetPasswordApi({password, token});
      return res;
    } catch(e) {
      thunkApi.rejectWithValue(e);
    }
  }
)