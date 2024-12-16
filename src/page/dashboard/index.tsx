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
} from "antd";

import {
  HomeOutlined,
  ApiOutlined,
  ReadOutlined,
  GithubOutlined,
  RocketOutlined,
} from "@ant-design/icons";

import { useParams } from "react-router-dom";

import HighLight from "@/component/HighLight";

import { invoke } from "@tauri-apps/api/core";
import { isTauri } from "@/utils/index";

import reactLogo from "@/assets/react.svg";
import vueLogo from "@/assets/vue.svg";
import angularLogo from "@/assets/angular.svg";

const { Text, Link } = Typography;
const { Meta } = Card;

const { BASE_URL } = import.meta.env;

const Dashboard = () => {
  const params = useParams();
  const [greetMsg, setGreetMsg] = useState("");
  const [appInfo, setAppInfo] = useState({});
  const [stackList, setStackList] = useState([]);
  const [activeKey, setActiveKey] = useState("js");
  const [name, setName] = useState("");

  useEffect(() => {
    setAppInfo({
      appId: "1",
      adminUrl: `https://admin.${params.appId}.winbase.io`,
      appUrl: `https://${params.appId}.winbase.io`,
      appKey: "I6IkpXVCJ9.pc3Mim4cCI6.dDAfslwOQyAXsM",
    });

    setStackList([
      {
        id: "1",
        logo: reactLogo,
        description: "基于React开始开发",
        doc: "",
        example: "",
      },
      {
        id: "2",
        logo: vueLogo,
        description: "基于Vue开始开发",
        doc: "",
        example: "",
      },
      {
        id: "3",
        logo: angularLogo,
        description: "基于Angular开始开发",
        doc: "",
        example: "",
      },
    ]);
  }, [params]);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    if (isTauri()) {
      setGreetMsg(await invoke("greet", { name }));
    } else {
      setGreetMsg(`${name}, 你好, 当前为web环境，无法与桌面Rust交互`);
    }
  }

  const onStart = (stack) => {};

  const goDoc = (stack) => {};

  const goExample = (stack) => {
    console.log({ stack });
  };

  const tabContent = [
    {
      label: "JavaScript",
      key: "js",
      children: (
        <HighLight
          language="js"
          code={`
import { createClient } from '@winbase/winbase-js'

const winbaseUrl = 'https://${params.appId}.winbase.io'
const winbaseKey = process.env.WINBASE_KEY
const winbase = createClient(winbaseUrl, winbaseKey)`}
        />
      ),
    },
    {
      label: "Node",
      key: "node",
      children: <HighLight language="js" code='const developer = "winyh"' />,
    },
    {
      label: "Python",
      key: "python",
      children: (
        <HighLight
          language="python"
          code={`def all_unique(lst): 
          x = [1, 1, 2, 2, 3, 2, 3, 4, 5, 6] 
          y = [1, 2,
          3, 4, 5] all_unique(x) # False{" "}`}
        />
      ),
    },
  ];

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  return (
    <div>
      <Row gutter={24}>
        <Col span={6}></Col>
        <Col span={12}>
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

          <Card
            title="应用访问方式"
            extra={
              <Button type="text" icon={<ApiOutlined />}>
                APIKey
              </Button>
            }
          >
            <Flex vertical gap={36}>
              <Flex gap={24} justify="space-between">
                <span>管理URL</span>
                <Space>
                  <Input value={appInfo.adminUrl} style={{ width: 300 }} />
                  <Button>
                    <Link href="https://admin.winbase.io" target="_blank">
                      <HomeOutlined />
                    </Link>
                  </Button>
                </Space>
              </Flex>

              <Flex gap={24} justify="space-between">
                <span>应用URL</span>
                <Space>
                  <Input value={appInfo.appUrl} style={{ width: 300 }} />
                  <Button>
                    <Text
                      copyable={{
                        text: appInfo.appUrl,
                      }}
                    />
                  </Button>
                </Space>
              </Flex>
              <Flex gap={24} justify="space-between">
                <span>访问密钥</span>
                <Space>
                  <Input value={appInfo.appKey} style={{ width: 300 }} />
                  <Button>
                    <Text
                      copyable={{
                        text: appInfo.appKey,
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

            <Divider orientation="left" orientationMargin={0}>
              应用参考
            </Divider>
            <Flex gap={48} wrap>
              {stackList.map((item) => {
                return (
                  <Card
                    key={item.id}
                    actions={[
                      <Button
                        type="text"
                        size="small"
                        icon={<RocketOutlined />}
                        onClick={() => onStart(item)}
                      >
                        开始开发
                      </Button>,
                    ]}
                  >
                    <Flex gap={24} vertical>
                      <Meta
                        avatar={<img src={item.logo} />}
                        description={item.description}
                      />
                      <Flex gap={24} justify="space-between">
                        <Button
                          type="text"
                          size="small"
                          icon={<ReadOutlined />}
                          onClick={() => goDoc(item)}
                        >
                          文档
                        </Button>
                        <Button
                          type="text"
                          size="small"
                          icon={<GithubOutlined />}
                          onClick={() => goExample(item)}
                        >
                          示例
                        </Button>
                      </Flex>
                    </Flex>
                  </Card>
                );
              })}
            </Flex>
          </Card>
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  );
};

export default Dashboard;
