/** @format */
import FormData from "form-data";
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const ProductContext = createContext(null);

export const ProdCtx = () => {
  return useContext(ProductContext);
};

const BASE_URL_SERVER = "https://tndev3.tn-devfactory.com/api";

// console.log("process.env.BASE_URL");
// console.log(process.env.BASE_URL);
// console.log(process.env.DOMAIN);
const DOMAIN = process.env.DOMAIN;

console.log("DOMAIN for assets");
console.log(DOMAIN);

const api = axios.create({
  //baseURL: BASE_URL_SERVER,
  baseURL: process.env.BASE_URL,
});

api.interceptors.request.use(function (config) {
  config.headers = { "X-Requested-With": "XMLHttpRequest" };

  const token = Cookies.get("sp_token") ? Cookies.get("sp_token") : null;
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

// identification to checkers controller
export const apiLogin = async (values) => {
  const { data } = await api.post("/login", values);
  return data;
};
export const apiRegister = async (values) => {
  const { data } = await api.post("/register", values);
  return data;
};
export const apiLogout = async () => {
  const { data } = await api.get("/logout");
  return data;
};

const authMethods = { apiLogin, apiLogout, apiRegister };

// profil
export const apiProfileShowAll = async () => {
  const { data } = await api.get(`/profiles/`);
  return data;
};
export const apiProfileStore = async (fd, cfg) => {
  const { data } = await api.post(`/profiles/`, fd, cfg);
  return data;
};
export const apiProfileShowOne = async (id) => {
  const { data } = await api.get(`/profiles/${id}`);
  return data;
};

//-------------------------------------------------------
// used with mutation only
export const apiProfileUpdateMutation = async ( id, values) => {
  const { data } = await api.put(`/profilesput/${id}`, values,);
  return data;
};
//-------------------------------------------------------------

//-------------------------------------------------------
//used only with axios in different components --> voir editer profil employee
export const apiProfileUpdate = async (id, fd, cfg) => {
  const { data } = await api.post(`/profiles/${id}`, fd, cfg);
  return data;
};
//-------------------------------------------------------------

export const apiProfileDelete = async (id) => {
  const { data } = await api.delete(`/profiles/${id}`);
  return data;
};

const profilMethods = {
  apiProfileUpdateMutation,
  apiProfileShowAll,
  apiProfileStore,
  apiProfileShowOne,
  apiProfileUpdate,
  apiProfileDelete,
};

// generate pdf from db
export const apiPdf = async () => {
  const { data } = await api.get("/pdf", { responseType: "blob" });
  return data;
};

// download pdf from server public storage
export const downloadPdf = async (year, month, id) => {
  const { data } = await api.get(`/downloadFile/${year}/${month}/${id}`, {
    responseType: "blob",
  });
  return data;
};
const pdfMethods = { apiPdf, downloadPdf };

//sendMail
export const apiSendMail = async (fd, cfg) => {
  const { data } = await api.post(`/simple-mail-api`, fd, cfg);
  return data;
};
export const apiSendBulkPdf = async (fd, cfg) => {
  const { data } = await api.post(`/simple-mail-api`, fd, cfg);
  return data;
};
export const apiMassSender = async (yearM, monthM) => {
  const { data } = await api.get(`/mail-pdf/${yearM}/${monthM}`);
  return data;
};

const mailMethods = { apiSendMail, apiSendBulkPdf, apiMassSender };

// Product api
export const apiProductAdd = async (values) => {
  const { data } = await api.post("/products", values);
  return data;
};

export const apiProductUpdate = async (id, values) => {
  const { data } = await api.put(`/products/${id}`, {
    params: {
      data: values,
    },

    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const apiProductDelete = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export const apiProductGet = async () => {
  const { data } = await api.get("/products");
  return data;
};
export const apiProductShow = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

const productMethods = {
  apiProductShow,
  apiProductGet,
  apiProductDelete,
  apiProductUpdate,
  apiProductAdd,
};

export const ProductProvider = ({ children }) => {
  //hotssr from page getserversideprops initial data

  const [initialDataHotssr1, setInitialDataHotssr1] = useState();

  const [connectedRole, setConnectedRole] = useState("");
  const [connectedId, setConnectedId] = useState("");

  const [switchMode, setSwitchMode] = useState(false);

  const [notification, setNotification] = useState({
    notifType: "",
    notifMsg: "",
  });

  const [loader, setLoader] = useState(false);

  const uiVars = {
    // initial// from database config user
    dark: Cookies.get("dark") || "#001d3d",
    light: Cookies.get("light") || "#001d3d",

    source: "Source Sans Pro",
    roboto: "Roboto",
    lato: "Lato",
    open: "Open Sans",
    oswald: "Oswald",
  };

  // console.log('Cookies.get("dark")');
  // console.log(Cookies.get("dark"));
  React.useEffect(() => {
    setUi({
      ...ui,
      dark: Cookies.get("dark") || "#7b2cbf",
      light: Cookies.get("light") || "#001d3d",
    });
  }, []);

  React.useEffect(() => {
    setConnectedRole(Cookies.get("sp_role"));
    setConnectedId(Cookies.get("sp_id"));
  }, []);

  const [ui, setUi] = useState({
    dark: "#001d3d",
    light: "#001d3d",

    navFont: uiVars.oswald,
    contentFont: uiVars.roboto,
    buttonFont: uiVars.oswald,
    footerFont: uiVars.lato,
  });

  const methods = {
    authMethods,
    profilMethods,
    pdfMethods,
    mailMethods,
    productMethods,
  };

  const states = {
    initialDataHotssr1,
    setInitialDataHotssr1,
    loader,
    setLoader,
    notification,
    setNotification,
    switchMode,
    setSwitchMode,
    ui,
    setUi,
    DOMAIN,
    connectedRole,
    setConnectedRole,
    connectedId,
    setConnectedId,
  };

  return (
    <ProductContext.Provider value={[methods, states]}>
      {children}
    </ProductContext.Provider>
  );
};
