import axios from "axios";
import type {
  BaseQueryFn,
} from "@reduxjs/toolkit/dist/query";
import type { AxiosRequestConfig, AxiosError } from "axios";

// This is just added for the purposes of this example, but it's not needed
export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      console.log("doing axios call", { url, method, data, params });
      const result = await axios({ url: baseUrl + url, method, data, params });
      console.log("axios result", result);
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      console.log(err);
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

// This way we don't depend on any way of fetching, but in the service implementations
export const extendedAxiosBaseQuery =
  (): BaseQueryFn<
    (...args: any[]) => Promise<any>,
    unknown,
    unknown
  > =>
  async (service: (...args: any[]) => Promise<any>) => {
    try {
      const result = await service();
      return { data: result };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
