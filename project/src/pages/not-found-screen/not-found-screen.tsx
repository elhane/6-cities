import { Link } from 'react-router-dom';
import './not-found-page.css';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="not-found-page">
      <div className="page-content">

        <div className="not-found-page__content">
          <p className="not-found-page__text">404 - page not found</p>
          <Link className="not-found-page__link" to='/'>
            Return to main page
          </Link>
        </div>


      </div>
    </div>
  );
}

export default NotFoundScreen;
