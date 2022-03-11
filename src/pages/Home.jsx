import React, { Component } from 'react';
import CategoriesBar from '../components/CategoriesBar/index';
import FormSearch from '../components/FormSearch';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesId: '',
    }
  }

  selectHandler = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    })
  }

  render() {
    const { selectHandler } = this;
    return (
      <>
        <FormSearch />
        <CategoriesBar handler={ selectHandler } />
      </>
    );
  }
}
