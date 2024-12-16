import { comPost, comGet } from "@/request";

const apiUrls = {
  oss: "/backend/file/oss",
  ossList: "/backend/file/list",
  logout: "/user/logout",
  userInfo: "/user/info",
};

const uploadSrv = (data) => {
  return comPost(apiUrls.oss, data);
};

const getFilesSrv = (params) => {
  return comGet(apiUrls.ossList, params);
};

export { uploadSrv, getFilesSrv };
