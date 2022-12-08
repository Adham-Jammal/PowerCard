import axios from "axios";
import { Modal, Result } from "antd";
import { getCookie } from "cookies-next";

const qs = require("qs");

const http = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  baseURL: "https://admin.powercard-sa.com:3000/",
  timeout: 25000,
  paramsSerializer(params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(
  function (config) {
    if (getCookie("AUTH") !== undefined) {
      config.headers.common.Authorization = `Bearer ${getCookie("AUTH")}`;
      // config.post["Access-Control-Allow-Origin"] = "*";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    Modal.error({
      title: "Error",
      okText: "OK",
      className: "error-modal",
      centered: true,
      icon: false,
      content: (
        <Result
          status="500"
          className="error-response"
          title=""
          subTitle={
            error?.response?.data?.error_message ||
            error?.response?.data?.message ||
            error?.response?.data ||
            "Sorry, something went wrong."
          }
        />
      ),
    });

    setTimeout(() => {}, 1000);

    return Promise.reject(error);
  }
);

export default http;
