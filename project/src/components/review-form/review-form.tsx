import './review-form.css';
import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchOfferReviewsAction, postOfferReviewAction} from '../../store/api-actions';
import FormError from '../form-error/form-error';
import Spinner from '../spinner/spinner';
import {getSpinnerStatus} from '../../store/reviews-process/selectors';

function ReviewForm() {
  const [formData, setFormData] = useState({rating: 0, comment: ''});
  const [formErrors, setFormErrors] = useState({rating: '', comment: ''});
  const [formValid, setFormValid] = useState(false);
  const [reviewValid, setReviewValid] = useState(false);
  const [ratingValid, setRatingValid ] = useState(false);
  const dispatch = useAppDispatch();
  const params = useParams();
  const offerId = params.id;
  const isShowSpinner = useAppSelector(getSpinnerStatus);

  const validateField = (fieldName: string, value: string) => {
    switch(fieldName) {
      case 'comment':
        validateTextarea(value);
        break;
      case 'rating':
        validateRating();
        break;
    }
  };

  const validateRating = () => {
    if (Number(formData.rating) === 0) {
      setRatingValid(false);
      setFormErrors({...formErrors, rating: 'the rating is not selected'});
    } else {
      setRatingValid(true);
      setFormErrors({...formErrors, rating: ''});
    }
  };

  const validateTextarea = (value: string) => {
    switch (true) {
      case (value.length < MIN_COMMENT_LENGTH || value.length === 0):
        setReviewValid(false);
        setFormErrors({...formErrors, comment: reviewValid ? '' : 'too short, the comment must contain at least 50 characters'});
        break;
      case value.length > MAX_COMMENT_LENGTH:
        setReviewValid(false);
        setFormErrors({...formErrors, comment: reviewValid ? '' : 'too long, the comment must contain no more than 500 characters'});
        break;
      case (value.length > MIN_COMMENT_LENGTH && value.length < MAX_COMMENT_LENGTH):
        setReviewValid(true);
        setFormErrors({rating: '', comment: ''});
        break;
    }
  };

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    validateField(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (formValid) {
      dispatch(postOfferReviewAction([offerId, formData]));
      dispatch(fetchOfferReviewsAction(offerId));
      evt.currentTarget.reset();
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setFormValid(reviewValid && ratingValid);
    }

    return () => {
      isMounted = false;
    };
  }, [reviewValid, ratingValid]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      validateRating();
    }
    return () => {
      isMounted = false;
    };
  }, [formData]);

  return (
    <>
      { isShowSpinner ? <Spinner /> : '' }
      <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          { Array.from({length: 5}).map((_, index) => {
            const keyValue = 5 - index;

            return (
              <React.Fragment key={keyValue}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={keyValue}
                  id={`${keyValue}-star`}
                  type="radio"
                  onChange={handleFieldChange}
                />
                <label
                  htmlFor={`${keyValue}-star`}
                  className="reviews__rating-label form__rating-label"
                  title="perfect"
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </React.Fragment>
            );
          }) }
          {!ratingValid ? <FormError error={formErrors.rating} extraClass={'reviews__error reviews__error--rating'}/> : null}
        </div>
        <label className="reviews__label">
          <textarea
            className="reviews__textarea form__textarea"
            id="review"
            name="comment"
            placeholder="Tell how was your stay, what you like and what can be improved"
            onChange={handleFieldChange}
          >
          </textarea>
          {!reviewValid ? <FormError error={formErrors.comment} extraClass={'reviews__error'}/> : null}
        </label>

        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and
            describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={!formValid}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default ReviewForm;
