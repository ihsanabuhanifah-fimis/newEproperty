import React from "react";
import axios from "axios";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { config } from "../../../config";

function Dashboard({ className, setId}) {
  const history = useHistory();
  const headers = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("res-api") + localStorage.getItem("res-host")+ localStorage.getItem("res-net"),
      "Content-Type": "application/json",
    },
  
  };
  const match = useRouteMatch();
  const option = [10, 25, 50, 100, 250];
  const [perusahaan, setPerusahaan] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [pagination, setPagination] = React.useState("");
  const [status, setStatus] = React.useState(1);
  let [keyword, setKeyword] = React.useState("");
  
  React.useEffect(() => {
    get(pageSize);
  
  }, [pageSize]);

  const NextHandle = () => {
    get(pageSize, status, pagination.currentPage + 1);
  };
  const PreviousHandle = () => {
    get(pageSize, status, pagination.currentPage - 1);
  };
  const SelectItem = (e) => {
    get(e.target.value);
    setPageSize(e.target.value);
  };

  const get = async (pageSize, status = 1, currentPage = 1) => {
    const url = `${config.api_host}/admin/v1/companies?status=${status}&row=${pageSize}&page=${currentPage}`;

    try {
      let response = await axios.get(url, headers);

      setPerusahaan(response.data.data);

      setPagination(response.data.pagination);
    } catch {}
  };
  const getSearch = async (keyword) => {
    const url = `${config.api_host}/admin/v1/companies?keyword=${keyword}&status=1&row=10`;

    try {
      let response = await axios.get(url, headers);

      setPerusahaan(response.data.data)
      setPagination(response.data.pagination);
    } catch {}
  };
  const SelectStatus = (e) => {
    get(pageSize, e.target.value);
    setStatus(e.target.value);
  };

  const onSearchHandle = (e) => {
    e.preventDefault()
    getSearch(keyword);
  };
  return (
    <div className={`card card-custom ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 py-5">
        <div>
          <h2 className="card-title align-items-start flex-column mb-5">
            <div className="card-label font-weight-bolder text-dark">
             DAFTAR PERUSAHAAN
            </div>
          </h2>
          <div>
            <select onChange={SelectItem} className="btn border mr-3">
              {option.map((opt, index) => (
                <option key={index} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <select onChange={SelectStatus} className="btn border">
              <option value="0">All</option>
              <option value="1">
                Active
              </option>

              <option value="2">InActive</option>
            </select>
           
          </div>
          
        </div>

        <div className="card-toolbar  ">
          <form onSubmit={onSearchHandle}>
            <input
              className="form-control mt-2"
              placeholder="Search ..."
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
          </form>
          <button
              onClick={() => {
                history.push(`${match.url}/created`);
              }}
              className="btn ml-3 mt-2 btn-success font-weight-bolder font-size-sm"
            >
              Tambah
            </button>
        </div>
      </div>

      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-0">
        {/* begin::Table */}
        <div className="table-responsive">
          <table
            className="table table-head-custom table-vertical-center"
            id="kt_advance_table_widget_1"
          >
            <thead>
              <tr className="text-left">
                <th className="pl-0" style={{ width: "20px" }}>
                  <label className="checkbox checkbox-lg checkbox-single">
                    <input type="checkbox" value="1" />
                    <span></span>
                  </label>
                </th>
                <th className="pr-0" style={{ width: "50px" }}>
                  No
                </th>
                <th style={{ minWidth: "80px" }}>Updated</th>
                <th style={{ minWidth: "150px" }}>Nama Perusahaan</th>
                <th style={{ minWidth: "100px" }}>Created By </th>
                <th style={{ minWidth: "150px" }}>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {perusahaan.map((usaha, index) => (
                <tr key={usaha.id}>
                  <td className="pl-0">
                    <label className="checkbox checkbox-lg checkbox-single">
                      <input type="checkbox" value="1" />
                      <span></span>
                    </label>
                  </td>

                  <td className="pr-0">
                    <p className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                      {index + 1}
                    </p>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setId(usaha.id);
                        history.push(`${match.url}/updated`);
                      }}
                      className="btn btn-primary font-weight-bolder font-size-sm"
                    >
                      Updated
                    </button>
                  </td>
                  <td>
                    <a
                      onClick={() => {
                        setId(usaha.id);
                        history.push(`${match.url}/child`);
                      }}
                      className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                    >
                      {usaha.name}
                    </a>
                  </td>
                  <td>
                    <p
                      
                      className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                    >
                      {usaha.createdBy}
                    </p>
                  </td>
                  <td>
                    <p
                      
                      className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                    >
                      {usaha.lastUpdated}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={`d-flex justify-content-between`}>
            <p>
              {pageSize > pagination.totalCount
                ? pagination.totalCount
                : pageSize}{" "}
              dari {pagination.totalCount} Perusahaan
            </p>
            {/* begin::Header */}

            <p>
              {pagination.currentPage} dari {pagination.totalPages} Page
            </p>

            <div>
              <button
                onClick={PreviousHandle}
                disabled={pagination.currentPage ===1}
                className="btn font-weight-bolder  ml-2"
              >
                Previous
              </button>

              <button
                onClick={NextHandle}
                disabled={pagination.currentPage === pagination.totalPages}
                className="btn font-weight-bolder "
              >
                Next
              </button>
            </div>
          </div>
        </div>
        {/* end::Table */}
      </div>

      {/* end::Body */}
    </div>
  );
}

export default Dashboard;
