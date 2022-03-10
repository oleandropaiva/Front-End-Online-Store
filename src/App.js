import React, { Component } from 'react';
import './App.css';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

class App extends Component {
  componentDidMount() {
    this.fetchTest();
  }

  fetchTest = async () => {
    await getCategories();
    await getProductsFromCategoryAndQuery();
  }

  render() {
    return (
      <div className="App" />
    );
  }
}

export default App;
