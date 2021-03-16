import React from "react";
import { Headers } from "../widgets/Keuangan/Headers";
import CollectionBulanIni from "../widgets/Keuangan/Chard/CollectionBulanIni";
import AgingPiutang from "../widgets/Keuangan/Chard/AgingPiutang";
import PenerimaanUtang from "../widgets/Keuangan/Chard/PenerimaanUtang";
import PenerimaanKPR from "../widgets/Keuangan/Chard/PenerimaanKPR";
import { useSelector } from "react-redux";
export function DashboardKeuangan({ project, year, month, company }) {
  const api_key = useSelector((state) => state.auth.api_key);
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
          </div>
          <div className="col-12">
            <div className="col-12 mt-4">
              <div className="col-12 mt-4 bg-white  ">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <CollectionBulanIni
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

              <div className="col-12 mt-4 bg-white  ">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <AgingPiutang
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

              <div className="col-12 mt-4 bg-white  ">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <PenerimaanUtang
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

              <div className="col-12 mt-4 bg-white  ">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <PenerimaanKPR
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
      </div>
    </>
  );
}
