/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const role = useSelector((state) => state.auth.level);
  let access = useSelector((state) => state.auth);
  const url = "/admin";
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li className="menu-section ">
          <h4 className="menu-text">Management</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/*begin::1 Level*/}

        {role === 1 ? (
          <React.Fragment>
            <li
              className={`menu-item ${getMenuItemActive(`/dashboard`, false)}`}
              aria-haspopup="true"
            >
              <NavLink className="menu-link" to={`${url}/dashboard`}>
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                  />
                </span>
                <span className="menu-text">Dashboard</span>
              </NavLink>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
           {access.accessCompany ? ( <li
              className={`menu-item ${getMenuItemActive(`/company`, false)}`}
              aria-haspopup="true"
            >
              <NavLink className="menu-link" to={`${url}/company`}>
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                  />
                </span>
                <span className="menu-text">Company</span>
              </NavLink>
            </li>) : ''}
            {access.accessProject ? (<li
              className={`menu-item ${getMenuItemActive(`/project`, false)}`}
              aria-haspopup="true"
            >
              <NavLink className="menu-link" to={`${url}/project`}>
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                  />
                </span>
                <span className="menu-text">Project</span>
              </NavLink>
            </li>) : ''}
           {access.accessUser ? ( <li
              className={`menu-item ${getMenuItemActive(`/user`, false)}`}
              aria-haspopup="true"
            >
              <NavLink className="menu-link" to={`${url}/user`}>
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                  />
                </span>
                <span className="menu-text">User</span>
              </NavLink>
            </li>) : ''}
          </React.Fragment>
        )}
      </ul>
    </>
  );
}
