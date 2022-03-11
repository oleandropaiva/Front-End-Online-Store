import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormSearch extends Component {
  render() {
    const { handleChangeToSearch, handleSearch } = this.props;
    return (
      <>
        <section className="form-container">

          <label htmlFor="input-search">
            <input
              type="text"
              name="input-search"
              id="input-search"
              data-testid="query-input"
              onChange={ handleChangeToSearch }
            />
          </label>

          <button
            type="button"
            data-testid="query-button"
            onClick={ handleSearch }
          >
            Pesquisar
          </button>

        </section>

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </>
    );
  }
}

FormSearch.propTypes = {
  handleChangeToSearch: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
