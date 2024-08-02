import { theme as config } from "antd";
const themeMode = localStorage.getItem("themeMode");
let { darkAlgorithm, defaultAlgorithm } = config;
let algorithm = themeMode === "dark" ? darkAlgorithm : defaultAlgorithm;

let theme = {
  token: {
    borderRadius: 2,
  },
  algorithm: algorithm,
};

export default theme;
