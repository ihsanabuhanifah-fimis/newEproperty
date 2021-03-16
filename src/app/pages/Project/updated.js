import React from "react";
// import SVG from "react-inlinesvg";
import axios from "axios";
import { config} from "../../../config";
import { Spinner, Alert } from "./property";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
const Updated = ({ className, id }) => {
  const history = useHistory();
  const headers = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("res-api") + localStorage.getItem("res-host")+ localStorage.getItem("res-net"),
      "Content-Type": "application/json",
    },
  };
  let [data, setData] = React.useState([]);
  const [company, setCompany] = React.useState([]);
  const [status, setStatus]= React.useState()
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [company_id, setCompany_id] = React. useState('')
  const submitHandle = (e) => {
    e.preventDefault();
    setLoading(true);
    put();
  };

  const get = async () => {
    const url = `${config.api_host}/admin/v1/projects/${id}`;
    try {
      let response = await axios.get(url, headers);
      setData(response.data.data);
   
      setName(response.data.data.name)
      setStatus(response.data.data.status)
      setCompany_id(response.data.data.companyId)
    
    } catch {}
  };

  const getCompany = async () => {
    const url = `${config.api_host}/admin/v1/companies/active`;
    try {
      let response = await axios.get(url, headers);
      setCompany(response.data.data);
    } catch {}
  };

  React.useEffect(() => {
    get();
    getCompany();
  }, []);

  

  const put = async () => {
    const url = `${config.api_host}/admin/v1/projects/info`;
    const payload = {
      name: name,
      company_id : company_id,
      id:id,
      status: status,
     
    };


    try {
      let response = await axios.put(url,payload, headers);
   
      setLoading(false);
      swal("", response.data.message, "success");

    
    } catch {
      setLoading(false);
     
      swal("","Update Data Failed", "warning");
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
                Update Data Project
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
                fillRule="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>{" "}
              Kembali
            </a>
          </div>
        </div>
        <div>
          <div className="card-header border-0 py-5">
            

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
                <span className="mt-3 font-weight-bold font-size-md">
                  Name Project
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
              <label>
                <span className=" mt-3 font-weight-bold font-size-md">
                  Name Perusahaan
                </span>
              </label>
              <select onChange={(e)=> setCompany_id(e.target.value) } className="form-control">
                <option selected value={data.companyId}>
                  {data.companyName}
                </option>
                {company.map((com, index) => (
                  <option key={index} value={com.id}>{com.name}</option>
                ))}
              </select>
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
