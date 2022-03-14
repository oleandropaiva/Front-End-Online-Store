import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductDetails } from '../../services/api';

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
    const { infoProduct: { title, price, thumbnail, id } } = this.state;
    const { addToCart } = this.props;
    return (
      <div className="product-container">
        <Link to="/Cart" data-testid="shopping-cart-button">
          <button type="button">Carrinho</button>
        </Link>
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
          onClick={ () => addToCart(id) }
        >
          Adicionar ao Carrinho

        </button>
      </div>
    );
  }
}

Product.propTypes = {
  productObject: PropTypes.shape(),
}.isRequired;
