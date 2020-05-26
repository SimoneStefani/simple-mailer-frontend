import * as Sentry from "@sentry/browser";
import { Router, View } from "react-navi";
import React, { Suspense } from "react";
import { mount, route } from "navi";
import ReactDOM from "react-dom";

import { AuthContextProvider } from "./support/AuthContext";
import Mailer from "./pages/Mailer";
import Login from "./pages/Login";

import CssBaseline from "@material-ui/core/CssBaseline";

import "./index.css";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  attachStacktrace: true,
  maxBreadcrumbs: 50,
});

const routes = mount({
  "/": route({ view: <Mailer /> }),
  "/login": route({ view: <Login /> }),
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
