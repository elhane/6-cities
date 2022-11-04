import {Offers, Offer} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import classNames from 'classnames';

type PlacesListProps = {
  offers: Offers;
  onMouseOver?: (offer: Offer) => void;
  onMouseOut?: () => void;
  isCitiesList?: boolean
  isFavoritesList?:boolean;
  isNearPlacesList?:boolean;
}

function PlacesList(props: PlacesListProps):JSX.Element {
  const {offers, onMouseOver, onMouseOut, isCitiesList, isFavoritesList, isNearPlacesList} = props;

  const listClass = classNames({
    'cities__places-list places__list tabs__content': isCitiesList,
    'favorites__places': isFavoritesList,
    'near-places__list places__list': isNearPlacesList
  });

  return (
    <div className={listClass}>
      {offers.length ? (
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            isCitiesListCard={isCitiesList}
            isFavoritesListCard={isFavoritesList}
            isNearPlacesListCard={isNearPlacesList}
            onMouseOver={() => onMouseOver ? onMouseOver(offer) : null }
            onMouseOut={onMouseOut}
          />
        ))
      ) : ''}
    </div>
  );
}

export default PlacesList;
