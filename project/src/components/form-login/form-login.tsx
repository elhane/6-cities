import FormError from '../form-error/form-error';
import {useAppDispatch} from '../../hooks';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {AuthData} from '../../types/auth-data';
import {loginAction} from '../../store/api-actions';

function FormLogin():JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({loginError: '', passwordError: ''});
  const [formValid, setFormValid] = useState(false);
  const [loginValid, setLoginValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const validations = {
    email: /^([\w.%+-]+)@([\w-]+\.)+(\w{2,})$/i,
    password: /^(?=.*[a-zA-Z])(?=.*\d).{2,}$/g
  };

  const validateField = (fieldName: string, value: string) => {
    switch(fieldName) {
      case 'login':
        setLoginValid(validations.email.test(value));
        setFormErrors( {...formErrors, loginError: loginValid ? '' : 'email is invalid' });
        break;
      case 'password':
        setPasswordValid(validations.password.test(value));
        setFormErrors( {...formErrors, passwordError: passwordValid ? '' : 'password is too short' });
        break;
      default:
        break;
    }
  };

  const onSubmit = (authData: AuthData) => {
    if (formValid) {
      dispatch(loginAction(authData));
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(formData);
  };

  const fieldChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    validateField(name, value);
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setFormValid(loginValid && passwordValid);
  }, [loginValid, passwordValid]);

  return (
    <form
      className="login__form form"
      action="#"
      method="post"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="login"
          placeholder="Email"
          required
          onChange={fieldChangeHandle}
        />
        {!loginValid ? <FormError error={ formErrors.loginError} /> : ''}
      </div>

      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={fieldChangeHandle}
        />
        {!passwordValid ? <FormError error={ formErrors.passwordError} /> : ''}
      </div>

      <button className="login__submit form__submit button" type="submit" disabled={!formValid}>Sign in</button>
    </form>
  );
}

export default FormLogin;
