import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Header from '../components/header';
import PrivateRoute from '../components/private-router';
import Login from './login';
import Register from './register';
import ListTodo from './todos/todo-list';
import FormTodo from './todos/todo-form';

const Main = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute path="/list">
            <ListTodo />
          </PrivateRoute>
          <PrivateRoute path="/create">
            <FormTodo />
          </PrivateRoute>
          <PrivateRoute path="/edit/:id">
            <FormTodo />
          </PrivateRoute>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default Main;
