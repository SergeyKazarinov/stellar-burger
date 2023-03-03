// Ingredient types
export const BUNS: 'Булки' = 'Булки';
export const SAUCES: 'Соусы' = 'Соусы';
export const TOPPINGS: 'Начинки' = 'Начинки';

//API
export const URL_FOR_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';
export const URL_FOR_ORDERS = 'https://norma.nomoreparties.space/api/orders';
export const URL_FOR_AUTH = 'https://norma.nomoreparties.space/api/auth';
export const URL_FOR_RESET_PASSWORD = 'https://norma.nomoreparties.space/api';

//WebSocket
export const WSS_FOR_ALL_ORDERS = 'wss://norma.nomoreparties.space/orders/all';
export const WSS_FOR_PROFILE_ORDERS = 'wss://norma.nomoreparties.space/orders';

//LINKS
export const URL_FOR_PROFILE_NAVIGATION: string[] = ['/profile', '/profile/orders'];

export const EMAIL_PATTERN = '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$';


export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

//Messages
export const LOGIN_ERROR_MESSAGE = 'Неверное имя пользователя или пароль';
export const EXIST_EMAIL_MESSAGE = 'Пользователь с таким Email уже существует.';
export const USER_UPDATE_ERROR_MESSAGE = 'При обновлении профиля произошла ошибка.';
export const SERVER_ERROR_MESSAGE = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const REGISTER_ERROR_MESSAGE = 'При регистрации пользователя произошла ошибка.';
export const USER_UPDATE_MESSAGE = 'Данные успешно обновлены!';