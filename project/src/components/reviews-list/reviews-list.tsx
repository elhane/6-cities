import Review from '../review/review';
import {useAppSelector} from '../../hooks';
import {getReviews} from '../../store/reviews-process/selectors';

function ReviewsList():JSX.Element {
  const reviews = useAppSelector(getReviews);

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
