import React, { Component } from 'react';
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
    this.setState({
      productObject: await getProductsFromCategoryAndQuery(categoryId, inputValue),
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
        {productObject.length && <Content
          productObject={ productObject }
        />}
      </div>

    );
  }
}
