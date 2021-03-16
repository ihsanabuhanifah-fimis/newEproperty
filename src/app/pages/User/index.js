/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
// import SVG from "react-inlinesvg";

import { Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard"
import Created from "./created";
import Updated from "./updated";

import UpdatedPassword from "./updatedPassword"
// import { toAbsoluteUrl } from "../../../_helpers";

const User = () => {
  const [idUser , setIdUser] = React.useState(0)

  const setId = (id)=> {
    setIdUser(id)
  }


  const url = `/admin/user`
  return (
    <Switch>
      <Route path={`${url}/created`}>
        <Created />
      </Route>
      <Route  path={`${url}/updated`}>
        <Updated   id={idUser}/>
      </Route>
      
      <Route path={`${url}/UpdatePassword`}>
      <UpdatedPassword id={idUser}/>
      </Route>
      <Route path={`${url}`}>
        <Dashboard setId={setId} />
      </Route>
    </Switch>
  );
};

export default User;

