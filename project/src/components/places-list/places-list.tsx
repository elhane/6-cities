import {Offers, Offer} from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offers;
  onMouseOver?: (offer: Offer) => void;
  onMouseOut?: () => void;
}

function PlacesList(props: PlacesListProps):JSX.Element {
  const {offers, onMouseOver, onMouseOut} = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.length ? (
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            isCitiesListCard
            onMouseOver={() => onMouseOver ? onMouseOver(offer) : null }
            onMouseOut={onMouseOut}
          />
        ))
      ) : ''}
    </div>
  );
}

export default PlacesList;
