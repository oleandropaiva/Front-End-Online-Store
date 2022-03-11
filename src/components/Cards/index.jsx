import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const { productObject: { title, price } } = this.props;
    return (
      <div className="card-container" data-testid="product">
        <section>
          <div className="card">
            <span>
              <img src="" alt="" />
            </span>
            <p>{title}</p>
            <p>{price}</p>
          </div>
        </section>
      </div>
    );
  }
}

Card.propTypes = {
  productObject: PropTypes.shape().isRequired,
};
