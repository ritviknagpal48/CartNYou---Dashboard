import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "./Auth";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const useAxios = () => {
  const { token } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  axiosInstance.interceptors.request.use(
    (req) => {
      setIsLoading(true);
      // console.log(req.url, req.params, req.data);
      if (!req.headers["Authorization"]) {
        // let jwt = sessionStorage.getItem(process.env.REACT_APP_JWT_KEY);
        if (!!token) {
          req.headers = {
            ...req.headers,
            Authorization: `Bearer ${token}`,
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
