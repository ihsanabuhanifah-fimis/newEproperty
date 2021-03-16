/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";

export function PenjualanBulanIni({
  className,
  company,
  project,
  year,
  month,
  headers,
  api_url,
}) {
  const [datas, setDatas] = React.useState([]);

  const get = async () => {
    const url = `${api_url}/api/sales/v1/penjualanasof?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await axios.get(url, headers);
    
      let data = response.data.data;
    
      setDatas(data);
    } catch (err) {}
  };
  React.useMemo(() => {
    get();
  }, [project ||year || month]);

  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header  pt-5 d-flex justify-content-center ">
        <h3 className="card-title text-center flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Penjualan Bulan Ini
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm"></span>
        </h3>
      </div>
      {/* Body */}
      <div className="card-body pt-3 pb-0">
        <div className="table-responsive">
          <table className="table  table-vertical-center">
            <thead>
              <tr>
                <th className="p-0" style={{ minWidth: "200px" }}></th>
                <th className="p-0" style={{ minWidth: "50px" }}>
                  Unit
                </th>
                <th className="p-0" style={{ minWidth: "200px" }}>
                  Nilai Kontrak (Rp)
                </th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}> 
                  <td className="pl-0">
                    <p className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                     {data. name}
                    </p>
                  </td>
                  <td className="pl-0">
                    <p className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                     {data.unit}
                    </p>
                  </td>
                  <td className="text-left">
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                     {data.value}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
