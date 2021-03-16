import React from "react";
import Axios from "axios";
import ReactApexChart from "react-apexcharts";

const CollectionBulanIni = ({company, project, year, month, headers, api_url }) => {
  const [persentColl, setPercentColl] = React.useState([]);
  const [series, setSeries] = React.useState([0,0,0,0]);
  const [identity, setIdentity] = React.useState(["No Data", "No Data", "No Data", "No Data"]);
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
  const getPercentColl = async () => {
    const url = `${api_url}/api/finances/v1/percentcoll?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await Axios.get(url, headers);
      let data = response.data.data;

      setPercentColl(data);
    } catch (err) {}
  };
  const getPercentHold = async () => {
    const url = `${api_url}/api/finances/v1/percenthold?project=${project}&year=${year}&month=${month}`;

    try {
      let response = await Axios.get(url, headers);
      let data = response.data.data;
     
      let jumlah = data.length;
      let percents = [];
      let name = [];
      for (let i = 0; i < jumlah; i++) {
        percents = [... percents, data[i].percent];
        name = [...name, data[i].name];
      }

      setSeries( percents);
      setIdentity(name)
    } catch (err) {}
  };
  React.useMemo(() => {
    getPercentColl();
    getPercentHold();
  }, [project || year || month]);
  return (
    <React.Fragment>
      <div className="row py-5">
        <div className="col-12 ">
          <div className="row overflow-auto ">
            <div className="col-3 col-sm-3 col-md-1 col-lg-1">Lancar</div>
            <div className="col-6 col-sm-6 col-md-10 col-lg-10">
              <div className="progress" style={{ height: "25px" }}>
                <div
                  className="  progress-bar"
                  role="progressbar"
                  style={{width: `${persentColl.lancar}%`}}
                  aria-valuenow={persentColl.lancar}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {persentColl.lancar}%
                </div>
              </div>
            </div>
            <div className="col-3 col-sm-3 col-md-1 col-lg-1">Tidak Lancar</div>
          </div>
        </div>
        <div className="col-12">
          <h4 className="text-center my-3">Alasan Tunda Pembayaran</h4>
          <div className="row ">
           {series.map((seri, index)=>
           
           <div key={index}
            className="col-12 col-sm-12 col-md-3 col-lg-3   ">
                  <div className="d-flex justify-content-center">
           <ReactApexChart
             options={options}
             series={[seri]}
             type="radialBar"
             width={300}
           />
             </div >
          <h6 className="text-center">{identity[index]}</h6>
         </div >
         
           )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CollectionBulanIni;
