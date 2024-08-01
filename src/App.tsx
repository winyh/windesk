import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import useStore from "@/store/index";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import { theme as config } from "antd";
import themeToken from "@/config/theme";
import router from "@/routes/index";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(themeToken);
  const themeMode = useStore((state) => state.themeMode);

  useEffect(() => {
    const { defaultAlgorithm, darkAlgorithm } = config;
    let algorithm = themeMode === "dark" ? darkAlgorithm : defaultAlgorithm;
    setTheme({
      ...themeToken,
      algorithm,
    });
  }, [themeMode]);

  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  );
}

export default App;
