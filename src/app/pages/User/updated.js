import React from "react";

import axios from "axios";
import { config } from "../../../config";
import { Spinner, Alert } from "./property";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
const Updated = ({ className, id }) => {
  const history = useHistory();
  const headers = {
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer " +
        localStorage.getItem("res-api") +
        localStorage.getItem("res-host") +
        localStorage.getItem("res-net"),

      "Content-Type": "application/json",
    },
  };

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [api_url, setApi_url] = React.useState("");
  const [api_key, setApi_key] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [status, setStatus] = React.useState();
  const [perusahaan, setPerusahaan] = React.useState([]);
  const [company_id, setCompany_id] = React.useState([]);
  const [project_id, setProject_id] = React.useState([]);
  const [company, setCompany] = React.useState(false);
  const [project, setProject] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const [sales, setSales] = React.useState(false);
  const [accounting, setAccounting] = React.useState(false);
  const [finance, setFinance] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [alert, setAlert] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [listPerusahaan, setListPerusahaan] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [data, setData] = React.useState([]);
  const submitHandle = (e) => {
    e.preventDefault();
    setLoading(true);
    post();
  };

  React.useMemo(() => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [message]);
  const getProject2 = async (index, id) => {
    const url = `${config.api_host}/admin/v1/companies/${id}/childs`;
    try {
      let response = await axios.get(url, headers);
      listPerusahaan[index] = response.data.data;
      let jumlah = listPerusahaan[index].length;
   
      let projectName = [];

      for (let i = 0; i < jumlah; i++) {
        projectName.push({
          id: response.data.data[i].id,
          status: false,
        });
      }
      data[index] = { id: 0, status: true, projects: projectName };
      setData([...data, { id: 0, status: true, projects: projectName }]);

      setListPerusahaan([...listPerusahaan]);

      // data.push({id: 0, status :true ,projects : projectName})
    } catch {}
  };
  const getProject = async (index, id) => {
    const url = `${config.api_host}/admin/v1/companies/${id}/childs`;
    try {
      let response = await axios.get(url, headers);

      listPerusahaan[index] = response.data.data;
    } catch {}
  };
  const getUser = async () => {
    const url = `${config.api_host}/admin/v1/admins/${id}`;
    try {
      let response = await axios.get(url, headers);
      setData(response.data.data.companies);

      setName(response.data.data.name);
      setEmail(response.data.data.email);
      setLevel(response.data.data.level);
      setApi_url(response.data.data.api_url);
      setApi_key(response.data.data.api_key);
      setCompany(response.data.data.access[0].status);
      setProject(response.data.data.access[1].status);
      setUser(response.data.data.access[2].status);
      setSales(response.data.data.access[3].status);
      setAccounting(response.data.data.access[4].status);
      setFinance(response.data.data.access[5].status);
      setStatus(response.data.data.status);

      let data2 = [];

      let jumlahCompany = response.data.data.companies.length;

      for (let i = 0; i < jumlahCompany; i++) {
        data2 = [...data2, response.data.data.companies[i].id];

        listPerusahaan.push([]);
        list.push(response.data.data.companies[i].id);
      }

      let dataProject = [];
      let dataProjects = [];
      let dataProject_id = [];
      let dataProjects_id = [];
      for (let j = 0; j < jumlahCompany; j++) {
        getProject(j, response.data.data.companies[j].id);
        let jumlahProject = response.data.data.companies[j].projects.length;

        for (let k = 0; k < jumlahProject; k++) {
          dataProject_id = [
            ...dataProject_id,
            response.data.data.companies[j].projects[k].id,
          ];
          if (response.data.data.companies[j].projects[k].status === true) {
            dataProject = [
              ...dataProject,
              { project_id: response.data.data.companies[j].projects[k].id },
            ];
          }
        }

        dataProjects = [...dataProjects, dataProject];
        dataProjects_id = [...dataProjects_id, dataProject_id];
        dataProject = [];
        dataProject_id = [];
      }

      setProjects(dataProjects);
      setProject_id(dataProjects_id);
      setListPerusahaan(listPerusahaan);
      setCompany_id(data2);
    } catch {}
  };
  const get = async () => {
    const url = `${config.api_host}/admin/v1/companies/active`;
    try {
      let response = await axios.get(url, headers);

      setPerusahaan(response.data.data);
    } catch {}
  };
  const getName = (idPerusahaan) => {
    const jumlah = perusahaan.length;

    for (let i = 0; i < jumlah; i++) {
      if (perusahaan[i].id == idPerusahaan) {
        return perusahaan[i].name;
      }
    }
  };
  React.useEffect(() => {
    getUser();
    get();
  }, []);

  const post = async () => {
    const url = `${config.api_host}/admin/v1/admins/info`;

    const filtered = company_id.filter(function (el) {
      return el != null;
    });
    const jumlah = filtered.length;
    let companies = [];
    for (var i = 0; i < jumlah; i++) {
      companies.push({
        company_id: filtered[i],
        projects: projects[i],
      });
    }

    const payload = {
      id: id,
      status: status,
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
      let response = await axios.put(url, payload, headers);
      setMessage(response.data.message);
      setLoading(false);
      swal({
        title: "Good job!",
        text: response.data.message,
        icon: "success",
      });
    } catch {
      setLoading(false);
      setMessage("error");
      setAlert("alert-danger");
    }
  };

  const add = () => {
    setList([...list, ""]);
    setCompany_id([...company_id, 0]);
    setListPerusahaan([...listPerusahaan, []]);
    setProject_id([...project_id, []]);
    setProjects([...projects, []]);
  };
  const peru = () => {
    setListPerusahaan([...listPerusahaan]);
  };


  return (
    <React.Fragment>
      <div className={`card card-custom ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
          <div>
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label font-weight-bolder text-dark">
                Update Data Users
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
                value={email || ""}
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
                value={api_url || ""}
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
                value={api_key || ""}
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
                {level == 1 ? (
                  <React.Fragment>
                    <label className="mr-3">
                      <input
                        onChange={() => setCompany(!company)}
                        type="checkbox"
                        checked={company}
                      />{" "}
                      Company
                    </label>
                    <label className="mr-3">
                      <input
                        onChange={() => setProject(!project)}
                        checked={project}
                        type="checkbox"
                      />{" "}
                      Project
                    </label>
                    <label className="mr-3">
                      <input
                        checked={user}
                        onChange={() => setUser(!user)}
                        type="checkbox"
                      />{" "}
                      User
                    </label>
                  </React.Fragment>
                ) : (
                  ""
                )}
                {level == 2 ? (
                  <React.Fragment>
                    <div>
                      <label className="mr-3">
                        <input
                          onChange={() => setSales(!sales)}
                          type="checkbox"
                          checked={sales}
                        />{" "}
                        Sales
                      </label>
                      <label className="mr-3">
                        <input
                          onChange={() => setAccounting(!accounting)}
                          type="checkbox"
                          checked={accounting}
                        />{" "}
                        Accounting
                      </label>
                      <label className="mr-3">
                        <input
                          onChange={() => setFinance(!finance)}
                          type="checkbox"
                          checked={finance}
                        />{" "}
                        Finance
                      </label>
                    </div>
                    <div className="d-flex justify-content-between mb-5">
                      <a className="btn btn-primary" onClick={add}>
                        Tambah Perusahaan
                      </a>
                      <a className="btn btn-success" onClick={peru}>
                        Tampilkan Project
                      </a>
                    </div>

                    {list.map((listt, index) => {
                      return (
                        <div
                          className="shadow-lg p-5 mb-5 bg-white rounded"
                          key={index}
                        >
                          <div className="d-flex justify-content-between">
                            <label>
                              <a className="mt-3 btn  font-weight-bold font-size-lg">
                                Nama Perusahaan
                              </a>
                            </label>
                            <label>
                              <a
                                className="mt-3 btn btn-outline-danger  font-size-sm"
                                onClick={() => {
                                  swal({
                                    title: "",
                                    text: "Apakah yakin akan menghapusnya?",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                  }).then((willDelete) => {
                                    if (willDelete) {
                                      delete list[index];
                                      delete company_id[index];
                                      post();
                                   
                                      // list.shift(index);
                                      // company_id.shift(index);
                                      // projects.shift(index)
                                      // project_id.shift(index)
                                      // post();
                                    } else {
                                    }
                                  });
                                }}
                              >
                                Hapus Perusahaan
                              </a>
                            </label>
                          </div>

                          <select
                            onChange={(e) => {
                              company_id[index] = e.target.value;
                              getProject2(index, e.target.value);
                            }}
                            className="form-control"
                          >
                            <option defaultValue={company_id[index]}>
                              {getName(company_id[index])}
                            </option>
                            {perusahaan.map((usaha) => (
                              <option value={usaha.id} key={usaha.id}>
                                {usaha.name}
                              </option>
                            ))}
                          </select>
                          <p className="font-weight-bold mr-1 mt-3">
                            Pilih Project
                          </p>
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
                                  defaultChecked={
                                    data[index].projects[inde].status
                                  }
                                />
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
