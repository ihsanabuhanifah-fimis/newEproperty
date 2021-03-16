import React from "react";
import Axios from "axios";
import Chart from "react-apexcharts";
function Likuiditas({ company,project, year, month, headers, api_url }) {
  const [series, setSeries] = React.useState([0]);
  const [series2, setSeries2] = React.useState([0]);

  const getRatio = async () => {
    const url = `${api_url}/api/accounting/v1/cashratio?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await Axios.get(url, headers);
      let data = response.data.data;

      setSeries([data]);
    } catch (err) {}
  };
  const getCurrent = async () => {
    const url = `${api_url}/api/accounting/v1/currentratio?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await Axios.get(url, headers);
      let data = response.data.data;

      setSeries2([data]);
    } catch (err) {}
  };
  const options = {
    chart: {
      type: "radialBar",
      color: "#FFFFFF",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },    
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,

        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "22px",
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ["Average Results"],
  };

  React.useMemo(() => {
    getRatio();
    getCurrent();
  }, [project || year || month]);

  return (
    <div id="chart">
      <div className="card-header border-0 pt-5">
        <h4 className="card-title text-center flex-column">
          <span className="card-label text-center font-weight-bolder text-dark">
            Rasio Likuiditas
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm"></span>
        </h4>
      </div>
      <div className="d-flex justify-content-center flex-column flex-md-row flex-lg-row  flex-sm-column ">
        <div className="text-center">
          <Chart options={options} series={series}  type="radialBar" width={300} />
          <h6>Cash Ratio</h6>
        </div>
        <div className="text-center">
          <Chart options={options} series={series2} type="radialBar" width={300} />
          <h6>Current Ratio</h6>
        </div>
      </div>
    </div>
  );
}

export default Likuiditas;
