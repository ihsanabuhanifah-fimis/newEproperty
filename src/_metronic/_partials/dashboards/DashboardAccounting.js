import React from "react";

import Likuiditas from "../widgets/Accounting/Chard/Likuiditas";
import { Hutang } from "../widgets/Accounting/Chard/Hutang";
import { PembayaranHutang } from "../widgets/Accounting/Chard/PembayaranHutang";
import { Laba } from "../widgets/Accounting/Chard/laba";
import { CashFlow } from "../widgets/Accounting/Chard/CashFlow";
import { useSelector } from "react-redux";

export function DashboardAccounting({ project, year, month , company}) {

  const api_key = useSelector((state) => state.auth.api_key)
  const headers = {
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer " +
        localStorage.getItem("res-api") +
        localStorage.getItem("res-host") +
        localStorage.getItem("res-net"),
      ApiKey: api_key,
      "Content-Type": "application/json",
    },
  };
  const api_url = `http://103.133.21.132:7000`;
  // const api_url = `${api_keys}/`;
 
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="col-12 mt-4">
            <Likuiditas
             company={company}
              project={project}
              year={year}
              month={month}
              headers={headers}
              api_url={api_url}
            />
          </div>
          <div className="col-12 mt-4">
            <div className="col-12 mt-4 bg-white  ">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 shadow-sm mb-5 bg-white rounded">
                  <Laba
                   company={company}
                    project={project}
                    year={year}
                    month={month}
                    headers={headers}
                    api_url={api_url}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 shadow-sm mb-5 bg-white rounded ">
                  <CashFlow
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
          <div className="col-12 mt-4">
            <div className="col-12 mt-4 bg-white  ">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 shadow-sm mb-5 bg-white rounded">
                  <PembayaranHutang
                   company={company}
                    project={project}
                    year={year}
                    month={month}
                    headers={headers}
                    api_url={api_url}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 shadow-sm mb-5 bg-white rounded ">
                  <Hutang
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
