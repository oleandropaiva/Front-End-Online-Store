import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfEvaluation: [],
      formFill: {},
    };
  }

  componentDidMount() {
    this.setState({
      listOfEvaluation: JSON.parse(localStorage.getItem('evaluations')) || [],
    });
  }

  handleFormFill = ({ target: { name, value } }) => {
    this.setState(({ formFill }) => ({ formFill: { ...formFill, [name]: value } }));
  }

  handleFormSubmit = ({ target: { id } }) => {
    this.setState(({ listOfEvaluation, formFill }) => ({
      listOfEvaluation: [...listOfEvaluation, { id, ...formFill }],
    }), () => {
      const { listOfEvaluation } = this.state;
      localStorage.setItem('evaluations', JSON.stringify(listOfEvaluation));
    });
  }

  render() {
    const { listOfEvaluation } = this.state;
    const { id } = this.props;
    return (
      <div>
        <form action="submit">

          <label htmlFor="input-email">
            <input
              type="email"
              name="email"
              id="input-email"
              placeholder="Digite seu e-mail"
              data-testid="product-detail-email"
              onChange={ this.handleFormFill }
            />
          </label>

          <label htmlFor="rate">
            <input
              onChange={ this.handleFormFill }
              data-testid="1-rating"
              value="1"
              name="rate"
              type="radio"
            />
            1
            <input
              onChange={ this.handleFormFill }
              data-testid="2-rating"
              value="2"
              name="rate"
              type="radio"
            />
            2
            <input
              onChange={ this.handleFormFill }
              data-testid="3-rating"
              value="3"
              name="rate"
              type="radio"
            />
            3
            <input
              onChange={ this.handleFormFill }
              data-testid="4-rating"
              value="4"
              name="rate"
              type="radio"
            />
            4
            <input
              onChange={ this.handleFormFill }
              data-testid="5-rating"
              value="5"
              name="rate"
              type="radio"
            />
            5
          </label>

          <textarea
            name="description"
            cols="30"
            rows="10"
            placeholder="Comente sua avaliação"
            data-testid="product-detail-evaluation"
            onChange={ this.handleFormFill }
          />

          <button
            id={ id }
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.handleFormSubmit }
          >
            Enviar avaliação
          </button>

        </form>

        <div>
          {

            listOfEvaluation && listOfEvaluation
              .map(({ id: idData, email, rate, description }, i) => idData === id && (
                <section key={ email + i } className="evaluation-list-container">
                  <h2>{email}</h2>
                  <span>{rate}</span>
                  <p>{description}</p>
                </section>
              ))

          }
        </div>

      </div>
    );
  }
}

FormReview.defaultProps = {
  id: undefined,
};

FormReview.propTypes = {
  id: PropTypes.string,
};
