import './form-error.css';

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

export default FormError;
