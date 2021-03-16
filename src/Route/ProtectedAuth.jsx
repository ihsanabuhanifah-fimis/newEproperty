import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authMe } from "../redux/Auth/action";
const ProtectedAuth = ({ children, ...rest }) => {
  const [roles, setRoles] = React.useState("");
  const dispatch = useDispatch();
 let history = useHistory()
  const role = useSelector((state) => state.auth.level);
  React.useEffect(() => {
    dispatch(authMe());
  
  }, [setRoles]);
  React.useMemo(() => {
    setRoles(role);
  }, [role]);

  return (
 
    <React.Fragment>
    {(() => {
        if (roles === "1") {
          return (
          
            <Route><Redirect to="/admin/company" /></Route>
          )
        } else if (roles === "2") {
          return (
            <Route><Redirect to="/user/dashboard" /></Route>
          )
        } else {
          return (
          <Route>{children}</Route>
          )
        }
    })()}
  </React.Fragment>

  
  );
};

export default ProtectedAuth;
