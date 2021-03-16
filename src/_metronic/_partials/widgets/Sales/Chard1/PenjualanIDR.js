import React from "react";
import ReactApexChart from "react-apexcharts";
import axios from 'axios'

function PenjualanIDR({ company,project, year, month, headers, api_url }) {
  const [target, setTarget] = React.useState([])
  const [realisasi, setRealisasi] = React.useState([])
  const [persen, setPersen] = React.useState([])
  const get = async () => {
    const url = `${api_url}/api/sales/v1/penjualan?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await axios.get(url, headers);
      let data = response.data.data;

      let jumlah = data.length;
      let target_value = [];
      let realisasi_value = [];
      let percent_value = [];
      for (let i = 0; i < jumlah; i++) {
        target_value = [...target_value, data[i].target_value];
        realisasi_value = [...realisasi_value, data[i].realisasi_value];
        percent_value = [...percent_value, data[i].percent_value];
      }

      setTarget(target_value)
      setRealisasi(realisasi_value)
      setPersen(percent_value)
     
     
    } catch (err) {}
  };
  React.useMemo(() => {
    get();
  }, [project || year || month]);
 
  const series = [
    {
      name: "Target",
      data: target
    },
    {
      name: "Realisasi",
      data: realisasi
    },
    {
      name: "Persen",
      data: target
    }
  ]
  
  const options = {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#77B6EA', '#FF0000', '#545454'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth'
    },
   
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    markers: {
      size: 1
    },
    xaxis: {
    
      categories: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      title: {
        text: 'Month'
      }
    },
    // yaxis: {
    //   title: {
    //     text: 'Temperature'
    //   },
    //   min: 5,
    //   max: 40
    // },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  }
  

  



    return (
      <div  id="chart">
         <div className="card-header pt-5 d-flex justify-content-center">
          <h4 className="card-title text-center flex-column">
            <span className="card-label text-center font-weight-bolder text-dark">
            Penjualan {year} by IDR
            </span>
            <span className="text-muted mt-3 font-weight-bold font-size-sm"></span>
          </h4>
        </div>
        <div >
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            width="100%"
            height="350"
          />
        </div>
      </div>
    );
  }


export default PenjualanIDR;
