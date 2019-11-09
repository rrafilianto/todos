import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';
import Register from './register';
import Login from './login';

const Main = () => {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>

      <Footer />
    </BrowserRouter>
  );
};

export default Main;
