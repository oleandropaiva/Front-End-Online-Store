import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const { productObject: { title, price, thumbnail, id,
      shipping: { free_shipping: isShipoing } },
    productObject, addToCart } = this.props;
    const image = thumbnail.replace(/I/, 'J');
    return (
      <section className="section-card-container">
        <Link className="link" to={ `/product/${id}` } data-testid="product-detail-link">
          <div className="card-container" data-testid="product">

            <img src={ image } alt={ title } />

            <div className="card-text">
              <p>{title}</p>
              <p>{price}</p>

            </div>
            {isShipoing
              && (
                <span
                  data-testid="free-shipping"
                  className="free-shiping"
                >
                  Frete grátis
                </span>
              )}

          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => addToCart(productObject) }
        >
          Adicionar ao Carrinho

        </button>
      </section>
    );
  }
}

Card.propTypes = {
  productObject: PropTypes.shape().isRequired,
  addToCart: PropTypes.func.isRequired,
};
