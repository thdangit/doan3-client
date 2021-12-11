import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminHome from "../Admin/Pages/AdminHome";
import LoginData from "../pages/LoginData";
import SignUpData from "../pages/SignUpData";
import ViewBill from "../components/ViewBill";
import Test from "../components/test";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/catalog/:slug" component={Product} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/cart" component={Cart} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/AdminHome" component={AdminHome} />
      <Route path="/LoginData" component={LoginData} />
      <Route path="/SignUpData" component={SignUpData} />
      <Route path="/ViewBill" component={ViewBill} />
      <Route path="/Test" component={Test} />
    </Switch>
  );
};

export default Routes;
