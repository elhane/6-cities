import {store} from '../store/index.js';
import {AuthorizationStatus} from '../const';
import {UserType} from './user-data';
import {Offer, Offers} from './offer';
import {Reviews} from './reviews';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserType;
  error: string | null;
  isShowSpinner: boolean;
}

export type OffersProcess = {
  city: string;
  offers: Offers;
  currentOffer: Offer,
  nearbyOffers: Offers;
  bookmarksList: Offers;
  isShowSpinner: boolean;
}

export type ReviewsProcess = {
  reviews: Reviews;
  isShowSpinner: boolean;
}
