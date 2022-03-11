import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../../services/api';

class CategoriesBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesList: '',
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categoriesList = await getCategories();

    this.setState({
      categoriesList,
    });
  }

  listCategories = () => {
    const { state: { categoriesList }, props: { handler } } = this;
    let list;

    if (categoriesList) {
      list = categoriesList
        .map(({ name, id }) => (
          <li key={ name }>
            <label htmlFor={ id }>
              <input
                data-testid="category"
                type="radio"
                name="categoryId"
                id={ id }
                key={ id }
                value={ id }
                onClick={ () => handler(id) }
              />
              {name}
            </label>
          </li>
        ));
    }

    return list;
  }

  render() {
    return (
      <ul>
        { this.listCategories() }
      </ul>
    );
  }
}

CategoriesBar.propTypes = {
  handler: PropTypes.func.isRequired,
};

export default CategoriesBar;
