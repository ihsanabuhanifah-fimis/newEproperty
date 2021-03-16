import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthPage } from "./app/modules/Auth/pages/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth">
          <AuthPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
