import { IUpdateTokenSuccess } from '../../types/interfaces/IAuthorization';
import { ACCESS_TOKEN, REFRESH_TOKEN, URL_FOR_AUTH } from '../../utils/constants';

export const fetchWithAuth = async (url: string, options: any) => {
  let accessToken = localStorage.getItem(ACCESS_TOKEN);
  let refreshToken = localStorage.getItem(REFRESH_TOKEN);
  try {
    options.headers.authorization = accessToken;
    const res = await fetch(url, options);
    if (res.ok) {
      return res.json();
    }

    if (res.status === 403) {
      const newTokenResolve = await fetch(`${URL_FOR_AUTH}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token: refreshToken}),
      });

      if (newTokenResolve.ok) {
        const data: IUpdateTokenSuccess = await newTokenResolve.json();
        localStorage.setItem(ACCESS_TOKEN, data.accessToken);
        localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
        console.log(data);
        options.headers.authorization = localStorage.getItem(ACCESS_TOKEN);
        const res = await fetch(url, options);
        if (res.ok) {
          return res.json();
        }


      }
    }
    return res.json().then((error: Error) => {
      return Promise.reject(error);
    });

  } catch(e) {
    return Promise.reject(e);
  }

};