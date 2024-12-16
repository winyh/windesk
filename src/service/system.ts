import { comPost, comGet } from "@/request";

const apiUrls = {
  register: "/system/register",
  login: "/system/login",
  logout: "/system/logout",
  systemInfo: "/system/info",
};

const postSystemInfoSrv = (data) => {
  return comPost(apiUrls.systemInfo, data);
};

const getSystemInfoSrv = (params) => {
  return comGet(apiUrls.systemInfo, params);
};

export { postSystemInfoSrv, getSystemInfoSrv };
