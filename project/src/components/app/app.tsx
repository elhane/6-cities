import MainScreen from '../../pages/mainScreen/mainScreen';

type AppProps = {
  offersAmount: number;
}

function App({offersAmount}: AppProps): JSX.Element {
  return <MainScreen offersAmount={offersAmount} />;
}

export default App;
