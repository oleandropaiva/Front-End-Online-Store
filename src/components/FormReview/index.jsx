import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

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
    console.log('passeiaeui');
    this.setState(({ listOfEvaluation, formFill }) => ({
      listOfEvaluation: [...listOfEvaluation, { id, ...formFill }],
    }), () => {
      const { listOfEvaluation } = this.state;
      localStorage.setItem('evaluations', JSON.stringify(listOfEvaluation));
    });
  }

  render() {
    const { listOfEvaluation, formFill: { rate: rateChoice } } = this.state;
    const { id } = this.props;
    const arrayOfStars = ['*', '*', '*', '*', '*'];

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

          <div className="rate-container">
            {
              arrayOfStars.map((_e, num) => (
                <div key={ num } className="rate-border">
                  <button
                    name="rate"
                    value={ num + 1 }
                    data-testId={ `${num + 1}-rating` }
                    className={ (num + 1 <= rateChoice) ? 'rate-active' : 'rate-off' }
                    onClick={ this.handleFormFill }
                    type="button"
                  >
                    {num + 1}
                  </button>
                </div>
              ))
            }
          </div>

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

        <div className="evaluation-list-container">
          {

            listOfEvaluation && listOfEvaluation
              .map(({ id: idData, email, rate, description }, i) => idData === id
                && (
                  <section key={ email + i } className="evaluation">
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
