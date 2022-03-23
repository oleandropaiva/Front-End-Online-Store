import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types';

export default class FormSearch extends Component {
  render() {
    const { handleChangeToSearch, handleSearch } = this.props;
    return (
      <section className="form-container">

        <label htmlFor="label-search" className="label-search">
          <input
            type="text"
            name="input-search"
            id="input-search"
            data-testid="query-input"
            placeholder="Digite aqui"
            onChange={ handleChangeToSearch }
            className="input-search"
          />
          <button
            type="button"
            data-testid="query-button"
            className="btn-search"
            onClick={ handleSearch }
          >
            Pesquisar
          </button>
        </label>

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </section>
    );
  }
}

FormSearch.propTypes = {
  handleChangeToSearch: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
