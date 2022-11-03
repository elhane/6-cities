import {store} from '../store';
import {setError} from '../store/action';
import {Timeout} from '../const';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  setTimeout(
    () => store.dispatch(setError(null)),
    Timeout.ShowError,
  );
};
