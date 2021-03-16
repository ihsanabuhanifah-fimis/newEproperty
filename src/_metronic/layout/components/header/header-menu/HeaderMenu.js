/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { checkIsActive } from "../../../../_helpers";

export function HeaderMenu({ layoutProps }) {
  const role = useSelector((state) => state.auth.level);
  let access = useSelector((state) => state.auth);
  const location = useLocation();
  const url = "/admin";
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };

  return (
    <div
      id="kt_header_menu"
      className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      {/*begin::Header Nav*/}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}

        {role === 1 ? (
          <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
              "/dashboard"
            )}`}
          >
            <NavLink className="menu-link" to={`${url}/dashboard`}>
              <span className="menu-text">Dashboard</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>
        ) : (
          <React.Fragment>
           {access.accessCompany ? ( <li
              className={`menu-item menu-item-rel ${getMenuItemActive(
                "/company"
              )}`}
            >
              <NavLink className="menu-link" to={`${url}/company`}>
                <span className="menu-text">Company</span>
                {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
              </NavLink>
            </li>): ''}
            {access.accessProject ? (<li
              className={`menu-item menu-item-rel ${getMenuItemActive(
                "/project"
              )}`}
            >
              <NavLink className="menu-link" to={`${url}/project`}>
                <span className="menu-text">Project</span>
                {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
              </NavLink>
            </li>) : ""}
            {access.accessUser ? (<li
              className={`menu-item menu-item-rel ${getMenuItemActive(
                "/user"
              )}`}
            >
              <NavLink className="menu-link" to={`${url}/user`}>
                <span className="menu-text">User</span>
                {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
              </NavLink>
            </li>) : ""}
          </React.Fragment>
        )}
      </ul>
    </div>
  );
}
