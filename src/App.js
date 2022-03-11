import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './components/Cart';
import Product from './pages/Product';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/Cart" component={ Cart } />
          <Route exact path="/product/:id" component={ Product } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
