import {Offer} from '../../types/offer';
import {useState} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {getPercentRatio} from '../../utils';
import {MAX_RATING} from '../../const';

type PlaceCardProps = {
  offer: Offer;
  isFavoritesListCard?: boolean;
  isCitiesListCard?: boolean;
  isNearPlacesListCard?: boolean;
}

function PlaceCard(props: PlaceCardProps):JSX.Element {
  const {offer, isCitiesListCard, isFavoritesListCard, isNearPlacesListCard} = props;
  const {previewImage, price, title, type, id, isPremium, rating} = offer;
  const [isCardActive, setIsCardActive] = useState(false);

  const cardClass = classNames({
    'place-card': true,
    'cities__card': isCitiesListCard,
    'favorites__card': isFavoritesListCard,
    'near-places__card': isNearPlacesListCard,
    'active': isCardActive
  });

  const imageWrapperClass = classNames({
    'place-card__image-wrapper': true,
    'cities__image-wrapper': isCitiesListCard,
    'favorites__image-wrapper': isFavoritesListCard,
    'near-places__image-wrapper': isNearPlacesListCard
  });

  const cardInfoClass = classNames({
    'place-card__info': true,
    'favorites__card-info': isFavoritesListCard
  });

  const handleCardMouseOver = () => {
    setIsCardActive(true);
  };

  const handleCardMouseOut = () => {
    setIsCardActive(false);
  };

  return (
    <article className={cardClass} onMouseOver={handleCardMouseOver} onMouseOut={handleCardMouseOut}>
      { isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div> }

      <div className={imageWrapperClass}>
        <Link to={`/room/${id}`}>
          <img className="place-card__image"
            src={previewImage}
            width={isCitiesListCard || isNearPlacesListCard ? '260' : '150' }
            height={isCitiesListCard ? '200' : '110' }
            alt="Place image"
          />
        </Link>
      </div>
      <div className={cardInfoClass}>

        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getPercentRatio(rating, MAX_RATING)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`/room/${id}`}>{title}</Link>
        </h2>

        <p className="place-card__type">{type}</p>

      </div>
    </article>
  );
}

export default PlaceCard;
