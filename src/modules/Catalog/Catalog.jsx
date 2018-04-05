import React, { Component } from 'react';

import ProductList from './components/ProductList';
import MiniCart from './components/MiniCart';

import * as API from '../../utils/magentoApi';

// load (simple) products, Magento api, set to state
// load Cart items, Magento api, set to state, set quote id to local storage
// cart handler, add to cart, Magento api, set to state
// add router and map this to index route; add Cart and Checkout router later on

class Catalog extends Component {

  constructor(props) {
    super(props);

    //initial state
    this.state = {
      productItems: [],
      cartItems: [],
      isLoading: true
    };

    //get cart id from local storage
    this.cartId = localStorage.getItem('cartId');
    console.log(this.cartId);

    //this.handleAddToCart = this.handleAddToCart.bind(this);
    //this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  componentDidMount() {

    //load products
    API.getProducts().then(json => {
      this.setState({
        productItems: json.items,
        isLoading: false
      });
    });

    //load old cart
    if(this.cartId) {
      API.getCart(this.cartId).then(json => {
        this.setState({cartItems: json});
      });
    //load new empty cart
    } else {
      API.getEmptyCart().then(cartId => {
        localStorage.setItem('cartId', cartId);
        this.cartId = cartId;
      });
    }
  }

  //add to cart
  handleAddToCart = (sku, qty) => {

    console.log(123);

    let cartItem = {sku, qty};

    API.addToCart(this.cartId, cartItem)
    .then(newItem => {

      let cartItems = this.state.cartItems;
      let itemIndex = cartItems.findIndex(item => item.item_id === newItem.item_id);

      if(itemIndex !== -1) {
        cartItems[itemIndex] = newItem; 
      } else {
        cartItems.push(newItem);
      }

      this.setState({cartItems: cartItems});
    });
  }

  //remove from cart
  handleRemoveFromCart = itemId => {
    API.removeFromCart(this.cartId, itemId)
    .then(json => {
      let cartItems = this.state.cartItems;
      let itemIndex = cartItems.findIndex(item => item.item_id === itemId);

      if(itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
      }

      this.setState({cartItems: cartItems});
    });
  }

  render() {
    return (
        <main>
            <MiniCart items={this.state.cartItems} clickHandler={this.handleRemoveFromCart} />
            {this.state.isLoading ? 
                <p>Loading products ..</p> :
                <ProductList products={this.state.productItems} clickHandler={this.handleAddToCart} />     
            }
        </main>
    );
  }

}

export default Catalog;
