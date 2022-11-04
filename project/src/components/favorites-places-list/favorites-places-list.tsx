import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import {useAppSelector} from '../../hooks';
import {getNearbyOffers} from '../../store/offers-process/selectors';

type NearPlacesListProps = {
  offers: Offers;
}

function NearPlacesList({offers}: NearPlacesListProps):JSX.Element {
  const nearbyOffersList = useAppSelector(getNearbyOffers);

  return (
    <div className="near-places__list places__list">
      {nearbyOffersList.length ? (
        offers.map((offer) => (
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
