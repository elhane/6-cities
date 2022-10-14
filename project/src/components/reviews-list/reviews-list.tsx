import {reviews} from '../../mocks/reviews';
import Review from '../review/review';

function ReviewsList():JSX.Element {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>

      <ul className="reviews__list">

        { reviews.length ? (
          reviews.map((review) => (

            <li className="reviews__item" key={review.id}>
              <Review review={review} />
            </li>

          ))
        ) : '' }

      </ul>
    </>
  );
}

export default ReviewsList;
