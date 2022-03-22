import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import CategoriesBar from '../../components/CategoriesBar/index';
import Header from '../../components/Header';
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
    const { addToCart } = this.props;
    return (

      <div className="home-container">
        <Header
          { ...this.props }
          handleSearch={ this.handleSearch }
          handleChangeToSearch={ this.handleChangeToSearch }
        />

        <div className="category-content-container">
          <CategoriesBar handler={ this.selectHandler } />

          <div className="cards-container">
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
        <Footer />
      </div>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
  amountCart: PropTypes.number.isRequired,
};
