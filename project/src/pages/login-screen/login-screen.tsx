import './login-screen.css';
import Header from '../../components/header/header';
import FormLogin from '../../components/form-login/form-login';

function LoginScreen():JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Header isShowLoginLink={false}/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>

            <FormLogin />
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
