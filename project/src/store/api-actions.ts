import {AppDispatch, State} from '../types/state.js';
import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../const';
import {
  loadOffers,
  redirectToRoute,
  requireAuthorization,
  setAuthorizationStatus, setBookmarksList, setCurrentOffer,
  setError, setNearbyOffers, setUserData
} from './action';
import {store} from './';
import {UserData, UserType} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken} from '../services/token';
import {Offer, Offers} from '../types/offer';

type asyncThunkConfigType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const checkAuthAction = createAsyncThunk<void, undefined, asyncThunkConfigType>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: { name, email, id, avatarUrl }} = await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData({name, email, id, avatarUrl }));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const clearErrorAction = createAsyncThunk(
  'main/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const loginAction = createAsyncThunk<UserType, AuthData, asyncThunkConfigType>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: { token, name, id, avatarUrl }} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserData({name, email, id, avatarUrl }));
    dispatch(redirectToRoute(AppRoute.Root));
    return { name, email, id, avatarUrl };
  },
);

export const logoutAction = createAsyncThunk<void, undefined, asyncThunkConfigType>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, asyncThunkConfigType>(
  'offers/fetchOffers',
  async (_arg, {dispatch,extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(data));
  },
);

export const fetchCurrentOfferAction = createAsyncThunk<void, string | undefined, asyncThunkConfigType>('offers/fetchCurrentOffer',
  async (id, {dispatch, extra: api }) => {
    try {
      const {data: currentOffer} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      dispatch(setCurrentOffer(currentOffer));
    } catch {
      //
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string | undefined, asyncThunkConfigType>('offers/fetchNearbyOffers',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data: nearbyOffers} = await api.get<Offers>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
      dispatch(setNearbyOffers(nearbyOffers));
    } catch {
      //
    }
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offers, undefined, asyncThunkConfigType>('offers/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Favorite);
    setBookmarksList(data);
    return data;
  }
);

export const postOfferFavoriteStatusAction = createAsyncThunk<Offers, [number, number], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/postOfferFavoriteStatus',
  async ([offerId, offerStatus], {extra: api}) => {
    await api.post(`${APIRoute.Favorite}/${offerId}/${offerStatus}`);
    const {data} = await api.get<Offers>(APIRoute.Favorite);
    setBookmarksList(data);
    return data;
  }
);
