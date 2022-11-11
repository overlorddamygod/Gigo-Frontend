import axios from "axios";
import { BASE_URL } from "../constant/urls";
import { AsyncStorage } from 'react-native';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem("user:token")
    //   const token = "Token "+tokenHard

      if (token) {
        config.headers.authorization = "Bearer "+ token;
      }
      return config;

    },
   err =>  {
      console.log(err);
      return Promise.reject(err);
    }

  );