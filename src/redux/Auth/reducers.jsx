const initialStateAuth = {
  auth: [],
  level: "",
  success : "",
  status: true,
  loading: false,
  message: "",
  id: "",
  name: "",
  email: "",
  image: "",
  api_url: "",
  api_key: "",
  accessCompany: false,
  accessProject: false,
  accessUser: false,
  accessSales: false,
  accessAccounting: false,
  accessFinance: false,
  api_url: "",
  api_key: "",
};

const auth = (state = initialStateAuth, action) => {
  switch (action.type) {
    case "PILIH":
      return {
        ...state,

        loading: true,
      };
    case "FAILED":
      return {
        loading: false,
        message: "Email dan Password tidak cocok",
      };
    case "RESET":
      return {
        ...state,

        message: "",
      };
    case "LOGIN":
      return {
        ...state,
        auth: action.auth,
        success : action.success,
        level: action.level,
        id: action.id,
        name: action.name,
        email: action.email,
        image: action.image,
        api_url: action.api_url,
        api_key: action.api_key,
        // level : 1,
        status: true,
        loading: false,
        accessCompany: action.accessCompany,
        accessProject: action.accessProject,
        accessUser: action.accessUser,
        accessSales: action.accessSales,
        accessAccounting: action.accessAccounting,
        accessFinance: action.accessFinance,
      };
    case "LOGOUT":
      return {
        auth: [],
      };

    default:
      return {
        ...state,
      };
  }
};

export default auth;
