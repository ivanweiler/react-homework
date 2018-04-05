import React from 'react';
//import { decode } from 'he'
import { MAGENTO_BASE } from '../../../utils/magentoApi'

export default class ProductItem extends React.Component {

  render() {
    //console.log(this.props);

    const customAttributes = {}
    this.props.custom_attributes.forEach(function (attribute) {
      customAttributes[attribute['attribute_code']] = attribute.value
    });

    const formattedPrice = '$' + this.props.price.toFixed(2);
    const image = MAGENTO_BASE + 'pub/media/catalog/product/' + customAttributes['thumbnail'];
    //const url = MAGENTO_BASE + customAttributes['url_key'] + '.html';

    return (
        <div className="product-item">
          <img
            style={{maxWidth: 140}}
            src={image}
            alt="{this.props.name}"
          />
          <br/>
          <p dangerouslySetInnerHTML={{__html: this.props.name}} />
          <p>{formattedPrice}</p>
          <button onClick={() => { console.log(this.props.clickHandler); this.props.clickHandler(this.props.sku, 1) }  }>Add to cart</button>
        </div>
    );
  }
}

