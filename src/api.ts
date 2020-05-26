import API from "./support/axios";

export const login = (credentials: Credentials) => {
  return API.post("users/login", credentials);
};

export const getProfile = () => {
  return API.get("users/profile");
};

export const getEmails = () => {
  return API.get("emails");
};

export const sendEmail = (email: NewEmail) => {
  return API.post("emails", email);
};
