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
