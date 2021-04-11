import { message } from "antd";
import axios from "axios";
import { useState } from "react";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const useAxios = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  axiosInstance.interceptors.request.use(
    (req) => {
      setIsLoading(true);
      if (!req.headers["Authorization"]) {
        let jwt = sessionStorage.getItem(process.env.REACT_APP_JWT_KEY);
        if (!!jwt) {
          req.headers = {
            ...req.headers,
            Authorization: `Bearer ${jwt}`,
          };
        }
      }
      setError(null);
      return req;
    },
    (err) => {
      setIsLoading(false);
      setError(err);
      return err;
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      setIsLoading(false);
      setError(null);
      return res;
    },
    (err) => {
      setIsLoading(false);
      setError(err);
      return err;
    }
  );

  return { axios: axiosInstance, isLoading, error };
};

export { axiosInstance };
export default useAxios;
