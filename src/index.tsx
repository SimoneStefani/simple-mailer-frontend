import { Router, View } from "react-navi";
import React, { Suspense } from "react";
import { mount, route } from "navi";
import ReactDOM from "react-dom";

import { AuthContextProvider } from "./support/AuthContext";
import Mailer from "./pages/Mailer";
import Login from "./pages/Login";

import CssBaseline from "@material-ui/core/CssBaseline";

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
    <CssBaseline />
    <Router routes={routes}>
      <Suspense fallback={null}>
        <AuthContextProvider>
          <View />
        </AuthContextProvider>
      </Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
