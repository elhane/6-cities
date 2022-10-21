import Review from '../review/review';
import {ReviewType} from '../../types/reviews';

function ReviewsList():JSX.Element {
  const reviews:ReviewType[] = [
    {
      comment: 'string',
      date: 'string',
      id: 4,
      rating: 6,
      user: {
        avatarUrl: 'string',
        id: 7,
        isPro: true,
        name: 'string',
      }
    }
  ];

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
