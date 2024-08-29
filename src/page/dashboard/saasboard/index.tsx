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

import { ApiOutlined } from "@ant-design/icons";

import { message } from "@/store/hooks";

import HighLight from "@/component/HighLight";

const { Text } = Typography;

const Dashboard = () => {
  const [appInfo, setAppInfo] = useState({});
  const [activeKey, setActiveKey] = useState("js");

  useEffect(() => {
    setAppInfo({
      appId: "1",
      appUrl: "https://cwbtvnofqvimqiyznkbt.winbase.io",
      appKey: "I6IkpXVCJ9.pc3Mim4cCI6.dDAfslwOQyAXsM",
    });
  }, []);

  const onAppClick = () => {
    message.success("这是 Saas Dashboard");
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

const winbaseUrl = 'https://cwbtvnofqvimqiyznkbt.winbase.co'
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
          </Card>
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  );
};

export default Dashboard;
