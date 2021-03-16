import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { config } from "../../../../config";
import { Spinner } from "./propery";

function ForgotPassword() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("true");
  const [message, setMessage] = useState("");
  const submitHandle = (e) => {
    e.preventDefault();

    forgotHandle();
    setIsLoading(true);
  };

  React.useMemo(() => {
    let interval = setTimeout(() => {
      setStatus(true);
    }, 2000);
    return function () {
      clearInterval(interval);
    };
  }, [status]);

  const forgotHandle = async () => {
    setStatus(true);
    const url = `${config.api_host}/admin/v1/auth/forgot`;
    const payload = {
      email: email,
    };

    try {
      let response = await axios.post(url, payload);

      setMessage(response.data.message);
      setIsLoading(false);
      setMessage("Kode sudah dikirim ke email");
      history.push("/auth/code");
      sessionStorage.setItem("email", email);
    } catch (err) {
      setIsLoading(false);
      // setStatus(err.response.data.success);
      // setMessage(err.response.data.message);
    }
  };

  return (
    <>
  

        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">Forgotten Password ?</h3>
            <div className="text-muted font-weight-bold">
              Enter your email to reset your password
            </div>
          </div>

          <form
            onSubmit={submitHandle}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
            {status ? (
              ""
            ) : (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            )}
            <div className="form-group fv-plugins-icon-container">
              <input
                type="email"
                className="form-control border form-control-solid h-auto py-5 px-6"
                name="email"
                placeholder="Email ...."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>

            <div className="form-group d-flex flex-wrap flex-center">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
              >
                {isLoading ? <Spinner /> : "Submit"}
              </button>
              <Link to="/auth">
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn btn-light-primary font-weight-bold px-9 py-3 my-3 mx-4"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      
    </>
  );
}

export default ForgotPassword;
