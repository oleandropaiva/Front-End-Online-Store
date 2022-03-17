import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cart extends Component {
  handleAmount = ({ target: { id } }) => {
    const { addToCart } = this.props;
    const { cartListObject } = this.props;
    addToCart(cartListObject.find((obj) => obj.id === id));
  }

  render() {
    const { cartListObject, removeItemFromCart, calcAmountLess } = this.props;
    return (
      <div className="cart-container">

        <div className="cart">

          {!cartListObject.length
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            : (
              cartListObject.map(({ id, title, thumbnail, price, itemAmount }, i) => (
                <div key={ `${id}-${i}` } className="product">
                  <img src={ thumbnail } alt="Foto do produto" />
                  <p>{price}</p>
                  <h3 data-testid="shopping-cart-product-name">{title}</h3>

                  <div className="buttons-add">
                    <button
                      id={ id }
                      data-testid="product-decrease-quantity"
                      name="lessItem"
                      type="button"
                      disabled={ itemAmount <= 1 }
                      onClick={ calcAmountLess }
                    >
                      -

                    </button>
                    <span data-testid="shopping-cart-product-quantity">{itemAmount}</span>
                    <button
                      id={ id }
                      data-testid="product-increase-quantity"
                      name="plusItem"
                      type="button"
                      onClick={ this.handleAmount }
                    >
                      +

                    </button>
                  </div>

                  <div>
                    <button
                      id={ id }
                      type="button"
                      onClick={ removeItemFromCart }
                    >
                      (X)
                    </button>
                  </div>

                </div>
              ))
            )}

        </div>
        <button
          id=""
          type="button"
        >
          Finalizar compra
        </button>

      </div>
    );
  }
}

Cart.propTypes = {
  cartListObject: PropTypes.arrayOf(PropTypes.shape).isRequired,
  addToCart: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  calcAmountLess: PropTypes.func.isRequired,
};
