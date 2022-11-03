import {State} from '../../types/state';
import {NameSpace} from '../../const';
import {Reviews} from '../../types/reviews';

export const getReviews = (state: State): Reviews => state[NameSpace.Reviews].reviews;
export const getSpinnerStatus = (state: State): boolean => state[NameSpace.Reviews].isShowSpinner;
