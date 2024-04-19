import { useState } from 'react';
import React from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./paginas/Home";
import Product from "./paginas/Products";
import Contact from "./paginas/Contact";
import Login from "./paginas/Login";
import Register from "./paginas/Register";
import ProductView from "./paginas/ProductView";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/product' exact>
            <Product />
          </Route>
          <Route path='/contact' exact>
            <Contact />
          </Route>
          <Route path='/login' exact>
            <Login />
          </Route>
          <Route path='/register' exact>
            <Register />
          </Route>
          <Route path='/producto-view/:id' exact>
            <ProductView />
          </Route>
          {/* <Route path='/producto-view/:id' component={ProductView} exact>
            <ProductView />
          </Route> */}
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
