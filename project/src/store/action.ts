import {createAction} from '@reduxjs/toolkit';
import {Offers, Offer} from '../types/offer';
import {AppRoute, AuthorizationStatus} from '../const';
import {UserType} from '../types/user-data';
import {Reviews} from '../types/reviews';

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');
export const setUserData = createAction<UserType>('user/setUserData');

export const setError = createAction<string | null>('main/setError');
export const redirectToRoute = createAction<AppRoute | string>('main/redirectToRoute');

export const setActiveCity = createAction<string>('offers/setActiveCity');
export const setOffers = createAction<Offers>('offers/setOffers');
export const setCurrentOffer = createAction<Offer>('offers/setCurrentOffer');
export const setNearbyOffers = createAction<Offers>('offers/setNearbyOffers');
export const setBookmarksList = createAction<Offers>('offers/setBookmarksList');
export const setReviews = createAction<Reviews>('reviews/setReviews');

