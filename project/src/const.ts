export enum AppRoute {
  Root = '/',
  Login = '/login',
  Room = '/room/:id',
  Favourites = '/favorites',
  NotFound = '/not_found'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const MAX_RATING = 5;
export const MIN_COMMENT_LENGTH = 50;
export const TIMEOUT_SHOW_ERROR = 2000;

export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';
export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const CITIES = [
  'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'
];

export const DEFAULT_CITY_DATA = {
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom:13
  },
  name: 'Paris'
};

export enum APIRoute {
  Login = '/login',
  Logout = '/logout',
  Offers = '/hotels'
}
