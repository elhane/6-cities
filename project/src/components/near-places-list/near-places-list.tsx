import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type FavoritesPlacesListProps = {
  offers: Offers;
}

function NearPlacesList(props: FavoritesPlacesListProps):JSX.Element {
  const {offers} = props;

  return (
    <div className="favorites__places">
      {offers.length ? (
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

export default NearPlacesList;
