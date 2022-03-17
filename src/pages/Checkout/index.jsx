import React, { Component } from 'react';
import PropTypes from 'prop-types';

let total = 0;
export default class Checkout extends Component {
  render() {
    const { productList } = this.props;
    return (
      <div>
        <div className="products-info">
          <h2>Informação dos produtos</h2>
          { productList.map(({ thumbnail, price, title, itemAmount, id }) => {
            total += price * itemAmount;
            return (
              <div className="product-card" key={ id }>
                <img src={ thumbnail } alt="title" />
                <p>{ title }</p>
                <p>{ price }</p>
                <p>{ price * itemAmount }</p>
              </div>
            );
          }) }
          <p>{ total }</p>
        </div>
        <div className="buyer-info">
          <h2>Informações do Comprador</h2>
          <form>
            <input
              type="text"
              name="fullName"
              data-testid="checkout-fullname"
              id="fullName"
              placeholder="Nome Completo"
            />
            <input
              type="text"
              name="email"
              data-testid="checkout-email"
              id="email"
              placeholder="Email"
            />
            <input
              type="text"
              name="cpf"
              data-testid="checkout-cpf"
              id="cpf"
              placeholder="CPF"
            />
            <input
              type="text"
              name="phone"
              data-testid="checkout-phone"
              id="phone"
              placeholder="Telefone"
            />
            <input
              type="text"
              name="cep"
              data-testid="checkout-cep"
              id="cep"
              placeholder="CEP"
            />
            <input
              type="text"
              name="address"
              data-testid="checkout-address"
              id="address"
              placeholder="Endereço"
            />
            <button type="submit">
              Finalizar Compra
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  productList: PropTypes.arrayOf(Object).isRequired,
};
