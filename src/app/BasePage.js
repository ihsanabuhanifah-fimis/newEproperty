import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route, useRouteMatch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import Company from "./pages/Company";
import Project from "./pages/Project";
import User from "./pages/User";
import {useSelector} from 'react-redux'

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);

export default function BasePage() {
  
  let access = useSelector((state) => state.auth);
  let match = useRouteMatch();

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path={`${match.url}/dashboard`} component={DashboardPage} />
        <Route path={`${match.url}/builder`} component={BuilderPage} />
        <Route path={`${match.url}/my-page`} component={MyPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />
       {access.accessCompany ? ( <Route path={`${match.url}/company`}>
          <Company />
        </Route>) : ''}
        {access.accessProject ? (<Route path={`${match.url}/project`}>
        <Project />
        </Route> ) : ''}
       {access.accessUser ? ( <Route path={`${match.url}/User`}>
        <User/>
        </Route>) : ''}
        <Redirect to={`${match.url}/company`} />
      </Switch>
    </Suspense>
  );
}
