import { theme as config } from "antd";
import { Storage } from "@/utils/storage";
const themeMode = Storage.getItem("themeMode");
let { darkAlgorithm, defaultAlgorithm } = config;
let algorithm = themeMode === "dark" ? darkAlgorithm : defaultAlgorithm;

let theme = {
  token: {
    borderRadius: 2,
  },
  algorithm: algorithm,
};

export default theme;
