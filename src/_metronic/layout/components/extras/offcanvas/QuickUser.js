/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */

import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_helpers";
import { Spinner, Alert } from "./property";
import { config } from "../../../../../config";
import { useSelector } from "react-redux";
import { Base64 } from "js-base64";
import axios from "axios";
export function QuickUser() {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [alert, setAlert] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [update, setUpdate] = React.useState(false);
  let [avatar, setAvatar] = React.useState("");

  let name = useSelector((state) => state.auth.name);
  let email = useSelector((state) => state.auth.email);
  let level = useSelector((state) => state.auth.level);
  let image = useSelector((state) => state.auth.image);

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
  const submitHandle = (e) => {
    e.preventDefault();
    setLoading(true);
    put();
  };

  // React.useMemo(() => {
  //   setTimeout(() => {
  //     setMessage("");
  //   }, 4000);
  // }, [message]);

  const put = async () => {
    const url = `${config.api_host}/admin/v1/me/password`;
    const payload = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmNewPassword,
    };

    try {
      let response = await axios.patch(url, payload, headers);
      setMessage(response.data.message);
      setLoading(false);
      setAlert("alert-success");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch {
      setLoading(false);
      setMessage("error");
      setAlert("alert-danger");
    }
  };
  // const patchImage = () => {

  // }
  const avatarchangeHandle = (event) => {
    setAvatar(event.target.files[0]);
   
  };

  const submitAvatar = (e) => {
    e.preventDefault();
    const url = `${config.api_host}/admin/v1/me/photo`;
    const encyrpt = Base64.encode(avatar.name);
    const payload = {
      image: encyrpt,
    };
 
    axios.patch(url, payload).then((res) => {

    });
  };
  const logout = ()=> {
    localStorage.clear();

    window.location.href = '/';
  }
  return (
    <div
      id="kt_quick_user"
      className="offcanvas offcanvas-right offcanvas p-10"
    >
      <form onSubmit={submitAvatar} encType="multipart/form-data">
        {/* <div className="form-group">
          <b>File Gambar</b>
          <br />
          <input
            onChange
            type="file"
            name="file"
            onChange={avatarchangeHandle}
          />
        </div>
        <input type="submit" value="Upload" className="btn btn-primary"></input> */}
      </form>
      <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
        <h3 className="font-weight-bold m-0">
          User Profile
          {/* <small className="text-muted font-size-sm ml-2">12 messages</small> */}
        </h3>
        <a
          href="#"
          className="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close"
        >
          <i className="ki ki-close icon-xs text-muted" />
        </a>
      </div>

      <div className="offcanvas-content pr-5 mr-n5">
        <div className="d-flex align-items-center mt-5">
          <div className="symbol symbol-100 mr-5">
            <div
              className="symbol-label"
              style={{
                backgroundImage: { image },
              }}
            />
            <i className="symbol-badge bg-success" />
          </div>
          <div className="d-flex flex-column">
            <a
              href="#"
              className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
            >
              {name}
            </a>
            <div className="text-muted mt-1">
              {level === 0 ? "Admin" : "User"}
            </div>
            <div className="navi mt-2">
              <a href="#" className="navi-item">
                <span className="navi-link p-0 pb-2">
                  <span className="navi-icon mr-1">
                    <span className="svg-icon-lg svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Mail-notification.svg"
                        )}
                      ></SVG>
                    </span>
                  </span>
                  <span className="navi-text text-muted text-hover-primary">
                    {email}
                  </span>
                </span>
              </a>
            </div>
            {/* <Link to="/logout" className="btn btn-light-primary btn-bold">
                Sign Out
              </Link> */}
            <button
              className="btn btn-light-primary btn-bold"
              onClick={logout}
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="  separator separator-dashed mt-8 mb-5" />
        <button
          className=" form-control btn btn-light-primary btn-bold"
          onClick={() => {
            setUpdate(!update);
          }}
        >
          {update ? " Batal Update Password" : "Update Password"}
        </button>

        <div>
          {update ? (
            <div className="card-header border-0 py-5">
              {message !== "" ? <Alert alert={alert} pesan={message} /> : ""}
              {newPassword !== confirmNewPassword &&
              newPassword !== "" &&
              confirmNewPassword !== "" ? (
                <Alert
                  alert="alert-danger"
                  pesan={"New Password dan Konfimasi Password tidak sama"}
                />
              ) : (
                ""
              )}
              {currentPassword === newPassword &&
              currentPassword !== "" &&
              newPassword !== "" ? (
                <Alert
                  alert="alert-danger"
                  pesan={"Password Lama dan Password baru tidak boleh sama"}
                />
              ) : (
                ""
              )}
              <form onSubmit={submitHandle}>
                <label>
                  <span className="mt-3 font-weight-bold font-size-md">
                    Password Lama
                  </span>
                </label>

                <input
                  placeholder="New Password ..."
                  className="form-control mb-3 "
                  name="newPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                />
                <label>
                  <span className="mt-3 font-weight-bold font-size-md">
                    Password Baru
                  </span>
                </label>

                <input
                  placeholder="New Password ..."
                  className="form-control mb-3 "
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
                <label>
                  <span className="mt-3 font-weight-bold font-size-md">
                    Konfirmasi Password Baru
                  </span>
                </label>
                <input
                  placeholder="Konfirmasi Password ..."
                  className="form-control mb-3 "
                  name="confirmNewPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                  }}
                />

                <div className="card-toolbar mt-2">
                  <button
                    disabled={
                      newPassword !== confirmNewPassword ||
                      newPassword === "" ||
                      currentPassword === "" ||
                      confirmNewPassword === "" ||
                      currentPassword === newPassword 
                    }
                    className="btn btn-success font-weight-bolder font-size-sm"
                  >
                    <span className="svg-icon svg-icon-md svg-icon-white"></span>
                    {loading ? <Spinner /> : "Update"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
