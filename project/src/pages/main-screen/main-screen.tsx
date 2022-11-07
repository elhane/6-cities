import './main-screen.css';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import CityTabs from '../../components/city-tabs/city-tabs';
import {CITIES, DEFAULT_CITY_DATA} from '../../const';
import Header from '../../components/header/header';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {fetchFavoriteOffersAction, fetchOffersAction} from '../../store/api-actions';
import Sorting from '../../components/sorting/sorting';
import {
  sortByPriceHighToLow,
  sortByPriceLowToHigh,
  sortByRating
} from '../../services/sorting';
import {Offers, Offer} from '../../types/offer';
import {getActiveCity, getFilteredOffers} from '../../store/offers-process/selectors';

function MainScreen():JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const currentOffers = useAppSelector(getFilteredOffers);
  const activeCityData = currentOffers[0] ? currentOffers[0].city : DEFAULT_CITY_DATA;
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState('popular');
  const [activeCard, setActiveCard] = useState<Offer | null>(null);

  const getSortedOffers = useCallback((option: string) => {
    switch (option) {
      case 'popular':
        return currentOffers;
      case 'expensive':
        return currentOffers.map((item) => item).sort(sortByPriceHighToLow);
      case 'cheap':
        return currentOffers.map((item) => item).sort(sortByPriceLowToHigh);
      case 'top':
        return currentOffers.map((item) => item).sort(sortByRating);
    }
  }, [currentOffers]);

  const sortedOffers = useMemo(() => getSortedOffers(selectedOption), [selectedOption, getSortedOffers]);

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${currentOffers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityTabs cities={CITIES}/>
          </section>
        </div>

        <div className="cities">
          <div className={`cities__places-container ${currentOffers.length === 0 ? 'cities__places-container--empty' : ''} container`}>
            { currentOffers.length === 0 ? (
              <>
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any
                      property available at the moment in Dusseldorf
                    </p>
                  </div>
                </section>
                <div className="cities__right-section"></div>
              </>
            ) : (
              <>
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{currentOffers.length} places to stay in {activeCity}</b>
                  <Sorting onMouseClick={setSelectedOption} />
                  <PlacesList
                    offers={sortedOffers as Offers}
                    onMouseOver={setActiveCard}
                    onMouseOut={() => setActiveCard(null)}
                    isCitiesList
                  />
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map
                      city={activeCityData}
                      offers={currentOffers}
                      selectedOffer={activeCard}
                    />
                  </section>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
