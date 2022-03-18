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
      amountCart: 0,
    };
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  StorageLimit = (objInfo, objFrom) => {
    const productObj = objInfo.find(({ id }) => id === objFrom.id);
    if (productObj) {
      const { available_quantity: quantity, itemAmount } = productObj;
      return itemAmount < quantity;
    }

    return true;
  }

  addToCart = (objectFrom) => {
    const { arrayObjectInfo } = this.state;

    if (this.StorageLimit(arrayObjectInfo, objectFrom)) {
      if (arrayObjectInfo.some((each) => each.id === objectFrom.id)) {
        this.calcAmount(objectFrom, arrayObjectInfo);
      } else {
        this.setState((prev) => ({
          arrayObjectInfo: ([...prev.arrayObjectInfo, { ...objectFrom, itemAmount: 1 }]),
        }), this.countItemCart);
      }
      this.increaseLocalStorage();
    }
  }

  calcAmount = (objectFrom, arrayObjectInfo) => {
    arrayObjectInfo
      .find((obj) => obj.id === objectFrom.id).itemAmount += arrayObjectInfo
        .reduce((acc, obj) => (obj.id === objectFrom.id ? acc + 1 : acc), 0);
    this.setState({ arrayObjectInfo }, this.countItemCart);
  }

  calcAmountLess = ({ target: { id } }) => {
    const { arrayObjectInfo } = this.state;
    arrayObjectInfo
      .find((obj) => obj.id === id).itemAmount -= arrayObjectInfo
        .reduce((acc, obj) => (obj.id === id ? acc + 1 : acc), 0);
    this.setState({ arrayObjectInfo }, this.countItemCart);
  }

  removeItemFromCart = ({ target: { id } }) => {
    this.setState(({ arrayObjectInfo }) => ({
      arrayObjectInfo: arrayObjectInfo.filter((item) => item.id !== id),
    }), () => this.decreaseLocalStorage());
  }

  increaseLocalStorage = () => {
    const itensInLocalStorage = JSON.parse(localStorage.getItem('ItensCart'));
    if (itensInLocalStorage === null) {
      localStorage.setItem('ItensCart', JSON.stringify(0));
    }
    const newItensQuantity = itensInLocalStorage + 1;
    localStorage.setItem('ItensCart', JSON.stringify(newItensQuantity));
    this.setState({ amountCart: newItensQuantity });
  }

  decreaseLocalStorage = () => {
    const itensInLocalStorage = JSON.parse(localStorage.getItem('ItensCart'));
    if (itensInLocalStorage === null) {
      localStorage.setItem('ItensCart', JSON.stringify(0));
    }
    const newItensQuantity = itensInLocalStorage - 1;
    localStorage.setItem('ItensCart', JSON.stringify(newItensQuantity));
    this.setState({ amountCart: newItensQuantity });
  }

  getLocalStorage = () => {
    const itensAmount = JSON.parse(localStorage.getItem('ItensCart'));
    this.setState({ amountCart: itensAmount });
  }

  render() {
    const { arrayObjectInfo, amountCart } = this.state;
    return (
      <div className="content-container">
        <Switch>
          <Route
            exact
            path="/"
            render={
              () => <Home addToCart={ this.addToCart } amountCart={ amountCart } />
            }
          />
          <Route
            exact
            path="/Cart"
            render={
              () => (<Cart
                addToCart={ this.addToCart }
                removeItemFromCart={ this.removeItemFromCart }
                calcAmountLess={ this.calcAmountLess }
                cartListObject={ arrayObjectInfo }
              />)
            }
          />
          <Route
            exact
            path="/product/:id"
            render={
              (props) => (<Product
                { ...props }
                addToCart={ this.addToCart }
                amountCart={ amountCart }
              />)
            }
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
