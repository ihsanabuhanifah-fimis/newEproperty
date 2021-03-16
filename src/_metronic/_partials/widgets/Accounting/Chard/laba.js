/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import {arrowgreen} from "../../../../../image/greenarrow.png"

export function Laba({
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
    const url = `${api_url}/api/accounting/v1/laba?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await axios.get(url, headers);
    
      let data = response.data.data;
      console.log('laba', data)
      setDatas(data);
    } catch (err) {}
  };
  React.useMemo(() => {
    get();
  }, [project || year || month]);

  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header pt-5 d-flex justify-content-center">
        <h3 className="card-title text-center flex-column">
          <span className="card-label font-weight-bolder text-dark ">
           Laba
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
                  
                </th>
                <th className="p-0" style={{ minWidth: "50px" }}></th>
                <th className="p-0" style={{ minWidth: "200px" }}>
                 Tahun Ini (Rp)
                </th>
                <th className="p-0" style={{ minWidth: "200px" }}>
                Tahun Lalu (Rp)
                </th>
              
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}> 
                  <td className="pl-0">
                    <p className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                     {data.name}
                    </p>
                  </td>
                  <td className="pl-0">
                    <p className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                     {data.percentage} %
                    </p>
                  </td>
                  <td className="pl-0">
                    <p className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
               {data.current > data.last ? (  <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Increase.svg/481px-Increase.svg.png" height="10"/>) :   <img  src="https://www.pinclipart.com/picdir/big/100-1008699_clipart-shapes-triangle-red-arrow-down-png-download.png" height="10"/>}
                    </p>
                  </td>
                  <td className="text-left">
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                     {data.current}
                    </span>
                  </td>
                  <td className="text-left">
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                     {data.last}
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
