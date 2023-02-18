import 'scss/app.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from 'components/Header';
import HomePage from 'pages/HomePage';
import NotFoundPage from 'pages/NotFoundPage';
import CartPage from 'pages/CartPage';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/cart'} element={<CartPage />} />
          <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
