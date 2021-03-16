import React from "react";
import Axios from "axios";
import ReactApexChart from 'react-apexcharts'
function SuratPesanan ({ company,project, year, month, headers, api_url }) {
   
      
  const [series, setSeries] = React.useState([1]);
  const [labels, setLabels] = React.useState([""]);
  
  const get = async () => {
    const url = `${api_url}/api/sales/v1/agingreservasi?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await Axios.get(url, headers);
      let data = response.data.data;
      let jumlah = data.length;
      let datas = [];
      let label = [];
      for (let i = 0; i < jumlah; i++) {
        datas = [...datas, data[i].count];
        label = [...label, data[i].name];
      }
   
      setSeries(datas);
      setLabels(label);
    } catch (err) {}
  };
  React.useMemo(() => {
    get();
  }, [project || year || month]);
        const options = {
          chart: {
            width: 500,
            type: 'pie',
          },
          
          legend: {
            position: 'bottom'
          },
          labels: labels,
          responsive: [{
            breakpoint: 300,
            options: {
              chart: {
                width: 100
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      
      
      
    

  

 
      return (
        

        <div  id="chart">
           <div className="card-header  pt-5 d-flex justify-content-center ">
          <h4 className="card-title text-center flex-column">
            <span className="card-label text-center font-weight-bolder text-dark">
              Tenggang Reservasi Ke Surat Pesanan
            </span>
            <span className="text-muted mt-3 font-weight-bold font-size-sm"></span>
          </h4>
        </div>
        <div className="d-flex justify-content-center">
          <ReactApexChart
            options={options}
            series={series}
            type="pie"
            width={400}
          />
        </div>
      </div>

      )
    }


export default SuratPesanan
