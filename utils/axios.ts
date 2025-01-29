import axios, { AxiosInstance } from "axios";

let _api: AxiosInstance | undefined;

const getApi = () => {
  if (!_api) {
    _api = axios.create({
      baseURL: "http://localhost:3000",
    });

    _api.interceptors.response.use(
      (response) => response,
      (error) => {
        // @TODO maybe some kind of toast
        console.error(error);
        return Promise.reject(error);
      }
    );
  }
  return _api;
};

export const apiLogin = async (username: string, password: string) => {
  return await getApi().post("/auth/login", {
    username,
    password,
  });
};

export const apiVerifyTicket = async (ticket: any, token: string) => {
  return await getApi().post("/verifyTicket", ticket, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getApi;
