
## All APIs
http://magento2.inchoo4u.net/swagger

## BASE ENDPOINT 
http://magento2.inchoo4u.net/rest/V1/

## get product list
/products?searchCriteria[page_size]=20  
GET

returns: product list

- primjer advanced searchCriteria-e pogledati na dnu fajla

## get empty/new guest cart
/guest-carts  
POST  
```
no post body
```
returns: cartId

- prvo trebate zvati ovo da dobijete cart od Magenta, tek onda mozete dodavati u njega i sl.

## get guest cart by cartId
/guest-carts/{cartId}/items  
GET

returns: all cart items

## add to guest cart
/guest-carts/{cartId}/items  
POST  
```
{  
  cartItem : {  
    quote_id: {cartId},  
    sku: {productSku},  
    qty: 1  
  }  
}
```

returns: added cart item with its cartItemId

## remove from guest cart
/guest-carts/{cartId}/items/{cartItemId}  
DELETE



## searchCriteria example
```javascript

  import { stringify } from 'qs'

  //...

  //get first 10 simple products from category 3 (Bags)
  let query = {
      searchCriteria: {
          page_size: 10,
          current_page: 1,
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

  fetch('http://magento2.inchoo4u.net/rest/V1/products?' + query)
  //...

```

## Checkout (WIP)

2 API calls required

### 1. save shipping
/guest-carts/{cardId}/shipping-information  
POST  
```
{
    "addressInformation": {
        "shipping_address": {
            "countryId":"HR","regionId":"525","regionCode":"HR-14","region":"Osječko-baranjska županija","street":["address 123"],"company":"xxx","telephone":"12345678","postcode":"31000","city":"Osijek","firstname":"Veronica","lastname":"Costelo"
        },
        "shipping_method_code":"flatrate",
        "shipping_carrier_code":"flatrate"
    }
}
```

### 2. save billing & place order
/guest-carts/{cardId}/payment-information  
POST  
```
{
    "cartId":"{cardId}",
    "email":"test@test.com",
    "billingAddress": {
        "countryId":"HR","regionId":"525","regionCode":"HR-14","region":"Osječko-baranjska županija","street":["address 123"],"company":"xxx","telephone":"12345678","postcode":"31000","city":"Osijek","firstname":"Veronica","lastname":"Costelo"
    },
    "paymentMethod":{
        "method":"checkmo" //.. other pgw data
    }
}
```

Notes: 
- if you set region, regionId and regionCode are optional? But you need to have countryId list.
- company is optional
- street can be string?
- there are other Quote APIs beside this ones to place an order (above is M2 checkout oriented)
