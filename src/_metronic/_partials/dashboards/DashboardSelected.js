import React from "react";
import axios from "axios";
import { config } from "../../../config";
import swal from "sweetalert";

export function DashboardSelected({
  setProjectHandle,
  setYearHandle,
  setMonthHandle,
  setCompanyHandle,
}) {
  const [projects, setProjects] = React.useState([]);
  const [company_name, setCompany_name] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");
  const [project, setProject] = React.useState("");
  const [company_id, setCompany_id] = React.useState();
  const [company, setCompany] = React.useState([]);
  const headers = {
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer " +
        localStorage.getItem("res-api") +
        localStorage.getItem("res-host") +
        localStorage.getItem("res-net"),
      "Content-Type": "application/json",
    },
  };

  const get = async () => {
    const url = `${config.api_host}/admin/v1/companies/active`;
 
    try {
      let response = await axios.get(url, headers);
      setCompany(response.data.data);
    } catch {}
  };
  const getProject = async () => {
    const url = `${config.api_host}/admin/v1/companies/${company_id}/childs`;
    try {
      let response = await axios.get(url, headers);
      setProjects(response.data.data);
    } catch {}
  };
  React.useEffect(() => {
    get();
  }, []);

  React.useMemo(() => {
    getProject();
  }, [company_id]);
  const bulans = [
    { nomor_bulan: 1, nama_bulan: "Januari" },
    { nomor_bulan: 2, nama_bulan: "Februari" },
    { nomor_bulan: 3, nama_bulan: "Maret" },
    { nomor_bulan: 4, nama_bulan: "april" },
    { nomor_bulan: 5, nama_bulan: "Mei" },
    { nomor_bulan: 6, nama_bulan: "Juni" },
    { nomor_bulan: 7, nama_bulan: "Juli" },
    { nomor_bulan: 8, nama_bulan: "Agustus" },
    { nomor_bulan: 9, nama_bulan: "September" },
    { nomor_bulan: 10, nama_bulan: "Oktober" },
    { nomor_bulan: 11, nama_bulan: "November" },
    { nomor_bulan: 12, nama_bulan: "Desember" },
  ];

  const SelectBulan = (e) => {
    setMonth(e.target.value);
  };
  const SelectTahun = (e) => {
    setYear(e.target.value);
  };
  const SelectCompany = (e) => {
    setCompany_id(e.target.value);
    const getCompanyName = async () => {
      const url = `${config.api_host}/admin/v1/companies/${e.target.value}`;
      try {
        let response = await axios.get(url, headers);
        setCompany_name(response.data.data.name);
      } catch {}
    };

    getCompanyName();
  };
  const SelectProject = (e) => {
    setProject(e.target.value);
  };
  const pilihHandle = () => {
    if (company_name === "" || project === "" || month === "" || year === "") {
      swal("",company_name === ""
      ? "Perusahaan harus dipilih terlebih dahulu"
      : project === ""
      ? "Project harus dipilih terlebih dahulu"
      : month === ""
      ? "Bulan harus dipilih terlebih dahulu"
      : year === ""
      ? "Tahun harus dipilih terlebih dahulu"
      : "", "warning");
    
    } else {
      setYearHandle(year);
      setMonthHandle(month);
      setProjectHandle(project);
      setCompanyHandle(company_name);
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-3 col-lg-3 ">
          <label className="font-weight-bold">Nama Perusahaan</label>
          <select
            onChange={SelectCompany}
            className="form-control"
            aria-label="Default select example"
          >
            <option value="">--Pilih Perusahaan --</option>
            {company.map((company, index) => (
              <option key={index} id={company.name} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-sm-12 col-md-3 col-lg-3 ">
          <label className="font-weight-bold">Nama Project</label>
          <select
            onChange={SelectProject}
            className="form-control"
            aria-label="Default select example"
          >
            <option value="">--Pilih Project --</option>
            {projects.map((pro, index) => (
              <option key={index} value={pro.name}>
                {pro.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-sm-12 col-md-3 col-lg-2 ">
          <label className="font-weight-bold">Bulan</label>
          <select
            onChange={SelectBulan}
            className="form-control"
            aria-label="Default select example"
          >
            <option value="">--Pilih Bulan --</option>
            {bulans.map((bulan, index) => (
              <option key={index} value={bulan.nomor_bulan}>
                {bulan.nama_bulan}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-sm-12 col-md-3 col-lg-2 ">
          <label className="font-weight-bold">Tahun</label>
          <select
            onChange={SelectTahun}
            className="form-control"
            aria-label="Default select example"
          >
            <option value="">--Pilih Tahun --</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </select>
        </div>
        <div className="col-12 col-sm-12 col-md-3 col-lg-2 mt-lg-5">
          <button
            className="form-control btn-success mt-2"
            onClick={pilihHandle}
          >
            Cari
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
