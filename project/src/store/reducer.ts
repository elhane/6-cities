import {createReducer} from '@reduxjs/toolkit';
import {
  loadOffers,
  setActiveCity,
  requireAuthorization,
  setError,
  setUserData, setAuthorizationStatus, setCurrentOffer, setNearbyOffers
} from './action';
import {Offers, Offer} from '../types/offer';
import {AuthorizationStatus} from '../const';
import {UserType} from '../types/user-data';

type InitialStateType = {
  city: string;
  offers: Offers;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  userData: UserType,
  currentOffer: Offer,
  nearbyOffers: Offers;
}

const initialState:InitialStateType = {
  city: 'Paris',
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  userData: {
    name: '',
    email: '',
    id: 0,
    avatarUrl: '',
    isPro: false
  },
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
  nearbyOffers: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
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
    });
});

export {reducer};
