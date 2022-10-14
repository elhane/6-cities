export type Host = {
  hostAvatar: string
  hostName: string
  isPro: boolean
}

export type Image = {
  src: string
}

export type Offer = {
  id: string,
  images: Image[],
  title: string,
  bedrooms: number,
  description: string,
  isPremium: boolean,
  placeType: string,
  rating: number,
  maxAdults: number,
  pricePerNight: number,
  facilities: string[]
  isFavorite: boolean,
  host: Host,
  previewImage: string,
  lat: number,
  lng: number
}


export type Offers = Offer[];
