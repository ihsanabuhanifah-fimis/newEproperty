import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import axios from "axios";
import { config } from "../../../../config";
import { Spinner } from "./propery";
function Code(props) {
  const [isRequested, setIsRequested] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [code, setCode] = useState("");
 
  const email = sessionStorage.getItem("email");
  const history = useHistory();
  const submitHandle = (e) => {
    e.preventDefault();
    post();
  };
  React.useEffect(()=> {
if(email === ''){
  setIsRequested(true)
}
  }, [isRequested])

  const post = async () => {
    setIsLoading(true);
    const url = `${config.api_host}/admin/v1/auth/code`;
    const email = sessionStorage.getItem("email");
    const payload = {
   
      code: code,
      email: email,
    };
  
    try {
      await axios.post(url, payload);
      sessionStorage.setItem('code', code)
      history.push("/auth/reset-password");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  const forgotHandle = async () => {
 
    const url = `${config.api_host}/admin/v1/auth/forgot`;
    const payload = {
      email: email,
    };

    try {
      await axios.post(url, payload);
      setMessage(`Email sudah dikirim ke ${email}`);
      setAlert("alert-success");
    } catch (err) {
      setMessage(`${email} tidak ditemukan`);
      setAlert("alert-danger");
    }
  };
  React.useMemo(() => {
    setTimeout(() => {
      setMessage("");
      setAlert("");
    }, 4000);
  }, [message]);

  return (
    <React.Fragment>
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">Masukan Kode</h3>
            <div className=" font-weight-bold">
              Silahkan periksan email untuk mendapatkan kode
            </div>
          </div>
          {message !== "" ? (
            <div className={`alert ${alert}`} role="alert">
              {message}
            </div>
          ) : (
            ""
          )}
          <form
            onSubmit={submitHandle}
            className="form-group fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
            <div className="form-row fv-plugins-icon-container">
           
                <input
                  maxLength="6"
                  className="form-control btn border form-control-solid h-auto"
                  name="code"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
           
              
           
            </div>

            <div className="form-group d-flex flex-wrap flex-center mt-2">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn btn-primary font-weight-bold px-9 py-3 my-3 mx-4"
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
            <p className="text-center font-weight-bold text-dark-50">
              Belum menerima email?
              <a
                onClick={forgotHandle}
                className="text-primary font-weight-bold ml-2"
              >
                Kirim email Kembali
              </a>
            </p>
          </form>
        </div>
      )}
    </React.Fragment>
  );
}

export default Code;
