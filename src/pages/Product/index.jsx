import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductDetails } from '../../services/api';
import FormReview from '../../components/FormReview';

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      infoProduct: {},
    };
  }

  componentDidMount() {
    this.handleShowProduct();
  }

  handleShowProduct = async () => {
    const {
      match: {
        params,
      },
    } = this.props;
    const result = await getProductDetails(params.id);
    this.setState({ infoProduct: result });
  }

  render() {
    const { infoProduct: { id, title, price, thumbnail }, infoProduct } = this.state;
    const { addToCart, amountCart } = this.props;
    return (
      <div className="product-container">

        <div className="cart-container">
          <Link to="/Cart" data-testid="shopping-cart-button">
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
          </Link>
        </div>

        <h1 data-testid="product-detail-name">{`${title} - ${price} `}</h1>

        <img src={ thumbnail } alt={ title } />

        <section>
          <h3>Especificações Técnicas</h3>
          <ul>
            <li>especific1</li>
          </ul>
        </section>

        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => addToCart(infoProduct) }
        >
          Adicionar ao Carrinho

        </button>
        <div className="form-review-container">
          <FormReview id={ id } />
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  productObject: PropTypes.shape(),
}.isRequired;
