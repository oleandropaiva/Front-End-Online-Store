import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { getProductDetails } from '../../services/api';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartListId: ['MLB1955887064', 'MLB1955887065', 'MLB1955887064'],
      cartListObject: [],
    };
  }

  componentDidMount() {
    this.handleListOfProducts();
  }

  handleListOfProducts = () => {
    // const { id } = this.props;
    this.setState(({ cartListId }) => ({ cartListId: [...cartListId, 'MLB1955887065'] }),
      this.listProducts);
  }

  listProducts = async ({ cartListId } = this.state) => {
    cartListId = cartListId.sort()
      .filter((id, i) => id !== cartListId[i + 1]);

    const arrayOfProducts = await Promise.all(cartListId
      .map((eachId) => getProductDetails(eachId)));
    this.setState({
      cartListObject: arrayOfProducts
        .map((each) => ({ ...each, itemAmount: this.handleAmountUnits(each.id) })),
    });
  }

  handleAmountUnits = (id) => {
    const { cartListId } = this.state;
    const sum = cartListId.reduce((acc, idData) => (idData === id ? acc + 1 : acc), 0);

    return sum;
  }

  handleAmount = ({ target: { id, name } }) => {
    if (name === 'plusItem') {
      this.setState(({ cartListId }) => ({ cartListId: [...cartListId, id] }));
    } else {
      const { cartListId } = this.state;
      const index = cartListId.indexOf(id);
      cartListId.splice(index, 1);
      this.setState({
        cartListId,
      });
    }
    this.listProducts();
  }

  render() {
    const { cartListObject } = this.state;
    return (
      <div className="cart-container">

        <div className="cart">

          {!cartListObject
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            : (
              cartListObject.map(({ id, title, thumbnail, price, itemAmount }, i) => (
                <div key={ `${id}-${i}` } className="product">
                  <img src={ thumbnail } alt="Foto do produto" />
                  <p>{price}</p>
                  <h3>{title}</h3>

                  <div>
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
                    <span>{itemAmount}</span>
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

                </div>
              ))
            )}

        </div>

      </div>
    );
  }
}

// Cart.defaultProps = {
//   id: undefined,
// };

// Cart.propTypes = {
//   id: PropTypes.string,
// };
