import { Link } from 'react-router-dom';
import './not-found-page.css';
import Header from '../../components/header/header';
import {AppRoute} from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="not-found-page">
      <Header />
      <div className="not-found-page__content">
        <p className="not-found-page__text">404 - page not found</p>
        <Link className="not-found-page__link" to={AppRoute.Root}>
          Return to main page
        </Link>
      </div>
    </div>
  );
}

export default NotFoundScreen;
