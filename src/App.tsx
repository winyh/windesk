import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import Layout from "@/component/Layout";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import theme from "/config/theme";
import router from "@/routes/index";
import { isTauri } from "./utils/index"
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    if(isTauri()){
      console.log({window})
      setGreetMsg(await invoke("greet", { name }));
    } else {
      setGreetMsg(`${name}, 你好, 当前为web环境，无法与桌面Rust交互`)
    }
  }

  return (

    <ConfigProvider locale={zhCN} theme={theme}>
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>

    // <div className="container">
    //   <h1>Welcome to Tauri!</h1>
    //   <Button>Welcome to Antd!</Button>
    //   <div className="row">
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src="/vite.svg" className="logo vite" alt="Vite logo" />
    //     </a>
    //     <a href="https://tauri.app" target="_blank">
    //       <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
    //     </a>
    //     <a href="https://reactjs.org" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>

    //   <p>Click on the Tauri, Vite, and React logos to learn more.</p>

    //   <form
    //     className="row"
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       greet();
    //     }}
    //   >
    //     <input
    //       id="greet-input"
    //       onChange={(e) => setName(e.currentTarget.value)}
    //       placeholder="Enter a name..."
    //     />
    //     <button type="submit">Greet</button>
    //   </form>

    //   <p>{greetMsg}</p>
    // </div>
  );
}

export default App;
