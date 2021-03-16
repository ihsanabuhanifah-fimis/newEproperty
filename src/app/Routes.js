/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from "react";
import { Redirect, Switch} from "react-router-dom";
import { Layout } from "../_metronic/layout";

import { AuthPage } from "./modules/Auth";
import ProtectedAdmin from "../Route/ProtectedAdmin"
import ProtectedAuth from "../Route/ProtectedAuth"
import ProtectedUser from "../Route/ProtectedUser"


export function Routes() {
  

  return (
    <Switch>
       <ProtectedAuth path="/auth">
        <AuthPage />
      </ProtectedAuth>
      <ProtectedUser path="/user">
        <Layout/>
        </ProtectedUser>
      <ProtectedAdmin path="/admin">
        <Layout/>
        </ProtectedAdmin>
       
       
        <Redirect to="/auth" />
    </Switch>
  );
}
