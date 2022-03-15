import React, { Component } from 'react';
import './style.css';
import { Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import Cart from '../../pages/Cart';
import Product from '../../pages/Product';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayObjectInfo: [],
    };
  }

  addToCart = (objectFrom) => {
    this.setState(({ arrayObjectInfo }) => ({
      arrayObjectInfo: ([...arrayObjectInfo, objectFrom]),
    }));
  }

  removeItemFromCart = () => {
  }

  render() {
    const { productId, arrayObjectInfo } = this.state;
    return (
      <div className="content-container">
        <Switch>
          <Route
            exact
            path="/"
            render={ () => <Home addToCart={ this.addToCart } /> }
          />
          <Route
            exact
            path="/Cart"
            render={ () => (
              <Cart
                productId={ productId }
                addToCart={ this.addToCart }
                removeFromCart={ this.removeItemFromCart }
                arrayObjectInfo={ arrayObjectInfo }
              />) }
          />
          <Route
            exact
            path="/product/:id"
            render={ (props) => <Product { ...props } addToCart={ this.addToCart } /> }
          />
        </Switch>
      </div>
    );
  }
}
