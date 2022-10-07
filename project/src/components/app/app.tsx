import MainScreen from '../../pages/main-screen/main-screen';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import {AppRoute, AuthorizationStatus} from '../../const';
import RoomScreen from '../../pages/room-screen/room-screen';
import PrivateRoute from '../private-route/private-route';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';

type AppProps = {
  offersAmount: number;
}

function App({offersAmount}: AppProps): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainScreen offersAmount={offersAmount} />}/>
        <Route path={AppRoute.Room} element={<RoomScreen />}/>
        <Route path={AppRoute.Login} element={<LoginScreen />}/>
        <Route path={AppRoute.Favourites} element=
          {
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
