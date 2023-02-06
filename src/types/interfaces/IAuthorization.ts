interface IUser {
  email: string;
  name: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin{
  name: string;
}

export interface IRegisterAnswerSuccess {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ILoginAnswerSuccess {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IUpdateTokenSuccess {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}