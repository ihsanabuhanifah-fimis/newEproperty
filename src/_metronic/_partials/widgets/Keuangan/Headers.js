import React from "react";
import Axios from "axios";
export function Headers({company, project, year, month, headers, api_url }) {
  const [pembayaranhutang, setPembayaranhutang] = React.useState([]);
  const [piutangjt, setPiutangjt] = React.useState([]);
  const [outstandingretensi, setOutStandingretensi] = React.useState([]);
  const [realisasiretensi, setRealisasiretensi] = React.useState([]);

  const getPembayaranhutang = async () => {
    const url = `${api_url}/api/finances/v1/pembayaranhutang?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await Axios.get(url, headers);
      let data = response.data.data;
 
      setPembayaranhutang(data);
    } catch (err) {}
  };

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
  const getPiUtang = async () => {
    const url = `${api_url}/api/finances/v1/piutangjt?project=${project}&year=${year}&month=${month}`;

    try {
      let response = await Axios.get(url, headers);
      let data = response.data.data;

      setPiutangjt(data);
    } catch (err) {}
  };

  const getOutStandingretensi = async () => {
    const url = `${api_url}/api/finances/v1/outstandingretensi?project=${project}&year=${year}&month=${month}`;

    try {
      let response = await Axios.get(url, headers);
      let data = response.data.data;

      setOutStandingretensi(data);
    } catch (err) {}
  };
  const getRealisasiretensi = async () => {
    const url = `${api_url}/api/finances/v1/realisasiretensi?project=${project}&year=${year}&month=${month}`;

    try {
      let response = await Axios.get(url, headers);
      let data = response.data.data;

      setRealisasiretensi(data);
    } catch (err) {}
  };

  React.useMemo(() => {
    getPembayaranhutang();
    getPiUtang();
    getOutStandingretensi();
    getRealisasiretensi();
  }, [project || year || month]);
  return (
    <React.Fragment>
      <div className="row px-4">
        <div className="col-12 col-sm-12 col-md-12 col-lg-3">
          <div className="row bg-light-primary px-6 py-8 rounded-xl mb-4 ml-md-2 ml-sm-0 mr-md-2 mr-sm-0">
            <div className="col-12 text-center">
              <h4 className="font-weight-bold"> Pembayaran Piutang</h4>
              <span>Bulan ini</span>
            </div>
            <div className="col-12 text-center mt-3">
              <h5>{rupiah(parseInt(pembayaranhutang.thisMonth, 10))}</h5>
             
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-3">
          <div className="row bg-light-success px-6 py-8 rounded-xl mb-4 ml-md-2 ml-sm-0 mr-md-2 mr-sm-0">
            <div className="col-12 text-center">
              <h4 className="font-weight-bold"> Piutang Jatuh Tempo</h4>
              <span>Bulan ini</span>
            </div>
            <div className="col-12 text-center mt-3">
            <h5>{rupiah(parseInt(piutangjt.thisMonth, 10))}</h5>
             
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-3">
          <div className="row bg-light-warning px-6 py-8 rounded-xl mb-4 ml-md-2 ml-sm-0 mr-md-2 mr-sm-0">
            <div className="col-12 text-center">
              <h4 className="font-weight-bold"> Outstanding Rentensi Bank</h4>
              <span>Bulan ini</span>
            </div>
            <div className="col-12 text-center mt-3">
            <h5>{rupiah(parseInt(outstandingretensi.thisMonth, 10))}</h5>
           
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-3">
          <div className="row bg-light-danger px-6 py-8 rounded-xl mb-4 ml-md-2 ml-sm-0 mr-md-2 mr-sm-0">
            <div className="col-12 text-center">
              <h4 className="font-weight-bold"> KPR & Retensi Cair</h4>
              <span>Bulan ini</span>
            </div> 
            <div className="col-12 text-center mt-3">
            <h5>{rupiah(parseInt(realisasiretensi.thisMonth, 10))}</h5>
           
            
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
