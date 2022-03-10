import React, { Component } from 'react';

export default class FormSearch extends Component {
  render() {
    return (
      <>
        <label htmlFor="input-search">
          <input type="text" name="input-search" id="input-search" />
        </label>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </>
    );
  }
}
