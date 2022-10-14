import {Offers} from '../types/offer';

export const offers: Offers = [
  {
    id: '1',
    images: [
      {
        src: 'img/apartment-01.jpg'
      },
      {
        src: 'img/apartment-03.jpg'
      },
      {
        src: 'img/apartment-02.jpg'
      },
    ],
    title: 'Beautiful & luxurious apartment at great location',
    bedrooms: 4,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    isPremium: false,
    placeType: 'Private room',
    rating: 4.5,
    maxAdults: 4,
    pricePerNight: 120,
    facilities: [
      'Wifi', 'Heating', 'Kitchen', 'Cable TV'
    ],
    isFavorite: false,
    host: {
      hostAvatar: 'img/avatar-angelina.jpg',
      hostName: 'Melissa',
      isPro: false
    },
    previewImage: 'img/apartment-01.jpg',
    lat: 52.3909553943508,
    lng: 4.85309666406198
  },
  {
    id: '2',
    images: [
      {
        src: 'img/apartment-02.jpg'
      },
      {
        src: 'img/room.jpg'
      },
      {
        src: 'img/apartment-01.jpg'
      },
    ],
    title: 'Wood and stone place',
    bedrooms: 4,
    description: 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    isPremium: true,
    placeType: 'Apartment',
    rating: 2.3,
    maxAdults: 4,
    pricePerNight: 80,
    facilities: [
      'Wifi', 'Heating', 'Kitchen', 'Cable TV'
    ],
    isFavorite: false,
    host: {
      hostAvatar: 'img/avatar-max.jpg',
      hostName: 'Max',
      isPro: false
    },
    previewImage: 'img/apartment-02.jpg',
    lat: 52.3609553943508,
    lng: 4.85309666406198
  },
  {
    id: '3',
    images: [
      {
        src: 'img/apartment-04.jpg'
      },
      {
        src: 'img/apartment-01.jpg'
      },
      {
        src: 'img/apartment-03.jpg'
      },
    ],
    title: 'Canal View Prinsengracht',
    bedrooms: 4,
    description: 'description',
    isPremium: false,
    placeType: 'Apartment',
    rating: 3.5,
    maxAdults: 4,
    pricePerNight: 132,
    facilities: [
      'Wifi', 'Heating', 'Kitchen', 'Cable TV'
    ],
    isFavorite: false,
    host: {
      hostAvatar: 'img/avatar-angelina.jpg',
      hostName: 'Melissa',
      isPro: false
    },
    previewImage: 'img/apartment-03.jpg',
    lat: 52.3909553943508,
    lng: 4.929309666406198
  },
  {
    id: '4',
    images: [
      {
        src: 'img/studio-photos.jpg'
      },
      {
        src: 'img/studio-01.jpg'
      },
      {
        src: 'img/apartment-01.jpg'
      },
    ],
    title: 'Nice, cozy, warm big bed apartment',
    bedrooms: 4,
    description: '  A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    isPremium: true,
    placeType: 'Apartment',
    rating: 2,
    maxAdults: 4,
    pricePerNight: 180,
    facilities: [
      'Wifi', 'Heating', 'Kitchen', 'Cable TV'
    ],
    isFavorite: false,
    host: {
      hostAvatar: 'img/avatar-angelina.jpg',
      hostName: 'Melissa',
      isPro: false
    },
    previewImage: 'img/apartment-01.jpg',
    lat: 52.3809553943508,
    lng: 4.939309666406198
  },
];
