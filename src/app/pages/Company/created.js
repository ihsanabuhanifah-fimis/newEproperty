import React from "react";
// import SVG from "react-inlinesvg";
import axios from "axios";
import { config } from "../../../config";
import { Spinner, Alert } from "./property";
import { useHistory } from "react-router-dom";
const Created = ({ className }) => {
  const history = useHistory()
  const headers = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("res-api") + localStorage.getItem("res-host")+ localStorage.getItem("res-net"),
      "Content-Type": "application/json",
    },
  };
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [alert, setAlert] = React.useState('')
  const [loading, setLoading] = React.useState(false);
  const submitHandle = (e) => {
    e.preventDefault();
    setLoading(true);
    post();
  };

  React.useMemo(() => {
    setTimeout(() => {
      setMessage("");
    }, 10000);
  }, [message]);

  const post = async () => {
    const url = `${config.api_host}/admin/v1/companies`;
    const payload = {
      name: name,
    };

    try {
      let response = await axios.post(url, payload, headers);
      setMessage(response.data.message);
      setLoading(false);
      setAlert('alert-success')
     
    } catch (err) {
      setLoading(false);
      setMessage(err.response.data.message);
      setAlert('alert-danger')
    }
  };
  return (
    <React.Fragment>
      <div className={`card card-custom ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
          <div>
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">
              Tambah Perusahaan
            </span>
          </h3>
          <a
              onClick={() => {
                history.goBack();
              }}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-arrow-left"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>{" "}
              Kembali
            </a>
            </div>
        </div>
        <div>
          <div className="card-header border-0 py-5">
            {message !== ""   ? (
              <Alert alert={alert} pesan={message} />
            ) : (
              ""
            )}
           
            <form onSubmit={submitHandle}>
              <label>
                <span className=" mt-3 font-weight-bold font-size-md">
                  Name Perusahaan
                </span>
              </label>
              <input
                placeholder="Nama Perusahaan ..."
                className="form-control "
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div className="card-toolbar mt-2">
                <button className="btn btn-success font-weight-bolder font-size-sm">
                  <span className="svg-icon svg-icon-md svg-icon-white"></span>
                  {loading ? <Spinner /> : "+ Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Created;
