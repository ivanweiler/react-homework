import { stringify } from 'qs'

export const MAGENTO_BASE = 'http://localho.st/magento-2.2/'
//export const MAGENTO_BASE = 'http://magento2.inchoo4u.net/'
export const REST_BASE = MAGENTO_BASE + 'rest/V1/';

export const getProducts = () => {

    let query = {
        searchCriteria: {
            page_size: 20,
            filter_groups: [
                {
                    filters: [
                        {
                            field: 'category_id',
                            value: '3',
                            condition_type: 'eq'
                        },
                        {
                            field: 'type_id',
                            value: 'simple',
                            condition_type: 'eq'
                        }
                    ]
                }
            ]
        }
    }

    query = stringify(query);
    
    return fetch(REST_BASE + 'products?' + query).then(response => response.json());
}

export const getEmptyCart = () => {
    return fetch(REST_BASE + 'guest-carts', { 
            method: 'POST'
        })
        .then(response => response.json());
}

export const getCart = (cartId) => {
    return fetch(REST_BASE + `guest-carts/${cartId}/items`, {
        method: 'GET'
      })
    .then(response => response.json());
}

export const addToCart = (cartId, cartItem) => {

    cartItem.quote_id = cartId;
    //quote_id, sku, qty are required

    return fetch(REST_BASE + `guest-carts/${cartId}/items`, {
        method: 'POST',
        body: JSON.stringify({ cartItem: cartItem }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json());
}

export const removeFromCart = (cartId, cartItemId) => {
    return fetch(REST_BASE + `guest-carts/${cartId}/items/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json());
}

//billing je optional, moze biti setan dole ili same_as_billing?
export const setShippingInfo = (cartId, shippingAddress, billingAddress, shippingMethodCode, shippingCarrierCode) => {

}

//billing je ovdje optional ako je setan gore !!
export const setPaymentInfo = (cartId, billingAddress, paymentMethod) => {

}


export const submitOrder = (cartId, paymentMethod, billingAddress) => {
    console.log('Placing order !!');

    let email = 'lol@lol.com'; 

    paymentMethod = {
        method: 'checkmo'
    };
    billingAddress = {
        country_id: 'US',
        same_as_billing: 1
    };

    return fetch(REST_BASE + `guest-carts/${cartId}/payment-information?XDEBUG_SESSION_START`, {
        method: 'POST',
        body: JSON.stringify({ cartId, email, paymentMethod, billingAddress }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json());
}

/*
http://localho.st/magento-2.2/rest/default/V1/guest-carts/762b1fdee73e9af1f386e8a6c32fce01/shipping-information

{"addressInformation":
    {"shipping_address":
        {"countryId":"HR","regionId":"525","regionCode":"HR-14","region":"Osječko-baranjska županija","street":["address 123"],"company":"xxx","telephone":"12345678","postcode":"31000","city":"osijek","firstname":"Ivan","lastname":"Weiler"},
    "billing_address":
        {"countryId":"HR","regionId":"525","regionCode":"HR-14","region":"Osječko-baranjska županija","street":["address 123"],"company":"xxx","telephone":"12345678","postcode":"31000","city":"osijek","firstname":"Ivan","lastname":"Weiler","saveInAddressBook":null},
    "shipping_method_code":"flatrate",
    "shipping_carrier_code":"flatrate"}}


ovo ne treba
http://localho.st/magento-2.2/rest/default/V1/guest-carts/762b1fdee73e9af1f386e8a6c32fce01/billing-address

{"cartId":"762b1fdee73e9af1f386e8a6c32fce01",
"address":{"countryId":"HR","regionId":"525","regionCode":"HR-14","region":"Osječko-baranjska županija","street":["address 123"],"company":"xxx","telephone":"12345678","postcode":"31000","city":"osijek","firstname":"Ivan","lastname":"Weiler","saveInAddressBook":null}}



http://localho.st/magento-2.2/rest/default/V1/guest-carts/762b1fdee73e9af1f386e8a6c32fce01/payment-information

{"cartId":"762b1fdee73e9af1f386e8a6c32fce01",
"billingAddress":{"countryId":"HR","regionId":"525","regionCode":"HR-14","region":"Osječko-baranjska županija","street":["address 123"],"company":"xxx","telephone":"12345678","postcode":"31000","city":"osijek","firstname":"Ivan","lastname":"Weiler","saveInAddressBook":null},
"paymentMethod":{"method":"checkmo","po_number":null,"additional_data":null},"email":"ivan.weiler@gmail.com"}


*/