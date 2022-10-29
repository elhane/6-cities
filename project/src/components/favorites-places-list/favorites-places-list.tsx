import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type NearPlacesListProps = {
  offers: Offers;
}

function FavoritesPlacesList({offers}: NearPlacesListProps):JSX.Element {

  return (
    <div className="favorites__places">
      {FavoritesPlacesList.length ? (
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            isFavoritesListCard
          />
        ))
      ) : ''}
    </div>
  );
}

export default FavoritesPlacesList;
