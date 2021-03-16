import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Spinner, Alert } from "./propery";

import { config } from "../../../../config";

function ResetPassword() {
  const history = useHistory();
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [alert, setAlert] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const submitHandle = (e) => {
    setLoading(true);
    e.preventDefault();
    put();
  };
  const email = sessionStorage.getItem("email");
  const code = sessionStorage.getItem("code");


  const put = async () => {
    
    const url = `${config.api_host}/admin/v1/auth/reset`;
    const payload = {
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
      email: email,
      code: code,
    };

    try {
      let response = await axios.post(url, payload);
      setMessage(response.data.message);
      setLoading(false);
      setAlert("alert-success");
      setNewPassword("");
      setConfirmNewPassword("");
      setTimeout(() => {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("code");
        history.push("/auth");
      }, 2000);
    } catch (err) {
     
      setLoading(false);
      setMessage(err.response.data.message);
      setAlert("alert-danger");
      setTimeout(() => {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("code");
        history.push("/auth/forgot-password");
      }, 3000);
    }
  };
  return (
    <>
     
        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">Reset Password ?</h3>
            <div className="font-weight-bold">
              Silahkan buat password yang baru
            </div>
          </div>

          <form
            onSubmit={submitHandle}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
          
            {newPassword !== confirmNewPassword &&
            newPassword !== "" &&
            confirmNewPassword !== "" ? (
              <Alert
                alert="alert-danger"
                pesan={"New Password dan Konfimasi Password tidak sama"}
              />
            ) : (
              ""
            )}
            {message !== "" ? <Alert pesan={message} alert={alert} /> : ""}
            <div className="form-group fv-plugins-icon-container ">
              <input
                placeholder="New Password ..."
                className="form-control border form-control-solid h-auto py-5 px-6"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />

              <input
                placeholder="Konfirmasi Password ..."
                className="form-control border form-control-solid h-auto py-5 px-6"
                name="confirmNewPassword"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-group d-flex flex-wrap flex-center">
              <button
                disabled={newPassword === "" || confirmNewPassword === "" || newPassword !== confirmNewPassword}
                id="kt_login_forgot_submit"
                type="submit"
                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
              >
                {loading ? <Spinner /> : "Reset"}
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

export default ResetPassword;
