import {AppRoute, AuthorizationStatus, BookmarksAction} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useNavigate} from 'react-router-dom';
import {
  fetchFavoriteOffersAction,
  postOfferFavoriteStatusAction
} from '../../store/api-actions';
import classNames from 'classnames';
import {useEffect} from 'react';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getFavoritesOffers} from '../../store/offers-process/selectors';

type BookmarkButtonProps = {
  placeId: number;
  isPropertyPage?: boolean;
}

function BookmarkButton({placeId, isPropertyPage = false}: BookmarkButtonProps):JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const bookmarksList = useAppSelector(getFavoritesOffers);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOfferInBookmarks = bookmarksList.find((offer) => offer.id === placeId);

  const handleBookmarkButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(postOfferFavoriteStatusAction([placeId, isOfferInBookmarks ? BookmarksAction.Delete : BookmarksAction.Add]));
    } else {
      navigate(AppRoute.Login);
    }
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [authorizationStatus]);

  const placeCardClass = classNames({
    'place-card__bookmark-button': true,
    'place-card__bookmark-button--active': isOfferInBookmarks,
    'property__bookmark-button': isPropertyPage,
    'property__bookmark-button--active': isPropertyPage && isOfferInBookmarks,
    'button': true,
  });

  return (
    <button className={placeCardClass} type="button" onClick={handleBookmarkButtonClick}>
      { isPropertyPage ?
        <svg className="place-card__bookmark-icon" width="31" height="33">
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        :
        <svg className="place-card__bookmark-icon" width="18" height="19">
          <use xlinkHref="#icon-bookmark"></use>
        </svg> }
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
