import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offers;
}

function PlacesList(props: PlacesListProps):JSX.Element {
  const {offers} = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.length ? (
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            isCitiesListCard
          />
        ))
      ) : ''}
    </div>
  );
}

export default PlacesList;
