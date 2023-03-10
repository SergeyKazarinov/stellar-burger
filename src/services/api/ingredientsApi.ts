import { TOrderArray } from '../../types/types/TOrderArray';
import { URL_FOR_INGREDIENTS, URL_FOR_ORDERS } from '../../utils/constants';

import { fetchWithAuth } from './fetchWithAuth';

const checkAnswer = (res: Response) => {
  if(res.ok) {
    return res.json();
  }

  return res.json().then((error: Error) => {
    return Promise.reject(error);
  });
};

export const getIngredients = async () => {
  try {
    const res: Response = await fetch(URL_FOR_INGREDIENTS);
    const data = await checkAnswer(res);
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postOrders = async (order: TOrderArray) => {
  try {
    const res = await fetchWithAuth(URL_FOR_ORDERS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ingredients: order}),
    });
    return res;
  } catch (e) {
    return Promise.reject(e);
  }
};