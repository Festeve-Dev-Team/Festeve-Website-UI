import axios from "axios";
import { getToken } from "./get-token";

const http = axios.create({
  baseURL: "https://s2kgcih5db.execute-api.ap-south-1.amazonaws.com/dev",
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers.Authorization = `Bearer ${token ? token : ""}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
