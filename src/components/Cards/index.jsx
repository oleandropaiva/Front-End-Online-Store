import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const { productObject: { title, price, thumbnail, id } } = this.props;
    const image = thumbnail.replace(/I/, 'J');
    return (
      <Link to={ `/product/${id}` } data-testid="product-detail-link">
        <div className="card-container" data-testid="product">
          <section>
            <div className="card">
              <img src={ image } alt={ title } />
              <p>{title}</p>
              <p>{price}</p>
            </div>
          </section>
        </div>
      </Link>
    );
  }
}

Card.propTypes = {
  productObject: PropTypes.shape().isRequired,
};
