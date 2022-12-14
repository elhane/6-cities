import './header.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';
import {logoutAction} from '../../store/api-actions';
import {getAuthorizationStatus, getUserData} from '../../store/user-process/selectors';
import {getFavoritesOffers} from '../../store/offers-process/selectors';
import {memo} from 'react';

type HeaderProps = {
  isShowLoginLink?: boolean,
}

function Header({isShowLoginLink = true}: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);
  const bookmarkOffers = useAppSelector(getFavoritesOffers);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root} className="header__logo-link">
              <img className="header__logo" src="/6-cities/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              { authorizationStatus === AuthorizationStatus.Auth ?
                <>
                  <li className="header__nav-item user">
                    <Link to={AppRoute.Favourites} className="header__nav-link header__nav-link--profile">
                      <div
                        className="header__avatar-wrapper user__avatar-wrapper"
                        style={{
                          backgroundImage: `url(${userData.avatarUrl})`,
                          borderRadius: '50%'
                        }}
                      >
                      </div>
                      <span className="header__user-name user__name">{userData.email}</span>
                      <span className="header__favorite-count">{bookmarkOffers.length}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      to="/"
                      className="header__nav-link"
                      onClick={(evt) => {
                        evt.preventDefault();
                        dispatch(logoutAction());
                      }}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>
                :
                <li className="header__nav-item">
                  { isShowLoginLink &&
                    <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link> }
                </li> }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
