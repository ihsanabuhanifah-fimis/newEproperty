import axios from "axios";
import { config, headers } from "../../config";

export const authUser = (payload, header) => {
  return (dispatch) => {
    dispatch(pilih());
    return axios
      .post(`${config.api_host}/admin/v1/auth/token`, payload, header)

      .then((response) => {
        let data = response.data;
        let nama = response.data.user.name.length;
        let email = response.data.user.email.length;
        let accessToken1 = data.token.substring(0, 37);
        let accessToken2 = data.token.substring(37, 27 + nama + email);
        let accessToken3 = data.token.substring(27 + nama + email);
        localStorage.setItem("res-api", accessToken1);
        localStorage.setItem("res-host", accessToken2);
        localStorage.setItem("res-net", accessToken3);
        localStorage.setItem(
          "token",
          "KFLDDMMD90000eeDDDDDVV" + accessToken1 + data.token
        );
        localStorage.setItem("level", data.user.level);

        dispatch(login(data));
        window.location.reload()
      })
      .catch((error) => {
        dispatch(failed());
      });
  };
};

export const authMe = () => {
  return (dispatch) => {
    return axios
      .get(`${config.api_host}/admin/v1/me`, headers)

      .then((response) => {
        let data = response.data;
        let success = response.success

        dispatch(login2(data, success));
      })
      .catch((error) => {
        dispatch(gagal_auth())
      });
  };
};
export const gagal_auth = ()=> {
  return {
    type : "LOGIN",
    level : "404"
  }
}
export const login = (data, success) => {
  return {
    type: "LOGIN",
    success : success,
    auth: data,
    level: data.user.level,
    id: data.user.id,
    name: data.user.name,
    email: data.user.email,
    image: data.user.image,
    api_url: data.user.api_url,
    api_key: data.user.api_key,
    accessCompany: data.user.access[0].status,
    accessProject: data.user.access[1].status,
    accessUser: data.user.access[2].status,
    accessSales: data.user.access[3].status,
    accessAccounting: data.user.access[4].status,
    accessFinance: data.user.access[5].status,
  };
};
export const login2 = (data) => {
  return {
    type: "LOGIN",
    auth: data,
    level: data.data.level,
    id: data.data.id,
    name: data.data.name,
    email: data.data.email,
    image: data.data.image,
    api_url: data.data.api_url,
    api_key: data.data.api_key,
    accessCompany: data.data.access[0].status,
    accessProject: data.data.access[1].status,
    accessUser: data.data.access[2].status,
    accessSales: data.data.access[3].status,
    accessAccounting: data.data.access[4].status,
    accessFinance: data.data.access[5].status,
  };
};
export const pilih = () => {
  return {
    type: "PILIH",
  };
};

export const reset = () => {
  return {
    type: "RESET",
  };
};

export const failed = () => {
  return {
    type: "FAILED",
    message: "Email dan Password tidak cocok",
  };
};

export const deleteUser = () => {
  return {
    type: "REMOVE_USER",
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
// https://reqres.in/api/users?page=2
