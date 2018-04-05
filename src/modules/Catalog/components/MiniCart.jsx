import React from 'react';

import MiniCartItem from './MiniCartItem'

export default class MiniCart extends React.Component {

  render() {
    return (
      <div id="cart">
          Cart: 
          {!this.props.items.length ?
            <p>No items in cart</p> :
            <ul>
              {this.props.items.map((item, index) => 
                <li key={`item-${index}`}>
                  <MiniCartItem {...item} clickHandler={this.props.clickHandler}/>
                </li>
              )}
            </ul>
          }      
      </div>
    )
  }
}