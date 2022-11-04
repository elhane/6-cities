import {useParams} from 'react-router-dom';
import ReviewForm from '../../components/review-form/review-form';
import {getPercentRatio} from '../../utils';
import {AuthorizationStatus, MAX_RATING} from '../../const';
import ReviewsList from '../../components/reviews-list/reviews-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchCurrentOfferAction, fetchNearbyOffersAction, fetchOfferReviewsAction} from '../../store/api-actions';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import {getCurrentOffer, getNearbyOffers} from '../../store/offers-process/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getSpinnerStatus} from '../../store/offers-process/selectors';
import Spinner from '../../components/spinner/spinner';
import PlacesList from '../../components/places-list/places-list';

function PlaceScreen():JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const currentOffer = useAppSelector(getCurrentOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isShowSpinner = useAppSelector(getSpinnerStatus);
  const mapOffers = [...nearbyOffers, currentOffer];

  const {
    images,
    title,
    bedrooms,
    description,
    isPremium,
    type,
    rating,
    maxAdults,
    price,
    goods,
    host,
    city
  } = currentOffer;

  useEffect(() => {
    dispatch(fetchCurrentOfferAction(params?.id));
    dispatch(fetchNearbyOffersAction(params?.id));
    dispatch(fetchOfferReviewsAction(params?.id));
  }, [dispatch, params?.id]);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [params?.id]);

  return (
    <>
      { isShowSpinner ? <Spinner /> : '' }
      <div className="page">
        <Header isShowLoginLink />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                { images ? (
                  images.map((image) => (
                    <div className="property__image-wrapper" key={image}>
                      <img className="property__image" src={image} alt="Photo studio" />
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

                  <BookmarkButton placeId={Number(params?.id)} isPropertyPage />
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
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    { goods.length ?
                      goods.map((facility) => (
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
                      <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {host.name}
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
                  <ReviewsList />
                  {authorizationStatus === AuthorizationStatus.Auth ? <ReviewForm /> : null}
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map city={city} offers={mapOffers} selectedOffer={currentOffer}/>
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <PlacesList offers={nearbyOffers} isNearPlacesList/>
            </section>
          </div>
        </main>
      </div>
    </>

  );
}

export default PlaceScreen;
