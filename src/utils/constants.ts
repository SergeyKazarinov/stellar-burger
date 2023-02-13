// Ingredient types
export const BUNS: 'Булки' = 'Булки';
export const SAUCES: 'Соусы' = 'Соусы';
export const TOPPINGS: 'Начинки' = 'Начинки';

//API
export const URL_FOR_INGREDIENTS: string = 'https://norma.nomoreparties.space/api/ingredients';
export const URL_FOR_ORDERS: string = 'https://norma.nomoreparties.space/api/orders';
export const URL_FOR_AUTH: string = 'https://norma.nomoreparties.space/api/auth';
export const URL_FOR_RESET_PASSWORD: string = 'https://norma.nomoreparties.space/api';

//WebSocket
export const WSS_FOR_ALL_ORDERS = 'wss://norma.nomoreparties.space/orders/all';

//LINKS
export const URL_FOR_PROFILE_NAVIGATION: string[] = ['/profile', '/profile/orders'];

export const EMAIL_PATTERN: string = '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$';


export const ACCESS_TOKEN: string = 'accessToken';
export const REFRESH_TOKEN: string = 'refreshToken';