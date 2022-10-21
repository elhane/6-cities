import React from 'react';
import {Cities} from '../../types/offer';
import {useAppDispatch} from '../../hooks';
import {setActiveCity} from '../../store/action';
import CityButton from '../city-button/city-button';

type CityTabsProps = {
  cities: Cities;
}

function CityTabs(props: CityTabsProps):JSX.Element {
  const dispatch = useAppDispatch();
  const {cities} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.length ? (
        cities.map((city) => (
          <li className="locations__item" key={city}>
            <CityButton
              city={city}
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
