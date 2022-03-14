import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/index';
import Cart from './components/Cart';
import Product from './pages/Product';

class App extends Component {
  constructor() {
    super();

    this.state = {
      productId: [],
    };
  }

  addToCart = (id) => {
    const { productId } = this.state;
    const products = [...productId, id];

    this.setState({ productId: products });
  }

  render() {
    const { productId } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/Cart" render={ () => <Cart productId={ productId } /> } />
          <Route
            exact
            path="/product/:id"
            render={ (props) => <Product { ...props } addToCart={ this.addToCart } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
