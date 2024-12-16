import { comPost, comGet } from "@/request";

const apiUrls = {
  register: "/user/register",
  login: "/user/login",
  logout: "/user/logout",
  userInfo: "/user/info",
};

const registerSrv = (data) => {
  return comPost(apiUrls.register, data);
};

const loginSrv = (data) => {
  return comPost(apiUrls.login, data);
};

const logoutSrv = (params) => {
  return comGet(apiUrls.logout, params);
};

const getUserInfoSrv = (params) => {
  return comGet(apiUrls.userInfo, params);
};

export { registerSrv, loginSrv, logoutSrv, getUserInfoSrv };
