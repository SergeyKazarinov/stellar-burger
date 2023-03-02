import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IGetUserSuccess, ILoginAnswerSuccess, IMessageResponse, IRegisterAnswerSuccess, IUpdateTokenSuccess } from '../../types/interfaces/IAuthorization';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/constants';
import { fetchForgotPassword, fetchGetUser, fetchLogin, fetchLogout, fetchRegister, fetchResetPassword, fetchUpdateUser } from '../asyncThunk/profileThunk';

interface IProfileSliceInitialState {
  isLoaderPage: boolean;
  profilePending: boolean;
  isLogin: boolean;
  isSentEmailForResetPassword: boolean;
  email: string;
  name: string;
  message: string;
}


const profileSlice = createSlice({
  name: 'profileSlice',
  initialState: {
    isLoaderPage: true,
    profilePending: false,
    isLogin: false,
    isSentEmailForResetPassword: false,
    email: '',
    name: '',
    message: '',
  } as IProfileSliceInitialState,
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRegister.pending, (state, action) => {
        state.profilePending = true;
        state.message = '';
      })
      .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<IRegisterAnswerSuccess>) => {
        console.log(action.payload);
        state.profilePending = false;
        state.isLogin = true;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
        localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        console.log(action.payload);
        state.profilePending = false;
      })

      .addCase(fetchLogin.pending, (state) => {
        state.profilePending = true;
        state.message = '';
      })
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<ILoginAnswerSuccess>) => {
        state.isLogin = true;
        state.profilePending = false;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
        localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
        console.log(action.payload);
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        console.log(action.payload);
        state.profilePending = false;
      })

      .addCase(fetchLogout.pending, (state) => {
        state.profilePending = true;
        state.message = '';
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        console.log(action.payload);
        state.profilePending = false;
        state.isLogin = false;
        state.email = '';
        state.name = '';
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        console.log(action.payload);
        state.profilePending = false;
      })

      .addCase(fetchGetUser.pending, (state) => {
        state.profilePending = true;
        state.message = '';
      })
      .addCase(fetchGetUser.fulfilled, (state, action: PayloadAction<IGetUserSuccess>) => {
        state.isLoaderPage = false;
        state.profilePending = false;
        state.isLogin = true;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoaderPage = false;
        state.profilePending = false;
      })

      .addCase(fetchUpdateUser.pending, (state) => {
        state.profilePending = true;
        state.message = '';
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action: PayloadAction<IGetUserSuccess>) => {
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.profilePending = false;
      })
      .addCase(fetchUpdateUser.rejected, (state, action ) => {
        state.profilePending = false;
        console.log(action.payload);
      })

      .addCase(fetchForgotPassword.pending, (state) => {
        state.profilePending = true;
        state.message = '';
      })
      .addCase(fetchForgotPassword.fulfilled, (state, action: PayloadAction<IMessageResponse>) => {
        state.isSentEmailForResetPassword = true;
        state.message = action.payload.message;
        state.profilePending = false;
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        console.log(action.payload);
        state.profilePending = false;
      })

      .addCase(fetchResetPassword.pending, (state) => {
        state.profilePending = true;
      })
      .addCase(fetchResetPassword.fulfilled, (state, action: PayloadAction<IMessageResponse>) => {
        state.profilePending = false;
        state.isSentEmailForResetPassword = false;
        state.message = action.payload.message;
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.profilePending = false;
        console.log(action.payload);
      });
  },
});

export default profileSlice.reducer;
export const profileActions = profileSlice.actions;
