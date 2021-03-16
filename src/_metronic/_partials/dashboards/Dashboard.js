import React from "react";
import {
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import { DashboardSales } from "./DashboardSales";
import { DashboardAccounting } from "./DashboardAccounting";
import { DashboardKeuangan } from "./DashboardKeuangan";
import { DashboardSelected } from "./DashboardSelected";

export function Dashboard() {
  let match = useRouteMatch();
  let date = new Date();
  // let bulan = date.getMonth()
  // let tahun = date.getFullYear();
  const [project, setProject] = React.useState();
  const [year, setYear] = React.useState();
  const [month, setMonth] = React.useState();
  const [company, setCompany] = React.useState();

  const setProjectHandle = (pilihan) => {
    setProject(pilihan);
  };
  const  setYearHandle= (pilihan) => {
    setYear(pilihan);
  };
  const setMonthHandle = (pilihan) => {
    setMonth(pilihan);
  };
  const setCompanyHandle = (pilihan) => {
    setCompany(pilihan);
  }
  console.log('company', company)
  return (
    <React.Fragment>
      <div className="card-header border-0 pt-5 ">
        <DashboardSelected setCompanyHandle={setCompanyHandle} setProjectHandle={setProjectHandle} setYearHandle={setYearHandle} setMonthHandle={setMonthHandle} />
      </div>
      <div className={` card card-custom `}>
        {/* Head */}

        <div className="card-header border-0 pt-5">
          <div className="card-toolbar">
            <Tab.Container>
              <Nav as="ul" className="nav nav-pills nav-pills-sm nav-dark-75">
                <Nav.Item
                  style={{ minWidth: "100px" }}
                  className="nav-item "
                  as="li"
                >
                  <NavLink
                    to={`${match.url}/sales`}
                    activeStyle={{
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    Sales
                  </NavLink>
                </Nav.Item>
                <Nav.Item
                  className="nav-item"
                  style={{ minWidth: "100px" }}
                  as="li"
                >
                  <NavLink
                    to={`${match.url}/keuangan`}
                    activeStyle={{
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    Keuangan
                  </NavLink>
                </Nav.Item>
                <Nav.Item
                  className="nav-item "
                  style={{ minWidth: "100px" }}
                  as="li"
                >
                  <NavLink
                    to={`${match.url}/accounting`}
                    activeStyle={{
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    Accounting
                  </NavLink>
                </Nav.Item>
              </Nav>
            </Tab.Container>
          </div>
        </div>
        {/* Body */}
        <div>
          <Switch>
            <Route path="/user/dashboard/sales">
              <DashboardSales company={company} project={project} year={year} month={month} />
            </Route>
            <Route path="/user/dashboard/keuangan">
              <DashboardKeuangan  company={company} project={project} year={year} month={month} />
            </Route>
            <Route path="/user/dashboard/accounting">
            <DashboardAccounting  company={company} project={project} year={year} month={month} />
            </Route>
            <Redirect to="/user/dashboard/sales" />
          </Switch>
        </div>
      </div>

      {/* {layoutProps.demo === 'demo1' && <Demo1Dashboard />}
        {layoutProps.demo === 'demo2' && <Demo2Dashboard />}
        {layoutProps.demo === 'demo3' && <Demo3Dashboard />}
        {layoutProps.demo === 'demo4' && <Demo4Dashboard />}
        {layoutProps.demo === 'demo5' && <Demo5Dashboard />}
        {layoutProps.demo === 'demo6' && <Demo6Dashboard />}
        {layoutProps.demo === 'demo7' && <Demo7Dashboard />} */}
    </React.Fragment>
  );
}
