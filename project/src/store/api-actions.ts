import {AppDispatch, State} from '../types/state.js';
import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute, AppRoute} from '../const';
import {redirectToRoute} from './action';
import {UserData, UserType} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken} from '../services/token';
import {Offer, Offers} from '../types/offer';
import {ReviewData, Reviews} from '../types/reviews';

type asyncThunkConfigType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const checkAuthAction = createAsyncThunk<UserType, undefined, asyncThunkConfigType>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data: { name, email, id, avatarUrl }} = await api.get(APIRoute.Login);
    return { name, email, id, avatarUrl };
  }
);

export const loginAction = createAsyncThunk<UserType, AuthData, asyncThunkConfigType>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: { token, name, id, avatarUrl }} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Root));
    return { name, email, id, avatarUrl };
  },
);

export const logoutAction = createAsyncThunk<void, undefined, asyncThunkConfigType>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const fetchOffersAction = createAsyncThunk<Offers, undefined, asyncThunkConfigType>(
  'offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchCurrentOfferAction = createAsyncThunk<Offer, string | undefined, asyncThunkConfigType>('offers/fetchCurrentOffer',
  async (id, {extra: api }) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<Offers, string | undefined, asyncThunkConfigType>('offers/fetchNearbyOffers',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
    return data;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offers, undefined, asyncThunkConfigType>('offers/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Favorite);
    return data;
  }
);

export const postOfferFavoriteStatusAction = createAsyncThunk<Offers, [number, number], asyncThunkConfigType>(
  'offers/postOfferFavoriteStatus',
  async ([offerId, offerStatus], {extra: api}) => {
    await api.post(`${APIRoute.Favorite}/${offerId}/${offerStatus}`);
    const {data} = await api.get<Offers>(APIRoute.Favorite);
    return data;
  }
);

export const fetchOfferReviewsAction = createAsyncThunk<Reviews, string | undefined, asyncThunkConfigType>('reviews/fetchOfferReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Reviews}/${id}`);
    return data;
  }
);


export const postOfferReviewAction = createAsyncThunk<void, [(string | undefined), ReviewData], asyncThunkConfigType>('reviews/postOfferReview',
  async ([offerId, {comment, rating}], {extra: api}) => {
    await api.post<ReviewData>(`${APIRoute.Reviews}/${offerId}`, {comment,rating});
  }
);
