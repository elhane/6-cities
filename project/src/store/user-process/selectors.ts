import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { UserType } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getError = (state: State): string | null => state[NameSpace.User].error;
export const getUserData = (state: State): UserType => state[NameSpace.User].userData;
