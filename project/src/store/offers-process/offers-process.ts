import {OffersProcess} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {
  fetchCurrentOfferAction, fetchFavoriteOffersAction,
  fetchNearbyOffersAction,
  fetchOffersAction, postOfferFavoriteStatusAction
} from '../api-actions';

const initialState: OffersProcess = {
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
  isShowSpinner: false
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        //state.loader = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        //state.loader = false;
      })
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        //state.loader = true;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        //state.loader = false;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        //state.loader = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        //state.loader = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        //state.loader = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.bookmarksList = action.payload;
        //state.loader = false;
      })
      .addCase(postOfferFavoriteStatusAction.fulfilled, (state, action) => {
        state.bookmarksList = action.payload;
        //state.loader = false;
      });
  }
});
