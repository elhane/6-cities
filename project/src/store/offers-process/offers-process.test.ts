import {offersProcess} from './offers-process';
import {OffersProcess} from '../../types/state';
import {
  fetchCurrentOfferAction,
  fetchFavoriteOffersAction,
  fetchNearbyOffersAction,
  fetchOffersAction,
} from '../api-actions';
import {setActiveCity} from './offers-process';
import {makeFakeCityName, makeFakeOffer, makeFakeOffers} from '../../mocks';

const city = makeFakeCityName();
const offer = makeFakeOffer();
const offers = makeFakeOffers();

describe('Reducer: offersProcess', () => {
  let state: OffersProcess;

  beforeEach(() => {
    state = {
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
      bookmarksList: [],
      nearbyOffers: [],
      isShowSpinner: false,
    }
  });

  describe('fetchOffersAction test', () => {
    it('should change isShowSpinner to true', () => {
      expect(offersProcess.reducer(state, {type: fetchOffersAction.pending.type}))
        .toEqual({...state, isShowSpinner: true})
    });

    it('should add offers to state, change isShowSpinner to false', () => {
      expect(offersProcess.reducer(state, {
        type: fetchOffersAction.fulfilled.type,
        payload: offers })).toEqual({...state, offers, isShowSpinner: false})
    });
  });

  describe('fetchCurrentOfferAction test', () => {
    it('should add currentOffer to state, change isShowSpinner to false', () => {
      expect(offersProcess.reducer(state, {
        type: fetchCurrentOfferAction.fulfilled.type,
        payload: offer })).toEqual({...state, currentOffer: offer, isShowSpinner: false})
    });
  });

  describe('fetchNearbyOffersAction test', () => {
    it('should add nearby offers to state, change isShowSpinner to false', () => {
      expect(offersProcess.reducer(state, {
        type: fetchNearbyOffersAction.fulfilled.type,
        payload: offers })).toEqual({...state, nearbyOffers: offers, isShowSpinner: false})
    });
  });

  describe('fetchFavoriteOffersAction test', () => {
    it('should add bookmark offers to state, change isShowSpinner to false', () => {
      expect(offersProcess.reducer(state, {
        type: fetchFavoriteOffersAction.fulfilled.type,
        payload: offers })).toEqual({...state, bookmarksList: offers, isShowSpinner: false})
    });
  });

  describe('setActiveCity test', () => {
    it('should change city', () => {
      expect(offersProcess.reducer(state, {type: setActiveCity.type, payload: city }))
        .toEqual({...state, city})
    });
  });
});
