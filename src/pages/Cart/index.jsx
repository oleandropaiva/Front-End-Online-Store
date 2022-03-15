import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartListObject: [],
    };
  }

  componentDidMount() {
    const { arrayObjectInfo } = this.props;
    this.setState({ cartListObject: arrayObjectInfo });
  }

  handleAmount = ({ target: { id, name } }) => {
    const { addToCart, removeFromCart } = this.props;

    if (name === 'plusItem') {
      this.setState(({ cartListId }) => ({ cartListId: [...cartListId, id] }));
      addToCart(id);
    } else {
      const { cartListId } = this.state;
      const index = cartListId.indexOf(id, 1);
      this.setState((prev) => ({
        cartListId: prev.cartListId.filter((_id, i) => i !== index),
      }));

      removeFromCart(cartListId);
    }
    this.listProducts();
  }

  handleToRemove = ({ target: { id } }) => {
    const { removeFromCart } = this.props;
    this.setState(({ cartListId }) => ({
      cartListId: cartListId.filter((idData) => idData !== id),
    }), () => {
      const { cartListId } = this.state;
      removeFromCart(cartListId);
      this.listProducts();
    });
  }

  render() {
    const { cartListObject } = this.state;
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
                      onClick={ this.handleAmount }
                      disabled={ itemAmount <= 1 }
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
                      onClick={ this.handleToRemove }
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
          onClick=""
        >
          Finalizar compra
        </button>

      </div>
    );
  }
}

Cart.propTypes = {
  arrayObjectInfo: PropTypes.arrayOf(PropTypes.shape).isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};
