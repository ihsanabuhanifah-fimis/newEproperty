import React from "react";
import { Headers } from "../widgets/Sales/Headers";
import { Topsales } from "../widgets/Sales/TopSales";
import PenjualanUnit from "../widgets/Sales/Chard1/PenjualanUnit";
import PenjualanIDR from "../widgets/Sales/Chard1/PenjualanIDR";
import CaraBayar from "../widgets/Sales/Chard1/CaraBayar";
import AlasanBatal from "../widgets/Sales/Chard1/AlasanBatal";
import SuratPesanan from "../widgets/Sales/Chard1/SuratPesanan";
import { StockUnit } from "../widgets/Sales/Chard1/StockUnit";
import { PenjualanBulanIni } from "../widgets/Sales/Chard1/PenjualanBulanIni";
import { KPR } from "../widgets/Sales/Chard1/KPR";
import { StatusLegal } from "../widgets/Sales/Chard1/StatusLegal";
import { useSelector } from "react-redux";
export function DashboardSales({ project, year, month, company }) {
  const api_key = useSelector((state) => state.auth.api_key);
  const api_keys = useSelector((state) => state.auth.api_url)
  const headers = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("res-api") + localStorage.getItem("res-host")+ localStorage.getItem("res-net"),
      ApiKey: api_key,
      "Content-Type": "application/json",
    },
  };

  const api_url = `http://103.133.21.132:7000`;
//  const api_url = `${api_keys}/`;
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="col-12 mt-4 overflow-auto">
            <Headers
             company={company}
              project={project}
              year={year}
              month={month}
              headers={headers}
              api_url={api_url}
            />

            <div className="col-12 mt-4 bg-secondary shadow-lg p-3 mb-5 bg-white rounded  ">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <Topsales
                   company={company}
                    project={project}
                    year={year}
                    month={month}
                    headers={headers}
                    api_url={api_url}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 mt-4 bg-secondary shadow-lg p-3 mb-5 bg-white rounded  ">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <PenjualanUnit
                   company={company}
                    project={project}
                    year={year}
                    month={month}
                    headers={headers}
                    api_url={api_url}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 mt-4 bg-secondary shadow-lg p-3 mb-5 bg-white rounded  ">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <PenjualanIDR
                   company={company}
                    project={project}
                    year={year}
                    month={month}
                    headers={headers}
                    api_url={api_url}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 mt-4 bg-secondary shadow-lg mb-5 bg-white rounded ">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 overflow-auto">
                  <PenjualanBulanIni
                   company={company}
                    project={project}
                    year={year}
                    month={month}
                    headers={headers}
                    api_url={api_url}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                  <CaraBayar
                   company={company}
                    project={project}
                    year={year}
                    month={month}
                    headers={headers}
                    api_url={api_url}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 mt-4 bg-secondary shadow-lg p-3 mb-5 bg-white rounded   ">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                  <AlasanBatal
                   company={company}
                    project={project}
                    year={year}
                    month={month}
                    headers={headers}
                    api_url={api_url}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                  <SuratPesanan
                   company={company}
                    project={project}
                    year={year}
                    month={month}
                    headers={headers}
                    api_url={api_url}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 mt-4 bg-secondary shadow-lg p-3 mb-5 bg-white rounded  ">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <StockUnit
                   company={company}
                    project={project}
                    year={year}
                    month={month}
                    headers={headers}
                    api_url={api_url}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 mt-4 bg-secondary shadow-lg p-3 mb-5 bg-white rounded  ">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                  <KPR
                   company={company}
                    project={project}
                    year={year}
                    month={month}
                    headers={headers}
                    api_url={api_url}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                  <StatusLegal
                   company={company}
                    project={project}
                    year={year}
                    month={month}
                    headers={headers}
                    api_url={api_url}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
