import axios from "axios";

const ApiManager = axios.create({
  baseURL: "http://127.0.0.1:8000/api/auth/",
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;
