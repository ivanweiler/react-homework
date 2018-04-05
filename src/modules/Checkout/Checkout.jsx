import React, { Component } from 'react';

import { submitOrder } from '../../utils/magentoApi'

class Checkout extends Component {

  constructor(props) {
    super(props);

    //get cart id from local storage
    this.cartId = localStorage.getItem('cartId');
    console.log(this.cartId);
  }

  componentDidMount() {

  }

  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();

    console.log(this.state);

    submitOrder(this.cartId); //then, catch
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Street
        <input name="address[street]" onChange={this.handleInputChange} />
        </label>

        <br/>
        <button type="submit">Place Order</button>
      </form>
    )

  }

}

export default Checkout;
