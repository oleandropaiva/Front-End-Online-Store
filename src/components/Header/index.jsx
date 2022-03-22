import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormSearch from '../FormSearch';
import logoGoShopp from '../../images/go-shopp-sem-fundo.png';

export default class Header extends Component {
  render() {
    const { amountCart } = this.props;
    return (

      <header className="header">

        <div className="img-container">
          <img
            className="img-logo"
            src={ logoGoShopp }
            alt="Logo da loja Group One Shopp"
          />
        </div>

        <FormSearch
          { ...this.props }
        />

        <Link to="/Cart" data-testid="shopping-cart-button">
          <div className="cart-container">
            <button
              className="btn-cart"
              type="button"
            >
              Carrinho

            </button>
            <span
              className="amountCart"
              data-testid="shopping-cart-size"
            >
              {amountCart}

            </span>
          </div>
        </Link>

      </header>
    );
  }
}

Header.propTypes = {
  amountCart: PropTypes.number.isRequired,
};
