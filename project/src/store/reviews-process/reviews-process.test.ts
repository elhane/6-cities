import {reviewsProcess} from './reviews-process';
import {ReviewsProcess} from '../../types/state';
import {fetchOfferReviewsAction, postOfferReviewAction} from '../api-actions';
import {makeFakeReviews} from '../../mocks';

const reviews = makeFakeReviews();

describe('Reducer: reviewsProcess', () => {
  let state: ReviewsProcess;

  beforeEach(() => {
    state = {
      reviews: [],
      isShowSpinner: false
    };
  });

  describe('fetchOfferReviewsAction test', () => {
    it('should add reviews to state, change isShowSpinner to false', () => {
      expect(reviewsProcess.reducer(state, {type: fetchOfferReviewsAction.fulfilled.type, payload: reviews }))
        .toEqual({reviews: reviews, isShowSpinner: false});
    });
  });

  describe('postOfferReviewAction test', () => {
    it('should change isShowSpinner to true', () => {
      expect(reviewsProcess.reducer(state, {type: postOfferReviewAction.pending.type}))
        .toEqual({...state, isShowSpinner: true});
    });

    it('should change isShowSpinner to false', () => {
      expect(reviewsProcess.reducer(state, {type: postOfferReviewAction.fulfilled.type}))
        .toEqual({...state, isShowSpinner: false});
    });
  });

});
