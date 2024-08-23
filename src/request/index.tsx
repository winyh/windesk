import axios from "axios";
import { notification } from "@/store/hooks";

// 生成请求实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_HTTP_URL,
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || "";
    config.headers.Authorization = "Bearer " + token;
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么

    if (error.code === "ECONNABORTED") {
      // 超时异常处理，这里可以进行超时的全局处理逻辑
      console.log("请求超时处理:", error.message);
    }

    const { response } = error;
    if (response?.status === 401) {
      notification.warning({
        message: "系统提醒",
        description: `${error.message}. 未授权，请联系管理员!`,
        maxCount: 1,
      });

      localStorage.clear();
      let loginPath = `${window.location.origin}${
        import.meta.env.BASE_URL
      }login`;
      setTimeout(() => {
        window.location.href = loginPath;
      }, 1000);
    } else {
      notification.warning({
        message: "系统提醒",
        description: `${error.message}. 系统错误，请联系管理员!`,
        maxCount: 1,
      });
    }
    return Promise.reject(error);
  }
);

const srvGet = (url, params) => {
  return instance({
    url: url,
    method: "get",
    params,
  });
};

const srvPost = (url, data) => {
  return instance({
    url: url,
    method: "post",
    data,
  });
};

const comGet = (url, params) => {
  return instance.get(url, {
    params,
  });
};

const comPost = (url, data) => {
  return instance.post(url, data);
};

const comDel = (url, params) => {
  return instance.delete(url, { params });
};

const comPut = (url, data) => {
  return instance.put(url, data);
};

const comGetFile = (url, data) => {
  return instance.get(url, data);
};

export { srvGet, srvPost, comGet, comPost, comDel, comPut, comGetFile };
