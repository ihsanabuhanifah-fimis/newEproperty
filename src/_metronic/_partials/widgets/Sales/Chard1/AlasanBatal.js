
import React from "react";
import Axios from "axios";
import ReactApexChart from "react-apexcharts";
const AlasanBatal = ({ company, project, year, month, headers, api_url }) => {
  const [series, setSeries] = React.useState([1]);
  const [labels, setLabels] = React.useState([""]);

  const get = async () => {
    const url = `${api_url}/api/sales/v1/alasanbatal?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await Axios.get(url, headers);
      let data = response.data.data;
      let jumlah = data.length;
      let datas = [];
      let label = [];
      for (let i = 0; i < jumlah; i++) {
        datas = [...datas, data[i].unit];
        label = [...label, data[i].name];
      }
     
      setSeries(datas);
      setLabels(label);
    } catch (err) {}
  };
  React.useMemo(() => {
    get();
  }, [project  || year || month]);
  const options = {
    chart: {
      width: "100%",
      type: "pie",
    },

    legend: {
      position: "bottom",
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 300,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <div id="chart">
      <div className="card-header border-0 ">
        <h4 className="card-title text-center flex-column">
          <span className="card-label text-center font-weight-bolder text-dark">
            Alasan Batal
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm"></span>
        </h4>
      </div>
      <div className="d-flex justify-content-center overflow-visible  ">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={"400px"}
        
        />
      </div>
    </div>
  );
};

export default AlasanBatal;
