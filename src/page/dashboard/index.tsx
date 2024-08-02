import { useState } from "react";
import { Button, Input, Space } from "antd";
import { invoke } from "@tauri-apps/api/tauri";
import { isTauri } from "@/utils/index";

const Dashboard = () => {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    if (isTauri()) {
      setGreetMsg(await invoke("greet", { name }));
    } else {
      setGreetMsg(`${name}, 你好, 当前为web环境，无法与桌面Rust交互`);
    }
  }

  return (
    <div>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <Space>
          <Input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <Button htmlType="submit">Greet</Button>
        </Space>
      </form>

      <p>{greetMsg}</p>
    </div>
  );
};

export default Dashboard;
