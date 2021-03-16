import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authMe } from "../redux/Auth/action";

const ProtectedAdmin = ({ children, ...rest }) => {
  let level = useSelector((state) => state.auth.level);
 
  const role = localStorage.getItem('level')
  const roles = parseInt(role, 10)
    const dispatch = useDispatch();

  

  React.useEffect(() => {
    dispatch(authMe());

 
  }, [roles]);
  

 if(level === "404"){
   return (
     <div className="container text-center d-flex-column mx-auto my-auto">
       <h3>Mohon maaf anda sudah login di tempat lain</h3>
      <button className="btn btn-danger" onClick={()=> {
         localStorage.clear();
  
         window.location.href = '/';
      }}>Logout</button>
     </div>
   );
 }else{
  return (
    <React.Fragment>
      <Route {...rest}>
        {roles  === 1 ? children : <Redirect to="/auth/login" />}
      </Route>
    </React.Fragment>
  );
 }
};

export default ProtectedAdmin;
