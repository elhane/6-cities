import React, {MouseEventHandler} from 'react';
import classNames from 'classnames';
import './city-button.css';

type CityButtonProps = {
  city: string;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
}

function CityButton(props: CityButtonProps):JSX.Element {
  const {city, onClick, isActive} = props;

  const buttonClass = classNames({
    'locations__item-link': true,
    'tabs__item': true,
    'active': isActive
  });

  return (
    <button className={buttonClass} onClick={onClick}>
      <span>{city}</span>
    </button>
  );
}

export default CityButton;
