import React from "react";
import axios from "axios";

const AgingPiutang = ({
  className,
  company,
  project,
  year,
  month,
  headers,
  api_url,
}) => {
  const [total, setTotal] = React.useState();
  const [detail, setDetail] = React.useState([]);

  const rupiah = (angka) => {
    let number_string = angka.toString(),
      sisa = number_string.length % 3,
      rupiah = number_string.substr(0, sisa),
      ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    return "Rp." + rupiah;
  };
  const get = async () => {
    const url = `${api_url}/api/finances/v1/agingpiutang?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await axios.get(url, headers);

      let data = response.data.data;

      setTotal(data.total);
      setDetail(data.detail);
    } catch (err) {}
  };
  React.useMemo(() => {
    get();
  }, [project || year || month]);
  return (
    <React.Fragment>
      <div className={`card  `}>
        {/* Head */}
        <div className="card-header border-0 ">
        <h4 className="card-title text-center flex-column">
          <span className="card-label text-center font-weight-bolder text-dark">
            Aging Piutang
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm"></span>
        </h4>
      </div>
        {/* Body */}
        <div className="card-body pt-3 pb-0">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-center" colSpan="3">
                    <h3>{rupiah(parseInt(total, 10))}</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {detail.map((detel, index) => (
                  <tr key={index}>
                    <td style={{ minWidth: "80px" }} className="p-4">
                      <p className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                        {detel.name}
                      </p>
                    </td>
                    <td style={{ minWidth: "150px" }} className="pl-0">
                      <p className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                        <div className="progress" style={{ height: "25px" }}>
                          <div
                            className="  progress-bar "
                            role="progressbar"
                            style={{ width: `${detel.percent}%` }}
                            aria-valuenow="100"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {detel.percent}%
                          </div>
                        </div>
                      </p>
                    </td>
                    <td style={{ minWidth: "100px" }} className="text-left pl-5">
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg pl-5">
                        {rupiah(parseInt(detel.value, 10))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AgingPiutang;
