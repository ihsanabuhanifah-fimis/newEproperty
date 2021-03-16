
export const config = {
    api_host : `http://103.133.21.132:7000/api`
}


export  const headers = {
  
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("res-api") + localStorage.getItem("res-host")+ localStorage.getItem("res-net"),
    "Content-Type": "application/json",
  },
}
  
  export const Bearer = "Bearer " + localStorage.getItem("token")

  