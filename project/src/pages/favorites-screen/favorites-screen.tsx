import './favorites-screen.css';
import FavoritesPlacesList
  from '../../components/favorites-places-list/favorites-places-list';
import Header from '../../components/header/header';
import {useAppSelector} from '../../hooks';
import Footer from '../../components/footer/footer';


function FavoritesScreen():JSX.Element {
  const bookmarkOffers = useAppSelector((state) => state.bookmarksList);
  const cities = bookmarkOffers.map((offer) => offer.city.name);
  const citiesSet = Array.from(new Set(cities));

  return (
    <div className="page">
      <Header isShowLoginLink />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            { bookmarkOffers.length ? (
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
                    <FavoritesPlacesList
                      offers={bookmarkOffers.filter((offer) => offer.city.name === city)}
                    />
                  </li>
                )) }
              </ul>
            ) : <p className="favorites__empty-message">Nothing yet saved</p> }
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FavoritesScreen;
