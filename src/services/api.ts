import { URL_FOR_INGREDIENTS } from "../utils/constants"

const checkAnswer = (res: any) => {
  if(res.ok) {
    return res.json();
  }

  return res.json().then((error: Error) => {
    return Promise.reject(error);
  })
}

export const getIngredients = async () => {
  try {
    const res = await fetch(URL_FOR_INGREDIENTS);
    const data = await checkAnswer(res);
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
}