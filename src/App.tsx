import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import {
  ConfigProvider,
  App as AntApp,
  theme as config,
  Watermark,
} from "antd";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";

import useStore from "@/store/index";
import AntdHooks from "@/store/hooks";

import themeToken from "@/config/theme";
import router from "@/route/index";
import "./App.css";
import customConfig from "@/config/config.json";

function App() {
  const [theme, setTheme] = useState(themeToken);
  const [watermark, setWatermark] = useState({});
  const themeMode = useStore((state) => state.themeMode);

  useEffect(() => {
    const { defaultAlgorithm, darkAlgorithm } = config;
    let algorithm = themeMode === "dark" ? darkAlgorithm : defaultAlgorithm;
    setTheme({
      ...themeToken,
      algorithm,
    });
  }, [themeMode]);

  useEffect(() => {
    setWatermark(customConfig.watermark);
  }, [customConfig]);

  const { content, height, width, image } = watermark;

  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <Watermark content={content} height={height} width={width} image={image}>
        <AntApp notification={{ maxCount: 1 }}>
          <AntdHooks />
          <RouterProvider router={router}></RouterProvider>
        </AntApp>
      </Watermark>
    </ConfigProvider>
  );
}

export default App;
