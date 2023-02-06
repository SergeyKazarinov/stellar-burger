import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchLogout, fetchRegister, fetchUpdateToken } from "../asyncThunk/profileThunk";
import { ILoginAnswerSuccess, IRegisterAnswerSuccess, IUpdateTokenSuccess } from "../../types/interfaces/IAuthorization";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";

interface IProfileSliceInitialState {
  isLogin: boolean;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  errorProfileMessage: string;
}


const profileSlice = createSlice({
  name: 'profileSlice',
  initialState: {
    isLogin: false,
    email: '',
    name: '',
    accessToken: '',
    refreshToken: '',
    errorProfileMessage: '',
  } as IProfileSliceInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRegister.pending, (state, action) => {

      })
      .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<IRegisterAnswerSuccess>) => {
        console.log(action.payload)
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        console.log(action.payload);

      })

      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<ILoginAnswerSuccess>) => {
        state.email = action.payload.user.email;
        state.email = action.payload.user.name;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken)
        console.log(action.payload)
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        console.log(action.payload)
      })

      .addCase(fetchUpdateToken.fulfilled, (state, action: PayloadAction<IUpdateTokenSuccess>) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
      })
      .addCase(fetchUpdateToken.rejected, (state, action) => {
        console.log(action.payload);
      })

      .addCase(fetchLogout.fulfilled, (state, action) => {
        console.log(action.payload)
        state.email = '';
        state.name = '';
        state.accessToken = '';
        state.refreshToken = '';
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        console.log(action.payload);
      })
  }
})

export default profileSlice.reducer;
