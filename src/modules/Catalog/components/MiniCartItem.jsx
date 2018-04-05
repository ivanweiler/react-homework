import React, { Component } from 'react';
import { decode } from 'he'

export default class CartItem extends Component {

    render() {
        return (
            <div className="cart-item">
                <p>{decode(this.props.name)} {'$' + this.props.price.toFixed(2)} qty:{this.props.qty}</p>
                <button onClick={() => this.props.clickHandler(this.props.item_id)}>Delete</button>
            </div>
        );
    }
}
