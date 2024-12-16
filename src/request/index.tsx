import axios from "axios";
import { Storage } from "@/utils/storage";
import { notification, navigate } from "@/store/hooks";

const { BASE_URL, VITE_HTTP_URL } = import.meta.env;

const apiPrefix = {
  api: "/api",
  admin: "/admin",
  platform: "/platform",
  project: "/project",
  escape: "/escape",
};

// 生成请求实例
const instance = axios.create({
  baseURL: VITE_HTTP_URL,
  timeout: 6000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = Storage.getItem("token") || "";
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

    const { pathname, search } = window.location;
    const { response } = error;
    if (response?.status === 401) {
      notification.warning({
        message: "系统提醒",
        description: `${error.message}. 未授权，请联系管理员!`,
      });

      Storage.clear();
      let loginPath = `${BASE_URL}login`;

      setTimeout(() => {
        navigate(`${loginPath}?redirect=${pathname}${search}`);
      }, 500);
    } else if (response?.status === 403) {
      notification.warning({
        message: "系统提醒",
        description: `${error.message}. 无权限访问!`,
      });

      navigate(`${BASE_URL}saas/403`);
    } else {
      notification.warning({
        message: "系统提醒",
        description: `${error.message}. 系统错误，请联系管理员!`,
      });
    }
    return Promise.reject(error);
  }
);
const comGet = (url, params) => {
  return instance.get(url, {
    params,
  });
};

const comPost = (url, data) => {
  return instance.post(url, data);
};

const comDelete = (url, params) => {
  return instance.delete(url, { params });
};

const comPut = (url, data) => {
  return instance.put(url, data);
};

const comGetFile = (url, data) => {
  return instance.get(url, data);
};

const clientGetOne = (prefix, collection, recordId, params) => {
  let url = `${apiPrefix[prefix]}/${collection}/${recordId}`;
  if (prefix === "project") {
    let { uid: project } = Storage.getItem("app");
    console.log({ project });
    url = `${apiPrefix[prefix]}/${project}/${collection}/${recordId}`;
  }
  return comGet(url, params);
};

const clientGetOneByUid = (prefix, collection, recordId, params) => {
  return comGet(`${apiPrefix[prefix]}/${collection}/uid/${recordId}`, params);
};

const clientGetAll = (prefix, collection, params) => {
  return comGet(`${apiPrefix[prefix]}/${collection}`, params);
};

const clientGetTree = (prefix, collection, params) => {
  return comGet(`${apiPrefix[prefix]}/${collection}/tree/data`, params);
};

const clientGetList = (prefix, collection, params) => {
  let url = `${apiPrefix[prefix]}/${collection}/list/paginate`;
  if (prefix === "project") {
    let { uid: project } = Storage.getItem("app");
    url = `${apiPrefix[prefix]}/${project}/${collection}/list/paginate`;
  }
  return comGet(url, params);
};

const clientGetListTree = (prefix, collection, params) => {
  return comGet(
    `${apiPrefix[prefix]}/${collection}/list/tree/paginate`,
    params
  );
};

const clientPost = (prefix, collection, data) => {
  let url = `${apiPrefix[prefix]}/${collection}`;
  if (prefix === "project") {
    let { uid: project } = Storage.getItem("app");
    url = `${apiPrefix[prefix]}/${project}/${collection}`;
  }
  return comPost(url, data);
};

const clientDelete = (prefix, collection, params) => {
  return comDelete(`${apiPrefix[prefix]}/${collection}`, {
    ids: params.ids,
  });
};

const clientPut = (prefix, collection, data) => {
  return comPut(`${apiPrefix[prefix]}/${collection}`, data);
};

export {
  comGet,
  comPost,
  comDelete,
  comPut,
  comGetFile,
  clientGetOne,
  clientGetOneByUid,
  clientGetAll,
  clientGetTree,
  clientGetList,
  clientGetListTree,
  clientPost,
  clientDelete,
  clientPut,
};
