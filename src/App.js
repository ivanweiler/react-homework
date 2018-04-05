import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { Catalog, Checkout } from './modules';
//import { Footer, Header } from 'components';

const App = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
      </ul>

      <Route exact path="/" component={Catalog} />
      <Route exact path="/checkout" component={Checkout} />

      {/* <Footer /> */}
    </div>
  </BrowserRouter>
);

export default App;
