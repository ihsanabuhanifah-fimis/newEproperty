/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";

export function StockUnit({
  className,
  company,
  project,
  year,
  month,
  headers,
  api_url,
}) {
  const [datas, setDatas] = React.useState([]);
const [api_urlku, setApi_urlku] = React.useState("")
React.useEffect(()=> {
  setApi_urlku(api_url)
    }, [])
  const get = async () => {
    const url = `${api_urlku}/api/sales/v1/stockunitpertype?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await axios.get(url, headers);
      console.log('penjualan', data)
      let data = response.data.data;
 
      setDatas(data);
    } catch (err) {}
  };

  React.useMemo(() => {
    get();
  }, [project || year || month]);

  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header  pt-5 d-flex justify-content-center ">
        <h3 className="card-title text-center flex-column">
          <span className="card-label font-weight-bolder text-dark">
          Stok Unit Per Tipe
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
                  Sock (Unit)
                </th>
                <th className="p-0" style={{ minWidth: "50px" }}>
                  Terjual (Unit)
                </th>
                <th className="p-0" style={{ minWidth: "50px" }}>
                  Sisa (Unit)
                </th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}> 
                  <td className="pl-0">
                    <p className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                     {data.type}
                    </p>
                  </td>
                  <td className="pl-0">
                    <p className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                     {data.stock}
                    </p>
                  </td>
                  <td className="text-left">
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                     {data.sold}
                    </span>
                  </td>
                  <td className="pl-0">
                    <p className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                     {data.remain}
                    </p>
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
