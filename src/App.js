import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import Home from './pages/Home';
import Cart from './components/Cart';

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
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/Cart" component={ Cart } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
