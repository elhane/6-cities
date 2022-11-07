import {userProcess} from './user-process';
import {UserProcess} from '../../types/state';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import {setError} from './user-process';
import {AuthorizationStatus} from '../../const';
import {makeFakeUserData} from '../../mocks';

describe('Reducer: userProcess', () => {
  let state: UserProcess;
  const userData = makeFakeUserData();

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: {
        name: '',
        email: '',
        id: 0,
        avatarUrl: ''
      },
      error: null,
      isShowSpinner: false,
    }
  });

  describe('checkAuthAction test', () => {
    it('should change authorizationStatus to NO_AUTH', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.rejected.type}))
        .toEqual({...state, authorizationStatus: AuthorizationStatus.NoAuth});
    });

    it('should change authorizationStatus to AUTH, add userData to state', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.fulfilled.type, payload: userData}))
        .toEqual({...state, authorizationStatus: AuthorizationStatus.Auth, userData: userData});
    });
  });

  describe('loginAction test', () => {
    it('should change authorizationStatus to NO_AUTH', () => {
      expect(userProcess.reducer(state, {type: loginAction.rejected.type}))
        .toEqual({...state, authorizationStatus: AuthorizationStatus.NoAuth});
    });

    it('should change authorizationStatus to AUTH, add userData to state', () => {
      expect(userProcess.reducer(state, {type: loginAction.fulfilled.type, payload: userData}))
        .toEqual({...state, authorizationStatus: AuthorizationStatus.Auth, userData: userData});
    });
  });

  describe('logoutAction test', () => {
    it('should change authorizationStatus to NoAuth', () => {
      expect(userProcess.reducer(state, {type: logoutAction.fulfilled.type}))
        .toEqual({...state, authorizationStatus: AuthorizationStatus.NoAuth})
    });
  });
});
