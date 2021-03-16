import React from "react";
import ReactApexChart from "react-apexcharts";
import axios from 'axios'

function PenjualanUnit({ company,project, year, month, headers, api_url }) {
  const [target, setTarget] = React.useState([])
  const [realisasi, setRealisasi] = React.useState([])
  const [persen, setPersen] = React.useState([])
  const get = async () => {
    const url = `${api_url}/api/sales/v1/penjualan?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await axios.get(url, headers);
      let data = response.data.data;
   
      let jumlah = data.length;
      let target_qty = [];
      let realisasi_qty = [];
      let percent_qty = [];
      for (let i = 0; i < jumlah; i++) {
        target_qty = [...target_qty, data[i].target_qty];
        realisasi_qty = [...realisasi_qty, data[i].realisasi_qty];
        percent_qty = [...percent_qty, data[i].percent_qty];
      }

      setTarget(target_qty)
      setRealisasi(realisasi_qty)
      setPersen(percent_qty)
     
     
    } catch (err) {}
  };
  React.useMemo(() => {
    get();
  }, [project || year||  month]);
 
  const  series = [{
    name: 'Target',
    type: 'column',
    data: target
  },
  {
    name: 'Realisasi ',
    type: 'column',
    data: realisasi
  },  
  {
    name: 'Persen',
    type: 'line',
    data: persen
  }]
  

  const options = {
    chart: {
      height: 200,
      type: 'line',
    },
    stroke: {
      width: [0, 4, 4]
    },
   
    dataLabels: {
      enabled: true,
      enabledOnSeries: [2]
    },
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    
   
  }



    return (
      <div  id="chart">
          <div className="card-header pt-5 d-flex justify-content-center ">
          <h4 className="card-title text-center flex-column">
            <span className="card-label text-center font-weight-bolder text-dark">
            Penjualan {year} by Unit
            </span>
            <span className="text-muted mt-3 font-weight-bold font-size-sm"></span>
          </h4>
        </div>
     
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            width="100%"
            height="350"
          />
        </div>
     
    );
  }


export default PenjualanUnit;
