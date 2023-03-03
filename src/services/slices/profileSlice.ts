import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  IGetUserSuccess,
  ILoginAnswerSuccess,
  IMessageResponse,
  IRegisterAnswerSuccess,
} from '../../types/interfaces/IAuthorization';
import {
  ACCESS_TOKEN,
  EXIST_EMAIL_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  REFRESH_TOKEN,
  USER_UPDATE_ERROR_MESSAGE,
} from '../../utils/constants';
import {
  fetchForgotPassword,
  fetchGetUser,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchResetPassword,
  fetchUpdateUser,
} from '../asyncThunk/profileThunk';

interface IProfileSliceInitialState {
  isLoaderPage: boolean;
  profilePending: boolean;
  isLogin: boolean;
  isSentEmailForResetPassword: boolean;
  email: string;
  name: string;
  message: string;
  accessToken: string | null;
  errorMessage: string;
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
    accessToken: '',
    errorMessage: '',
  } as IProfileSliceInitialState,
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    clearErrorMessage(state) {
      state.errorMessage = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRegister.pending, (state, action) => {
        state.profilePending = true;
        state.message = '';
        state.errorMessage = '';
      })
      .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<IRegisterAnswerSuccess>) => {
        console.log(action.payload);
        state.profilePending = false;
        state.isLogin = true;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.accessToken = action.payload.accessToken;
        localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
        localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
      })
      .addCase(fetchRegister.rejected.type, (state, action: PayloadAction<IMessageResponse>) => {

        state.profilePending = false;
        if (action.payload.message === 'User already exists') {
          state.errorMessage = EXIST_EMAIL_MESSAGE;
        } else {
          console.log(action.payload);
          state.errorMessage = action.payload.message;
        }

        setTimeout(() => {
          state.errorMessage = '';
        }, 3000);
      })

      .addCase(fetchLogin.pending, (state) => {
        state.profilePending = true;
        state.message = '';
        state.errorMessage = '';
      })
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<ILoginAnswerSuccess>) => {
        state.isLogin = true;
        state.profilePending = false;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.accessToken = action.payload.accessToken;
        localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
        localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
        console.log(action.payload);
      })
      .addCase(fetchLogin.rejected.type, (state, action: PayloadAction<IMessageResponse>) => {
        console.log(action.payload);
        state.profilePending = false;
        if (action.payload.message === 'email or password are incorrect') {
          state.errorMessage = LOGIN_ERROR_MESSAGE;
        } else {
          state.errorMessage = action.payload.message;
        }

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
        state.accessToken = '';
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
        state.accessToken = localStorage.getItem(ACCESS_TOKEN);
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
        state.errorMessage = '';
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action: PayloadAction<IGetUserSuccess>) => {
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.profilePending = false;
      })
      .addCase(fetchUpdateUser.rejected.type, (state, action: PayloadAction<IMessageResponse> ) => {
        state.profilePending = false;
        state.errorMessage = USER_UPDATE_ERROR_MESSAGE;
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
