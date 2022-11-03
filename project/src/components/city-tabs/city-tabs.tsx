import React from 'react';
import {Cities} from '../../types/offer';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setActiveCity} from '../../store/offers-process/offers-process';
import CityButton from '../city-button/city-button';
import {getActiveCity} from '../../store/offers-process/selectors';

type CityTabsProps = {
  cities: Cities;
}

function CityTabs(props: CityTabsProps):JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getActiveCity);
  const {cities} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.length ? (
        cities.map((city) => (
          <li className="locations__item" key={city}>
            <CityButton
              city={city}
              isActive={activeCity === city}
              onClick={() => {
                dispatch(setActiveCity(city));
              }}
            />
          </li>
        )))
        :
        ''}
    </ul>
  );
}

export default CityTabs;
