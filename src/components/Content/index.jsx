import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cards from '../Cards/index';

export default class Content extends Component {
  render() {
    const { productObject } = this.props;
    return (
      <div>

        {productObject.map((each) => (
          <Cards
            key={ each.id }
            productObject={ each }
          />
        ))}

      </div>
    );
  }
}

Content.propTypes = {
  productObject: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
