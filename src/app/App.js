/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "../app/Routes";
import { I18nProvider } from "../_metronic/i18n";

export default function App({ store, persistor, basename }) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}

      {/* Add high level `Suspense` in case if was not handled inside the React tree. */}

      {/* Override `basename` (e.g: `homepage` in `package.json`) */}
      <BrowserRouter>
        {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}

        {/* Provide `react-intl` context synchronized with Redux state.  */}
        <I18nProvider>
          {/* Render routes with provided `Layout`. */}
          <Routes />
        </I18nProvider>
      </BrowserRouter>
    </Provider>
  );
}
