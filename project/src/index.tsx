import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offers} from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// const offersAmount: number = 312;

root.render(
  <React.StrictMode>
    <App offersAmount={312} offers={offers}/>
  </React.StrictMode>,
);
