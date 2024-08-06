import { useState, useEffect, useRef } from "react";
import { Row, Col, List, Input, Button, Dropdown, Flex, Space } from "antd";
import {
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  CodeOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import useStore from "@/store/index";
import WinCode from "@/component/Code";

const { Search } = Input;
import "./index.css";

const Function = () => {
  const [themeMode, setThemeMode] = useState();
  const antdThemeMode = useStore((state) => state.themeMode);
  useEffect(() => {
    setThemeMode(antdThemeMode);
  }, [antdThemeMode]);

  const data = [
    "getUserList",
    "refreshToken",
    "findRole",
    "adminFnCall",
    "categoryList",
  ];

  const items = [
    {
      label: "修改",
      key: "1",
      icon: <EditOutlined />,
    },
    {
      label: "配置",
      key: "2",
      icon: <SettingOutlined />,
    },
    {
      label: "删除",
      key: "3",
      icon: <DeleteOutlined />,
      danger: true,
      disabled: true,
    },
  ];

  const onCodeChange = (delta, content) => {
    // console.log({ delta, content });
  };

  return (
    <Row gutter={24} style={{ height: "100%" }}>
      <Col span={4}>
        <List
          header={<Search placeholder="搜索云函数" />}
          footer={
            <Button type="text" block icon={<PlusOutlined />}>
              新建云函数
            </Button>
          }
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item}>
              <List.Item.Meta title={item} />
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomLeft"
              >
                <Button type="text" icon={<MoreOutlined />}></Button>
              </Dropdown>
            </List.Item>
          )}
        />
      </Col>
      <Col span={20} style={{ height: "100%" }}>
        <Flex vertical gap={24} style={{ height: "100%" }}>
          <Space size="middle">
            <Button icon={<SaveOutlined />}>保存函数</Button>
            <Button icon={<CodeOutlined />}>执行函数</Button>
          </Space>

          <WinCode
            initialValue="const name = winbase"
            onChange={onCodeChange}
            theme={themeMode}
          />
        </Flex>
      </Col>
    </Row>
  );
};

export default Function;
