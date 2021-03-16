import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Base64 } from "js-base64";
import { useDispatch, useSelector } from "react-redux";
import { authUser, reset } from "../../../../redux/Auth/action";
import { Alert } from "./propery";

function Login() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.loading);
  const message = useSelector((state) => state.auth.message);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useMemo(() => {
    setTimeout(() => {
      dispatch(reset());
    }, 5000);
  }, [message]);

  const submitHandle = (e) => {
    e.preventDefault();
    const payload = {
      Username: email,
      password: password,
    };
    const token = `${email}:${password}`;
    const encyrpt = Base64.encode(token);

    const headers = {
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${encyrpt}`,
        "Content-Type": "application/json",
      },
    };
    dispatch(authUser(payload, headers));
   
  };

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="font-weight-bold">Enter your username and password</p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}

      <form
        onSubmit={submitHandle}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {message !== "" ? <Alert pesan={message} alert="alert-danger" /> : ""}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email"
            className="form-control form-control-solid h-auto py-5 px-6"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className="form-control form-control-solid h-auto py-5 px-6"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </Link>
          <button
            disabled={email === "" || password === ""}
            id="kt_login_signin_submit"
            type="submit"
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Sign In</span>
            {status && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default Login;
