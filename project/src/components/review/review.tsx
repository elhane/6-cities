import {getFormattedDate, getPercentRatio} from '../../utils';
import {MAX_RATING} from '../../const';
import {ReviewType} from '../../types/reviews';
import './review.css';

type ReviewProps = {
  review: ReviewType;
}

function Review({review}: ReviewProps):JSX.Element {
  const {id, user, rating, comment, date} = review;

  return (
    <article className="reviews__item" key={id}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name" title={user.name}>{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getPercentRatio(rating, MAX_RATING)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{getFormattedDate(date)}</time>
      </div>
    </article>
  );
}

export default Review;
