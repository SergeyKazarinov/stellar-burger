import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './services';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store} >
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
