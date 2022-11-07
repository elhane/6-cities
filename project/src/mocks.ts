import {address ,random, internet, datatype, image} from 'faker';
import {Offer, Offers} from './types/offer';

export const makeFakeCityName = (): string => (address.cityName());

export const makeFakeOffer = ():Offer => (
  {
    bedrooms: 0,
    city: {
      name: address.cityName(),
      location: {
        latitude: Number(address.latitude()),
        longitude: Number(address.longitude()),
        zoom: 12,
      },
    },
    description: random.words(15),
    goods: random.words(9).split(''),
    host: {
      id: datatype.number(),
      name: internet.userName(),
      isPro: false,
      avatarUrl: internet.avatar(),
    },
    id: datatype.number(),
    images: Array.from({length: 6}).map(() => image.imageUrl()),
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: 13,
    },
    maxAdults: datatype.number(),
    previewImage: image.imageUrl(),
    price: datatype.number(1500),
    rating: datatype.number(5),
    title: random.words(4),
    type:  random.word(),
  }
)

export const makeFakeOffers = (): Offers => Array.from({length: datatype.number(10)}).map(() => makeFakeOffer());
