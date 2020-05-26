import axios from "axios";

import { getLocalStorageItem } from "./localStorageUtils";

// Instantiate HTTP service
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_PATH}/v1`,
});

// Attach JWT to outgoing requests if present in local storage
axiosInstance.interceptors.request.use((request) => {
  request.headers["Authorization"] = `Bearer ${getLocalStorageItem("token")}`;
  return request;
});

export default axiosInstance;
