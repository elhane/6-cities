import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type NearPlacesListProps = {
  offers: Offers;
}

function NearPlacesList(props: NearPlacesListProps):JSX.Element {
  const {offers} = props;
  const filteredOffers = offers.slice(0, 3);

  return (
    <div className="near-places__list places__list">
      {offers.length ? (
        filteredOffers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            isNearPlacesListCard
          />
        ))
      ) : ''}
    </div>
  );
}

export default NearPlacesList;
