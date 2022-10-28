import {Offer} from '../types/offer';

export const options = [
  {
    type: 'popular',
    name: 'Popular',
  },
  {
    type: 'cheap',
    name: 'Price: low to high',
  },
  {
    type: 'expensive',
    name: 'Price: high to low',
  },
  {
    type: 'top',
    name: 'Top rated first',
  }
];

export const sortByRating = (offerA:Offer, offerB:Offer) => offerB.rating - offerA.rating;
export const sortByPriceHighToLow = (offerA:Offer, offerB:Offer) => offerB.price - offerA.price;
export const sortByPriceLowToHigh = (offerA:Offer, offerB:Offer) => offerA.price - offerB.price;
