import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CategoriesBar from '../../components/CategoriesBar/index';
import FormSearch from '../../components/FormSearch';
import Cards from '../../components/Cards';
import { getProductsFromCategoryAndQuery } from '../../services/api';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      productObject: [],
      categoryId: '',
    };
  }

  handleChangeToSearch = ({ target: value }) => {
    this.setState({ inputValue: value });
  }

  handleSearch = async () => {
    const { categoryId, inputValue } = this.state;
    const results = await getProductsFromCategoryAndQuery(categoryId, inputValue);
    this.setState({ productObject: results.results });
  }

  selectHandler = async (id) => {
    const results = await getProductsFromCategoryAndQuery(id);
    this.setState({
      categoryId: id,
      productObject: results.results,
    });
  }

  render() {
    const { productObject } = this.state;
    const { addToCart, amountCart } = this.props;
    return (

      <div className="home-container">
        <FormSearch
          handleSearch={ this.handleSearch }
          handleChangeToSearch={ this.handleChangeToSearch }
        />
        <Link to="/Cart" data-testid="shopping-cart-button">
          <button type="button">Carrinho</button>
          <span data-testid="shopping-cart-size">{amountCart}</span>
        </Link>

        <div className="category-content-container">
          <CategoriesBar handler={ this.selectHandler } />
          {productObject.length
            && productObject.map((each) => (
              <Cards
                key={ each.id }
                productObject={ each }
                addToCart={ addToCart }
              />
            ))}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};
