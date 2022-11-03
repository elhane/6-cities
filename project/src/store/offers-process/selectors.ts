import {State} from '../../types/state';
import {NameSpace} from '../../const';
import {Offer, Offers} from '../../types/offer';

export const getActiveCity = (state: State): string => state[NameSpace.Offers].city;
export const getOffers = (state: State): Offers => state[NameSpace.Offers].offers;
export const getCurrentOffer = (state: State): Offer => state[NameSpace.Offers].currentOffer;
export const getNearbyOffers = (state: State): Offers => state[NameSpace.Offers].nearbyOffers;
export const getFavoritesOffers = (state: State): Offers => state[NameSpace.Offers].bookmarksList;
// export const getSpinnerStatus = (state: State): boolean => state[NameSpace.Data].isShowSpinner;
