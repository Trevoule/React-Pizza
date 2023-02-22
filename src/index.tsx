import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/rootStore';
import App from './App';
import { ReactComponent as SVGSprite } from 'assets/icons/sprite.svg';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <SVGSprite />
    </BrowserRouter>
  </Provider>
);
