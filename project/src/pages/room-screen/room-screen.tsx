import {AppRoute} from '../../const';
import {Link, useParams} from 'react-router-dom';
import NearPlacesList from '../../components/favorites-places-list/favorites-places-list';
import {Offers, Offer} from '../../types/offer';
import ReviewForm from '../../components/review-form/review-form';
import {getPercentRatio, getFormattedDate} from '../../utils';
import {MAX_RATING} from '../../const';
import {reviews} from '../../mocks/reviews';

type RoomScreenProps = {
  offers: Offers;
}

function RoomScreen({offers}: RoomScreenProps):JSX.Element {
  const params = useParams();

  const currentOffer = offers.find((offer) => offer.id === params.id) as Offer;

  const {
    images,
    title,
    bedrooms,
    description,
    isPremium,
    placeType,
    rating,
    maxAdults,
    pricePerNight,
    facilities,
    host,
  } = currentOffer;

  // eslint-disable-next-line no-console
  console.debug(reviews);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Root}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              { images ? (
                images.map((image) => (
                  <div className="property__image-wrapper" key={image.src}>
                    <img className="property__image" src={image.src} alt="Photo studio" />
                  </div>
                ))
              ) : '' }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              { isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div> }

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getPercentRatio(rating, MAX_RATING)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {placeType}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{pricePerNight}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  { facilities.length ?
                    facilities.map((facility) => (
                      <li className="property__inside-item" key={facility}>
                        {facility}
                      </li>
                    )) : '' }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host.hostAvatar} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.hostName}
                  </span>
                  { host.isPro ?
                    <span className="property__user-status">
                      Pro
                    </span> : '' }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>

              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ul className="reviews__list">

                  { reviews.length ? (
                    reviews.map((review) => (
                      <li className="reviews__item" key={review.id}>
                        <div className="reviews__user user">
                          <div className="reviews__avatar-wrapper user__avatar-wrapper">
                            <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
                          </div>
                          <span className="reviews__user-name">
                            {review.user.name}
                          </span>
                        </div>
                        <div className="reviews__info">
                          <div className="reviews__rating rating">
                            <div className="reviews__stars rating__stars">
                              <span style={{width: `${getPercentRatio(review.rating, MAX_RATING)}%` }}></span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <p className="reviews__text">
                            {review.comment}
                          </p>
                          <time className="reviews__time" dateTime="2019-04-24">{getFormattedDate(review.date)}</time>
                        </div>
                      </li>
                    ))
                  ) : '' }

                </ul>

                <ReviewForm />

              </section>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">

            <h2 className="near-places__title">Other places in the neighbourhood</h2>

            <NearPlacesList offers={offers} />

          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomScreen;
