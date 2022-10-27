import {AppRoute, AuthorizationStatus, BookmarksAction} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useNavigate} from 'react-router-dom';
import {
  fetchFavoriteOffersAction, fetchOffersAction,
  postOfferFavoriteStatusAction
} from '../../store/api-actions';
import classNames from 'classnames';
import {useEffect} from 'react';

type BookmarkButtonProps = {
  placeId: number;
  isFavorite: boolean;
}

function BookmarkButton({placeId, isFavorite}: BookmarkButtonProps):JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const bookmarksList = useAppSelector((state) => state.bookmarksList);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const isOfferInBookmarks = bookmarksList.find((offer) => offer.id === placeId);

  // eslint-disable-next-line no-console
  console.debug('bookmarksList', bookmarksList);

  const handleBookmarkButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(postOfferFavoriteStatusAction([placeId, isFavorite ? BookmarksAction.Delete : BookmarksAction.Add]));
    } else {
      navigate(AppRoute.Login);
    }
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffersAction());
      dispatch(fetchOffersAction());
    }
  }, [dispatch, authorizationStatus]);

  const placeCardClass = classNames({
    'place-card__bookmark-button': true,
    'place-card__bookmark-button--active': isFavorite,
    'button': true,
  });

  return (
    <button className={placeCardClass} type="button" onClick={handleBookmarkButtonClick}>
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
