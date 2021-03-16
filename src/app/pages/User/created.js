import React from "react";
// import SVG from "react-inlinesvg";
import axios from "axios";
import { config } from "../../../config";
import { Spinner, Alert } from "./property";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
const Created = ({ className }) => {
  const history = useHistory();
  const headers = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("res-api") + localStorage.getItem("res-host")+ localStorage.getItem("res-net"),
      "Content-Type": "application/json",
    },
  };
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [api_url, setApi_url] = React.useState("");
  const [api_key, setApi_key] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [perusahaan, setPerusahaan] = React.useState([]);
  const [company_id, setCompany_id] = React.useState([]);
  const [project_id, setProject_id] = React.useState([]);
  const [company, setCompany] = React.useState(false);
  const [project, setProject] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const [sales, setSales] = React.useState(false);
  const [accounting, setAccounting] = React.useState(false);
  const [finance, setFinance] = React.useState(false);
 
 
  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [listPerusahaan, setListPerusahaan] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const submitHandle = (e) => {
    e.preventDefault();
    setLoading(true);
    post();
  };


  const get = async () => {
    const url = `${config.api_host}/admin/v1/companies/active`;
    try {
      let response = await axios.get(url, headers);

      setPerusahaan(response.data.data);
    } catch (err) {
    
    }
  };
  const getProject = async (index, id) => {
    const url = `${config.api_host}/admin/v1/companies/${id}/childs`;
    try {
      let response = await axios.get(url, headers);
    
      listPerusahaan[index] = response.data.data;
      setListPerusahaan([...listPerusahaan]);
    } catch {}
  };
  React.useState(() => {
    get();
  }, []);
  const add = () => {
    setList([...list, ""]);
    setCompany_id([...company_id, 0]);
    setListPerusahaan([...listPerusahaan, []]);
    setProject_id([...project_id, []]);
    setProjects([...projects, []]);
  };
  const post = async () => {
    const url = `${config.api_host}/admin/v1/admins`;
    const jumlah = company_id.length;

    let companies = [];
    for (let i = 0; i < jumlah; i++) {
      companies.push({
        company_id: company_id[i],
        projects: projects[i],
      });
    }

    const payload = {
      name: name,
      email: email,
      api_url: api_url,
      api_key: api_key,
      level: level,
      access: [
        {
          name: "company",
          status: company,
        },
        {
          name: "project",
          status: project,
        },
        {
          name: "user",
          status: user,
        },
        {
          name: "sales",
          status: sales,
        },
        {
          name: "accounting",
          status: accounting,
        },
        {
          name: "finance",
          status: finance,
        },
      ],
      companies,
    };

    try {
      let response = await axios.post(url, payload, headers);
   
      setLoading(false);
      

      swal({
        title: "",
        text: response.data.message,
        icon: "success",
      });
    } catch (err) {
      setLoading(false);
      
     
      swal({
        title: "Error",
        text: err.response.data.message,
        icon: "error",
      });
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
                Tambah Users
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
           

            <form onSubmit={submitHandle}>
              <label>
                <span className="mt-3 font-weight-bold font-size-md">Name</span>
              </label>
              <input
                placeholder="Name"
                className="form-control "
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label>
                <span className="mt-3 font-weight-bold font-size-md">
                  Email
                </span>
              </label>
              <input
                placeholder="Email"
                className="form-control "
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label>
                <span className="mt-3 font-weight-bold font-size-md">
                  API URL
                </span>
              </label>
              <input
                placeholder="API URL"
                className="form-control "
                name="api_url"
                value={api_url}
                onChange={(e) => {
                  setApi_url(e.target.value);
                }}
              />
              <label>
                <span className="mt-3 font-weight-bold font-size-md">
                  API KEY
                </span>
              </label>
              <input
                placeholder="API KEY"
                className="form-control "
                name="api_key"
                value={api_key}
                onChange={(e) => {
                  setApi_key(e.target.value);
                }}
              />
              <label>
                <span className="mt-3 font-weight-bold font-size-md">
                  Level
                </span>
              </label>
              <select
                className="form-control "
                name="level"
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
              >
                <option value="">--Pilih Level--</option>
                <option value="1">Admin</option>
                <option value="2">User</option>
              </select>
              <div className="my-3">
                {level === "1" ? (
                  <React.Fragment>
                    <label className="mr-3">
                      <input
                        onChange={() => setCompany(!company)}
                        type="checkbox"
                      />{" "}
                      Company
                    </label>
                    <label className="mr-3">
                      <input
                        onChange={() => setProject(!project)}
                        type="checkbox"
                      />{" "}
                      Project
                    </label>
                    <label className="mr-3">
                      <input onChange={() => setUser(!user)} type="checkbox" />{" "}
                      User
                    </label>
                  </React.Fragment>
                ) : (
                  ""
                )}
                {level === "2" ? (
                  <React.Fragment>
                    <div>
                      <label className="mr-3">
                        <input
                          onChange={() => setSales(!sales)}
                          type="checkbox"
                        />{" "}
                        Sales
                      </label>
                      <label className="mr-3">
                        <input
                          onChange={() => setAccounting(!accounting)}
                          type="checkbox"
                        />{" "}
                        Accounting
                      </label>
                      <label className="mr-3">
                        <input
                          onChange={() => setFinance(!finance)}
                          type="checkbox"
                        />{" "}
                        Finance
                      </label>
                    </div>
                    <a className="btn" onClick={add}>
                      Tambah Perusahaan
                    </a>
                    {list.map((list, index) => {
                      return (
                        <div className="shadow-lg p-5 mb-5 bg-white rounded" key={index}>
                          <label>
                            <span className="mt-3  font-weight-bold font-size-md">
                              Nama Perusahaan {list}
                            </span>
                          </label>
                          <select
                            onChange={(e) => {
                              company_id[index] = e.target.value;
                              getProject(index, e.target.value);
                            }}
                            className="form-control"
                          >
                            <option value="-">--Pilih Perusahaan--</option>
                            {perusahaan.map((usaha) => (
                              <option value={usaha.id} key={usaha.id}>
                                {usaha.name}
                              </option>
                            ))}
                          </select>
                          <p className="font-weight-bold mr-1 mt-3">Pilih Project</p>
                          {listPerusahaan[index].map((usaha, inde) => (
                            <div className="mr-1 mt-3" key={inde}>
                             
                              <label className="mr-3">
                                <input
                                  onChange={(e) => {
                                    if (e.target.checked == true) {
                                      project_id[index] = [
                                        ...project_id[index],
                                        e.target.value,
                                      ];
                                      projects[index] = [
                                        ...projects[index],
                                        { project_id: project_id[index][inde] },
                                      ];
                                    } else {
                                      project_id[index].splice(inde);
                                      projects[index].splice(inde);
                                    }
                                  }}
                                  value={usaha.id}
                                  type="checkbox"
                                />{" "}
                                {usaha.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
              <div className="card-toolbar mt-2 d-flex justify-content-end">
                <button className="btn btn-success font-weight-bolder font-size-sm">
                  <span className="svg-icon svg-icon-md svg-icon-white"></span>
                  {loading ? <Spinner /> : "+ Tambah User"}
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
