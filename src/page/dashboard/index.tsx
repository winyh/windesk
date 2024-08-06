import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Space,
  Row,
  Col,
  Card,
  Divider,
  Tabs,
  Flex,
  Typography,
  Avatar,
} from "antd";

import {
  ReadOutlined,
  GithubOutlined,
  RocketOutlined,
} from "@ant-design/icons";

import useStore from "@/store/index";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";

import { invoke } from "@tauri-apps/api/tauri";
import { isTauri } from "@/utils/index";

import reactLogo from "@/assets/react.svg";
import vueLogo from "@/assets/vue.svg";
import angularLogo from "@/assets/angular.svg";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);

const { Text } = Typography;
const { Meta } = Card;

const { BASE_URL } = import.meta.env;

const Dashboard = () => {
  const [greetMsg, setGreetMsg] = useState("");
  const [activeKey, setActiveKey] = useState("js");
  const [name, setName] = useState("");
  const antdThemeMode = useStore((state) => state.themeMode);

  useEffect(() => {
    let linkTarget = document.getElementById("hljs");
    let github = "github";
    if (antdThemeMode === "dark") {
      github = "github-dark";
    }

    if (linkTarget) {
      document.head.removeChild(linkTarget);
    }

    const linkElement = document.createElement("link");
    linkElement.id = "hljs";
    linkElement.rel = "stylesheet";
    linkElement.href = `${BASE_URL}css/${github}.min.css`;
    document.head.appendChild(linkElement);

    hljs.highlightAll();
  }, [antdThemeMode]);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    if (isTauri()) {
      setGreetMsg(await invoke("greet", { name }));
    } else {
      setGreetMsg(`${name}, 你好, 当前为web环境，无法与桌面Rust交互`);
    }
  }

  const tabContent = [
    {
      label: "JavaScript",
      key: "js",
      children: (
        <pre>
          <code className="language-js">console.log('Hello, world!');</code>
        </pre>
      ),
    },
    {
      label: "Node",
      key: "node",
      children: (
        <pre>
          <code className="language-js">const developer = "winyh"</code>
        </pre>
      ),
    },
    {
      label: "Python",
      key: "python",
      children: (
        <pre>
          <code className="language-python">
            {`def all_unique(lst): 
            x = [1, 1, 2, 2, 3, 2, 3, 4, 5, 6] 
            y = [1, 2,
            3, 4, 5] all_unique(x) # False{" "}`}
          </code>
        </pre>
      ),
    },
  ];

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
    onListen();
  };

  const onListen = () => {
    requestAnimationFrame(() => {
      Array.from(document.querySelectorAll("pre code")).forEach((block) => {
        hljs.highlightBlock(block);
      });
    });
  };

  return (
    <div>
      <Row gutter={24}>
        <Col span={6}>
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
        </Col>
        <Col span={12}>
          <Card title="应用访问方式">
            <Flex vertical gap={36}>
              <Flex gap={24} justify="space-between">
                <span>应用URL</span>
                <Space>
                  <Input
                    defaultValue="https://cwbtvnofqvimqiyznkbt.winbase.io"
                    style={{ width: 300 }}
                  />
                  <Button>
                    <Text
                      copyable={{
                        text: "https://cwbtvnofqvimqiyznkbt.winbase.io",
                      }}
                    />
                  </Button>
                </Space>
              </Flex>
              <Flex gap={24} justify="space-between">
                <span>访问密钥</span>
                <Space>
                  <Input
                    defaultValue="I6IkpXVCJ9.pc3Mim4cCI6.dDAfslwOQyAXsM"
                    style={{ width: 300 }}
                  />
                  <Button>
                    <Text
                      copyable={{
                        text: "I6IkpXVCJ9.pc3Mim4cCI6.dDAfslwOQyAXsM",
                      }}
                    />
                  </Button>
                </Space>
              </Flex>
            </Flex>
            <Divider />
            <Tabs
              activeKey={activeKey}
              type="card"
              size="small"
              items={tabContent}
              onChange={onChange}
            />

            <Flex gap={48}>
              <Card
                actions={[
                  <Button type="text" size="small" icon={<RocketOutlined />}>
                    开始开发
                  </Button>,
                ]}
              >
                <Flex gap={24} vertical>
                  <Meta
                    avatar={<img src={reactLogo} />}
                    description="基于React开始开发"
                  />
                  <Flex gap={24} justify="space-between">
                    <Button type="text" size="small" icon={<ReadOutlined />}>
                      文档
                    </Button>
                    <Button type="text" size="small" icon={<GithubOutlined />}>
                      示例
                    </Button>
                  </Flex>
                </Flex>
              </Card>

              <Card
                actions={[
                  <Button type="text" size="small" icon={<RocketOutlined />}>
                    开始开发
                  </Button>,
                ]}
              >
                <Flex gap={24} vertical>
                  <Meta
                    avatar={<img src={vueLogo} />}
                    description="基于Vue开始开发"
                  />
                  <Flex gap={24} justify="space-between">
                    <Button type="text" size="small" icon={<ReadOutlined />}>
                      文档
                    </Button>
                    <Button type="text" size="small" icon={<GithubOutlined />}>
                      示例
                    </Button>
                  </Flex>
                </Flex>
              </Card>

              <Card
                actions={[
                  <Button type="text" size="small" icon={<RocketOutlined />}>
                    开始开发
                  </Button>,
                ]}
              >
                <Flex gap={24} vertical>
                  <Meta
                    avatar={<img src={angularLogo} />}
                    description="基于Angular开始开发"
                  />
                  <Flex gap={24} justify="space-between">
                    <Button type="text" size="small" icon={<ReadOutlined />}>
                      文档
                    </Button>
                    <Button type="text" size="small" icon={<GithubOutlined />}>
                      示例
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            </Flex>
          </Card>
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  );
};

export default Dashboard;
