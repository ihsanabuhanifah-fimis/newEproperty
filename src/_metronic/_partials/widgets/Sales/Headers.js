import React from "react";
import Axios from "axios";
export function Headers({ company,project, year, month, headers, api_url }) {
  const [reservasi, setReservasi] = React.useState([]);
  const [suratPesanan, setSuratPesanan] = React.useState([]);
  const [statusUnit, setStatusUnit] = React.useState([]);
  const [statusBatal, setStatusBatal] = React.useState([]);
  const getReservasi = async () => {
    const url = `${api_url}/api/sales/v1/reservasi?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await Axios.get(url, headers);
      let data = response.data.data;
      setReservasi(data);
    } catch (err) {}
  };
  const getSuratPesanan = async () => {
    const url = `${api_url}/api/sales/v1/suratpesanan?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await Axios.get(url, headers);
      let data = response.data.data;
      setSuratPesanan(data);
    } catch (err) {}
  };
  React.useMemo(() => {
    getReservasi();
    getSuratPesanan();
  }, [project, year, month]);
  const getStatusUnit = async () => {
    const url = `${api_url}/api/sales/v1/statusunit?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await Axios.get(url, headers);
      let data = response.data.data;
      setStatusUnit(data);
    } catch (err) {}
  };
  React.useMemo(() => {
    getReservasi();
    getSuratPesanan();
    getStatusUnit();
  }, [project, year, month]);
  const getStatusBatal = async () => {
    const url = `${api_url}/api/sales/v1/statusbatal?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await Axios.get(url, headers);
      let data = response.data.data;
      setStatusBatal(data);
    } catch (err) {}
  };
  React.useMemo(() => {
    getReservasi();
    getSuratPesanan();
    getStatusUnit();
    getStatusBatal();
  }, [project, year, month]);
  return (
    <React.Fragment>
      <div className="row px-4">
        <div className="col-12 col-sm-12 col-md-12 col-lg-3">
          <div className="row bg-light-primary px-6 py-8 rounded-xl mb-4 ml-md-2 ml-sm-0 mr-md-2 mr-sm-0">
            <div className="col-12 text-center">
              <h4 className="font-weight-bold"> Reservasi</h4>

              <h3>{reservasi.asOf}</h3>
            </div>
            <div className="col-6 text-center">
              <h5>Bulan Ini</h5>

              <h5>{reservasi.bulanIni}</h5>
            </div>
            <div className="col-6 text-center ">
              <h5>Total Batal</h5>
              <h3>{reservasi.batal}</h3>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-3">
          <div className="row bg-light-success px-6 py-8 rounded-xl mb-4 mr-md-2 mr-sm-0">
            <div className="col-12 text-center">
              <h4 className="font-weight-bold">Surat Pesanan</h4>

              <h3>{suratPesanan.asOf}</h3>
            </div>
            <div className="col-6 text-center">
              <h5>Bulan Ini</h5>
              <h5>{suratPesanan.bulanIni}</h5>
            </div>
            <div className="col-6 text-center ">
              <h5>Bulan Lalu</h5>
              <h5>{suratPesanan.bulanLalu}</h5>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-3">
          <div className="row bg-light-warning px-6 py-8 rounded-xl mb-4 mr-md-2 mr-sm-0">
            <div className="col-12 text-center">
              <h4 className="font-weight-bold"> Stok</h4>

              <h3>{statusUnit.statusAll}</h3>
            </div>
            <div className="col-4 text-center">
              <h6>Available</h6>
              <h5>{statusUnit.statusA}</h5>
            </div>
            <div className="col-4 text-center ">
              <h6>Sold</h6>
              <h5>{statusUnit.statusB}</h5>
            </div>
            <div className="col-4 text-center ">
              <h6>Hold</h6>
              <h5>{statusUnit.statusH}</h5>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-3">
          <div className="row bg-light-danger px-6 py-8 rounded-xl mb-4 mr-md-2 mr-sm-0">
            <div className="col-12 text-center">
              <h4 className="font-weight-bold"> Batal</h4>

              <h3>{statusBatal.asOf}</h3>
            </div>
            <div className="col-6 text-center">
              <h5>Bulan Ini</h5>
              <h5>{statusBatal.bulanIni}</h5>
            </div>
            <div className="col-6 text-center ">
              <h5>Bulan Lalu</h5>
              <h5>{statusBatal.bulanLalu}</h5>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
