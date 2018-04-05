import React from 'react';

import ProductItem from './ProductItem'

export default class ProductList extends React.Component {

  render() {
    return (
        <ul>
          {this.props.products.map((product, index) => 
          <li key={`product-${product.id}`}>
              <ProductItem {...product} clickHandler={this.props.clickHandler} />
          </li>
          )}
        </ul>
    );
  }
}