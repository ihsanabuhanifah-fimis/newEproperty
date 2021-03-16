import React from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

function PenerimaanUtang({ company, project, year, month, headers, api_url }) {
  const [target, setTarget] = React.useState([]);
  const [realisasi, setRealisasi] = React.useState([]);
  const [persen, setPersen] = React.useState([]);
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
    const url = `${api_url}/api/finances/v1/penerimaanhutang?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await axios.get(url, headers);
      let data = response.data.data;
     
      let jumlah = data.length;
      let target_qty = [];
      let realisasi_qty = [];
      let percent_qty = [];
      for (let i = 0; i < jumlah; i++) {
        target_qty = [...target_qty, data[i].target];
        realisasi_qty = [...realisasi_qty, data[i].realisasi];
        percent_qty = [...percent_qty, data[i].percent];
      }

      setTarget(target_qty);
      setRealisasi(realisasi_qty);
      setPersen(percent_qty);
    } catch (err) {}
  };
  React.useMemo(() => {
    get();
  }, [project || year || month]);

  const series = [
    {
      name: "Target",
      type: "column",
      data: target,
      formatter: function (y) {
        let number_string = y.toString(),
          sisa = number_string.length % 3,
          rupiah = number_string.substr(0, sisa),
          ribuan = number_string.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
          let separator = sisa ? "." : "";
          rupiah += separator + ribuan.join(".");
        }
        return "Rp." + rupiah;
      },
    },
    
    {
      name: "Realisasi",
      type: "column",
      data: realisasi,
      formatter: function (y) {
        let number_string = y.toString(),
          sisa = number_string.length % 3,
          rupiah = number_string.substr(0, sisa),
          ribuan = number_string.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
          let separator = sisa ? "." : "";
          rupiah += separator + ribuan.join(".");
        }
        return "Rp." + rupiah;
      },
    },
    {
      name: "Persen",
      type: "line",
      data: persen,
      formatter: function (y) {
        return y.toFixed(0) + "%";
      },
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [1, 1, 4],
    },

    xaxis: {
      categories: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
    },
    yaxis: [
      {
        seriesName: "Target",
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#008FFB",
        },
        labels: {
          style: {
            colors: "#008FFB",
          },
        },

        tooltip: {
          enabled: true,
        },
      },
      {
        seriesName: "Incsome",
      },
      {
        seriesName: "Persen",
        opposite: true,

        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#FEB019",
        },
        labels: {
          style: {
            colors: "#FEB019",
          },
          formatter: function (y) {
            return y.toFixed(0) + "%";
          },
        },
      },
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60,
      },
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40,
    },
  };

  return (
    <div id="chart">
      <div className="card-header border-0 ">
        <h4 className="card-title text-center flex-column">
          <span className="card-label text-center font-weight-bolder text-dark">
            Penerimaan Hutang
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm"></span>
        </h4>
      </div>

      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="350"
        width="100%"
      />
    </div>
  );
}

export default PenerimaanUtang;
