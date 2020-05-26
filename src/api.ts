import { AxiosResponse } from "axios";
import API from "./support/axios";

export const login = (credentials: Credentials): Promise<AxiosResponse<any>> => {
  return API.post("users/login", credentials);
};

export const getProfile = (): Promise<AxiosResponse<any>> => {
  return API.get("users/profile");
};

export const getEmails = (): Promise<AxiosResponse<any>> => {
  return API.get("emails");
};

export const sendEmail = (email: NewEmail): Promise<AxiosResponse<any>> => {
  return API.post("emails", email);
};
