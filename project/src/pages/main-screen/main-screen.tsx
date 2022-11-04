import './main-screen.css';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import CityTabs from '../../components/city-tabs/city-tabs';
import {CITIES, DEFAULT_CITY_DATA} from '../../const';
import Header from '../../components/header/header';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect, useState} from 'react';
import {fetchOffersAction} from '../../store/api-actions';
import Sorting from '../../components/sorting/sorting';
import {
  sortByPriceHighToLow,
  sortByPriceLowToHigh,
  sortByRating
} from '../../services/sorting';
import {Offers, Offer} from '../../types/offer';
import {getActiveCity, getOffers} from '../../store/offers-process/selectors';

function MainScreen():JSX.Element {
  const offers = useAppSelector(getOffers);
  const activeCity = useAppSelector(getActiveCity);
  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);
  const activeCityData = filteredOffers[0] ? filteredOffers[0].city : DEFAULT_CITY_DATA;
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState('popular');
  const [activeCard, setActiveCard] = useState<Offer | null>(null);

  const getSortedOffers = (option: string) => {
    switch (option) {
      case 'popular':
        return filteredOffers;
      case 'expensive':
        return offers.map((item) => item).sort(sortByPriceHighToLow);
      case 'cheap':
        return offers.map((item) => item).sort(sortByPriceLowToHigh);
      case 'top':
        return offers.map((item) => item).sort(sortByRating);
    }
  };

  const sortedOffers = getSortedOffers(selectedOption);

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

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
                  offers={filteredOffers}
                  selectedOffer={activeCard}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
