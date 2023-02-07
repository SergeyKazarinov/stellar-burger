import { ILogin, IRegister } from "../../types/interfaces/IAuthorization"
import { ACCESS_TOKEN, REFRESH_TOKEN, URL_FOR_AUTH, URL_FOR_RESET_PASSWORD } from "../../utils/constants"

const checkAnswer = (res: Response) => {
  if(res.ok) {
    return res.json();
  }

  return res.json().then((error: Error) => {
    return Promise.reject(error);
  });
}

export const registerUser = async ({email, password, name}: IRegister) => {
  try {
    const res: Response = await fetch(`${URL_FOR_AUTH}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password, name})
    });

    const data = await checkAnswer(res);

    return data;
  } catch(e) {
    return Promise.reject(e);
  }
};

export const loginUser = async({email, password}: ILogin ) => {
  try {
    const res: Response = await fetch(`${URL_FOR_AUTH}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });

    const data = checkAnswer(res);
    return data;
  } catch(e) {
    return Promise.reject(e);
  }
}

export const updateToken = async() => {
  try {
    const token = localStorage.getItem(REFRESH_TOKEN);
    console.log(token)
    const res: Response = await fetch(`${URL_FOR_AUTH}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token})
    })

    const data = checkAnswer(res);
    return data;
  } catch(e) {
    return Promise.reject(e);
  }
};

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem(REFRESH_TOKEN);
    const res: Response = await fetch(`${URL_FOR_AUTH}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });

    const data = await checkAnswer(res);
    localStorage.setItem(ACCESS_TOKEN, data.accessToken)
    localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
    return data;
  } catch(e) {
    return Promise.reject(e);
  }
};

export const getUser = async () => {
  try {
    const res: Response = await fetch(`${URL_FOR_AUTH}/user`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `${localStorage.getItem(ACCESS_TOKEN)}`
      }
    });

    const data = await checkAnswer(res);
    return data;
  } catch(e) {
    return Promise.reject(e);
  }
}

export const forgotPasswordApi = async (email: string) => {
  try {
    const res: Response = await fetch(`${URL_FOR_RESET_PASSWORD}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await checkAnswer(res);
    return data;
  } catch(e) {
    return Promise.reject(e);
  }
};

export const resetPasswordApi = async ({password, token}: {password: string, token: string}) => {
  try {
    const res: Response = await fetch(`${URL_FOR_RESET_PASSWORD}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password, token})
    });

    const data = await checkAnswer(res);
    return data;
  } catch(e) {
    return Promise.reject(e);
  }
}