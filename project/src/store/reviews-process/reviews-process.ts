import {ReviewsProcess} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {fetchOfferReviewsAction, postOfferReviewAction} from '../api-actions';

const initialState: ReviewsProcess = {
  reviews: [],
  isShowSpinner: false,
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferReviewsAction.pending, (state) => {
        // loader true
      })
      .addCase(fetchOfferReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        // loader false
      })
      .addCase(postOfferReviewAction.pending, (state) => {
        // loader true
      })
      .addCase(postOfferReviewAction.fulfilled, (state) => {
        // loader false
      })
      .addCase(postOfferReviewAction.rejected, (state) => {
        // loader false
      });
  }
});
