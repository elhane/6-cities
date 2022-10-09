import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import {MIN_COMMENT_LENGTH} from '../../const';

function ReviewForm() {
  const [formData, setFormData] = useState({rating: '0', review: ''});
  // const [formErrors, setFormErrors] = useState({rating: '', review: ''});
  const [formValid, setFormValid] = useState(false);
  const [reviewValid, setReviewValid] = useState(false);
  const [ratingValid, setRatingValid ] = useState(false);

  const validateField = (fieldName: string, value: string) => {
    switch(fieldName) {
      case 'review':
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
    } else {
      setRatingValid(true);
    }
  };

  const validateTextarea = (value: string) => {
    if (value.length < MIN_COMMENT_LENGTH || value.length === 0) {
      setReviewValid(false);
    } else {
      setReviewValid(true);
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
      // console.debug('valid form');
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

      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFieldChange}
      >
      </textarea>

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
  );
}

export default ReviewForm;
