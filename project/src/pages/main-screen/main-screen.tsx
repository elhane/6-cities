import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import CityTabs from '../../components/city-tabs/city-tabs';
import {CITIES, DEFAULT_CITY_DATA} from '../../const';
import Header from '../../components/header/header';
import {useAppSelector} from '../../hooks';
import './main-screen.css';

function MainScreen():JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const activeCity = useAppSelector((state) => state.city);
  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);
  const activeCityData = filteredOffers[0] ? filteredOffers[0].city : DEFAULT_CITY_DATA;

  return (
    <div className="page page--gray page--main">

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityTabs cities={CITIES}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {activeCity}</b>

              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>

              <PlacesList offers={filteredOffers} />

            </section>
            <div className="cities__right-section">

              <section className="cities__map map">
                <Map city={activeCityData} offers={filteredOffers}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
