import React from "react";
// import SVG from "react-inlinesvg";
import axios from "axios";
import { config } from "../../../config";
import { Spinner, Alert } from "./property";
import { useHistory } from "react-router-dom";

const Updated = ({ className, id }) => {
  const history = useHistory();
  const headers = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("res-api") + localStorage.getItem("res-host")+ localStorage.getItem("res-net"),
      "Content-Type": "application/json",
    },
  };
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus]= React.useState()
  const [alert, setAlert] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const submitHandle = (e) => {
    e.preventDefault();
    setLoading(true);
    put();
  };

  const get = async () => {
    const url = `${config.api_host}/admin/v1/companies/${id}`;
    try {
      let response = await axios.get(url, headers);
      setName(response.data.data.name);
      setStatus(response.data.data.status)
    } catch {}
  };

  React.useState(() => {
    get();
  }, []);

  React.useMemo(() => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [message]);

  const put = async () => {
    const url = `${config.api_host}/admin/v1/companies/info`;
    const payload = {
      name: name,
      status: status,
      id: id,
    };

    try {
      let response = await axios.put(url, payload, headers);
      setMessage(response.data.message);
      setLoading(false);
      setAlert("alert-success");
      setName("");
 
    } catch {
      setLoading(false);
      setMessage("error");
      setAlert("alert-danger");
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
                Update Data Perusahaan
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
            {message !== "" ? <Alert alert={alert} pesan={message} /> : ""}

            <form onSubmit={submitHandle}>
            <label>
                <span className=" mt-3 font-weight-bold font-size-md">
                  Status
                </span>
              </label>
            <select
                className="form-control "
                name="level"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="">--Pilih Status--</option>
                <option value="1">Aktif</option>
                <option value="2">Inactive</option>
              </select>
              
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
                  {loading ? <Spinner /> : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Updated;
