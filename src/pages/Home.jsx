import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoriesBar from '../components/CategoriesBar/index';
import FormSearch from '../components/FormSearch';
import Content from '../components/Content';
import { getProductsFromCategoryAndQuery } from '../services/api';

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
    return (

      <div className="home-container">
        <FormSearch
          handleSearch={ this.handleSearch }
          handleChangeToSearch={ this.handleChangeToSearch }
        />
        <Link to="/Cart" data-testid="shopping-cart-button">
          <button type="button">Carrinho</button>
        </Link>
        <CategoriesBar handler={ this.selectHandler } />
        {productObject.length && <Content
          productObject={ productObject }
        />}
      </div>
    );
  }
}
