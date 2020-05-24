import { Router, View } from "react-navi";
import React, { Suspense } from "react";
import { mount, route } from "navi";
import ReactDOM from "react-dom";

import Mailer from "./pages/Mailer";
import Login from "./pages/Login";

import "./index.css";

const routes = mount({
  "/": route({
    //getData: () => api.fetchProducts(),
    view: <Mailer />,
  }),
  "/login": route({
    //getData: () => api.fetchProducts(),
    view: <Login />,
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <Router routes={routes}>
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
