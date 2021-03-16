import React from "react";
import Axios from "axios";
import Chart from "react-apexcharts";
function CaraBayar ({ company, project, year, month, headers, api_url} ) {

  const [series, setSeries] = React.useState([100]);
  const [labels, setLabels] = React.useState(['']);

  const get = async () => {
    const url = `${api_url}/api/sales/v1/penjualanbypayment?company=${company}&project=${project}&year=${year}&month=${month}`;

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
    
      const options = {
        chart: {
          width: 500,
          type: "donut",
          dropShadow: {
            enabled: true,
            color: "#111",
            top: -1,
            left: 3,
            blur: 3,
            opacity: 1,
          },
        },
        stroke: {
          width: 0,
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true,
                },
              },
            },
          },
        },
        labels: labels,
        dataLabels: {
          dropShadow: {
            blur: 3,
            opacity: 0.8,
          },
        },

        states: {
          hover: {
            filter: "none",
          },
        },
        theme: {
          palette: "palette2",
        },

        legend: {
          position: "bottom",
        },
      }
  
      React.useMemo(() => {
        get();
      }, [project || year || month]);

    return (
      <div  id="chart">
          <div className="card-header  pt-5 d-flex justify-content-center">
          <h4 className="card-title text-center flex-column">
            <span className="card-label text-center font-weight-bolder text-dark">
              Cara Bayar
            </span>
            <span className="text-muted mt-3 font-weight-bold font-size-sm"></span>
          </h4>
        </div>
      <div className="d-flex justify-content-center">
      <Chart
          options={options}
          series={series}
          type="donut"
          width={400}
        />
      </div>
      </div>
    );
  }


export default CaraBayar;
