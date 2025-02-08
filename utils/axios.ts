import axios, { AxiosInstance } from "axios";
import Constants from 'expo-constants';

let _api: AxiosInstance | undefined;

const getApi = () => {
  if (!_api) {
    _api = axios.create({
      baseURL: `${Constants.expoConfig.extra.apiUrl}/rest`,
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

export const apiLogin = async (email: string, password: string) => {
  return await getApi().post("/auth/login", {
    email,
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
