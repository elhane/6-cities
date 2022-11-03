import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../const';

export const setError = createAction<string | null>('main/setError');
export const redirectToRoute = createAction<AppRoute | string>('main/redirectToRoute');
