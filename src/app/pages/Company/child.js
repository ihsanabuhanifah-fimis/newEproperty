import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { config} from "../../../config";

function Child({ className, id}) {
  
  const history = useHistory();
  const headers = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("res-api") + localStorage.getItem("res-host")+ localStorage.getItem("res-net"),
      "Content-Type": "application/json",
    },
  };
  const [perusahaan, setPerusahaan] = React.useState([]);

  React.useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const url = `${config.api_host}/admin/v1/companies/${id}/childs`;
    try {
      let response = await axios.get(url, headers);
      setPerusahaan(response.data.data);

    
    } catch {}
  };
  return (
    <div className={`card card-custom ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 py-5">
        <div>
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">
              Daftar Anak Perusahaan
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
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>{" "}
            Kembali
          </a>
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
                <th className="pr-0" style={{ width: "50px" }}>
                  No
                </th>

                <th style={{ minWidth: "150px" }}>Nama Perusahaan</th>
              </tr>
            </thead>
            <tbody>
              {perusahaan !== [] ? (
                perusahaan.map((usaha, index) => (
                  <tr key={index}>
                    <td className="pr-0">
                      <p className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                        {index + 1}
                      </p>
                    </td>
                    <td className="pr-0">
                      <p className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                        {usaha.name}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">
                    Perusahaan ini belum memiliki anak perusahaan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* end::Table */}
      </div>
    </div>
  );
}

export default Child;
