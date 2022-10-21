import './form-error.css';

type FormErrorProps = {
  error: string
}

function FormError({ error }: FormErrorProps): JSX.Element {
  return (
    <div className='form-error'>
      <p>{ error }</p>
    </div>
  );
}

export default FormError;
