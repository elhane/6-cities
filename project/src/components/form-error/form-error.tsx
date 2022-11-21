import './form-error.css';
import {memo} from 'react';

type FormErrorProps = {
  error: string;
  extraClass?: string;
}

function FormError({ error, extraClass = ''}: FormErrorProps): JSX.Element {
  return (
    <div className={`form-error ${extraClass}`}>
      <p>{ error }</p>
    </div>
  );
}

export default memo(FormError);
