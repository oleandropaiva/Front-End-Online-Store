import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import Cart from '../../pages/Cart';
import Product from '../../pages/Product';
import Checkout from '../../pages/Checkout';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayObjectInfo: [],
    };
  }

  addToCart = (objectFrom) => {
    const { arrayObjectInfo } = this.state;
    if (arrayObjectInfo.some((each) => each.id === objectFrom.id)) {
      this.calcAmount(objectFrom, arrayObjectInfo);
    } else {
      this.setState((prev) => ({
        arrayObjectInfo: ([...prev.arrayObjectInfo, { ...objectFrom, itemAmount: 1 }]),
      }));
    }
  }

  calcAmount = (objectFrom, arrayObjectInfo) => {
    arrayObjectInfo
      .find((obj) => obj.id === objectFrom.id).itemAmount += arrayObjectInfo
        .reduce((acc, obj) => (obj.id === objectFrom.id ? acc + 1 : acc), 0);
    this.setState({ arrayObjectInfo });
  }

  calcAmountLess = ({ target: { id } }) => {
    const { arrayObjectInfo } = this.state;
    arrayObjectInfo
      .find((obj) => obj.id === id).itemAmount -= arrayObjectInfo
        .reduce((acc, obj) => (obj.id === id ? acc + 1 : acc), 0);
    this.setState({ arrayObjectInfo });
  }

  removeItemFromCart = ({ target: { id } }) => {
    this.setState(({ arrayObjectInfo }) => ({
      arrayObjectInfo: arrayObjectInfo.filter((item) => item.id !== id),
    }));
  }

  render() {
    const { arrayObjectInfo } = this.state;
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
                addToCart={ this.addToCart }
                removeItemFromCart={ this.removeItemFromCart }
                calcAmountLess={ this.calcAmountLess }
                cartListObject={ arrayObjectInfo }
              />) }
          />
          <Route
            exact
            path="/product/:id"
            render={ (props) => <Product { ...props } addToCart={ this.addToCart } /> }
          />
          <Route
            exact
            path="/checkout"
            render={ () => <Checkout productList={ arrayObjectInfo } /> }
          />
        </Switch>
      </div>
    );
  }
}
