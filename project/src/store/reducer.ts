import {createReducer} from '@reduxjs/toolkit';
import {
  setOffers,
  setActiveCity,
  requireAuthorization,
  setError,
  setUserData,
  setAuthorizationStatus,
  setCurrentOffer,
  setNearbyOffers,
  setBookmarksList, setReviews
} from './action';
import {Offers, Offer} from '../types/offer';
import {AuthorizationStatus} from '../const';
import {UserType} from '../types/user-data';
import {Reviews} from '../types/reviews';

type InitialStateType = {
  authorizationStatus: AuthorizationStatus;
  userData: UserType,
  error: string | null;
  city: string;
  offers: Offers;
  currentOffer: Offer,
  nearbyOffers: Offers;
  bookmarksList: Offers;
  reviews: Reviews;
}

const initialState:InitialStateType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    name: '',
    email: '',
    id: 0,
    avatarUrl: '',
    isPro: false
  },
  error: null,
  city: 'Paris',
  offers: [],
  currentOffer: {
    bedrooms: 0,
    city: {
      name: '',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0,
      },
    },
    description: '',
    goods: [],
    host: {
      id: 0,
      name: '',
      isPro: false,
      avatarUrl: '',
    },
    id: 0,
    images: [],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
    maxAdults: 0,
    previewImage: '',
    price: 0,
    rating: 0,
    title: '',
    type: '',
  },
  nearbyOffers: [],
  bookmarksList: [],
  reviews: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization,(state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setBookmarksList, (state, action) => {
      state.bookmarksList = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    });
});

export {reducer};
