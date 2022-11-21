import './sorting.css';
import {useState,memo} from 'react';
import classNames from 'classnames';
import {options} from '../../services/sorting';

type SortingProps = {
  onMouseClick: (option: string) => void;
}

function Sorting({ onMouseClick }: SortingProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState('popular');
  const [isOpened, setIsOpened] = useState(false);

  const optionsClass = classNames({
    'places__options': true,
    'places__options--custom': true,
    'places__options--opened': isOpened
  });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened(!isOpened)}
      >
        {selectedOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={optionsClass}>
        { options.map((option) => (
          <li
            className={classNames({
              'places__option': true,
              'places__option--active': option.type === selectedOption
            })}
            tabIndex={0}
            key={option.type}
            onClick={() => {
              setSelectedOption(option.name);
              onMouseClick(option.type);
              setIsOpened(false);
            }}
          >
            {option.name}
          </li> )) }
      </ul>
    </form>
  );
}

export default memo(Sorting);
