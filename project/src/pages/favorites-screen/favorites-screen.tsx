import './favorites-screen.css';
import Header from '../../components/header/header';
import {useAppDispatch, useAppSelector} from '../../hooks';
import Footer from '../../components/footer/footer';
import {getFavoritesOffers, getSpinnerStatus} from '../../store/offers-process/selectors';
import {useEffect} from 'react';
import {fetchFavoriteOffersAction} from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import PlacesList from '../../components/places-list/places-list';

function FavoritesScreen():JSX.Element {
  const bookmarkOffers = useAppSelector(getFavoritesOffers);
  const cities = bookmarkOffers.map((offer) => offer.city.name);
  const citiesSet = Array.from(new Set(cities));
  const dispatch = useAppDispatch();
  const isShowSpinner = useAppSelector(getSpinnerStatus);

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  return (
    <>
      {isShowSpinner ? <Spinner /> : ''}
      <div className={`page ${bookmarkOffers.length === 0 ? 'page--favorites-empty' : ''}`}>
        <Header isShowLoginLink />
        <main className={`page__main page__main--favorites ${bookmarkOffers.length === 0 ? 'page__main--favorites-empty' : ''}`}>
          <div className="page__favorites-container container">
            <section className={`favorites ${bookmarkOffers.length === 0 ? 'favorites--empty' : ''}`}>
              { bookmarkOffers.length ? (
                <>
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    { citiesSet.map((city) => (
                      <li className="favorites__locations-items" key={city}>
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" href="#">
                              <span>{city}</span>
                            </a>
                          </div>
                        </div>
                        <PlacesList
                          offers={bookmarkOffers.filter((offer) => offer.city.name === city)}
                          isFavoritesList
                        />
                      </li>
                    )) }
                  </ul>
                </>
              ) :
                <>
                  <h1 className="visually-hidden">Favorites (empty)</h1>
                  <div className="favorites__status-wrapper">
                    <b className="favorites__status">Nothing yet saved.</b>
                    <p className="favorites__status-description">Save properties to narrow
                      down search or plan your future trips.
                    </p>
                  </div>
                </> }
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>

  );
}

export default FavoritesScreen;
