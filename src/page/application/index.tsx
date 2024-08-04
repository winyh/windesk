import React, { useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
  DiffOutlined,
  ExportOutlined,
  TagOutlined,
  PlusOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Flex,
  Pagination,
  Dropdown,
  Space,
  Button,
  Input,
  Segmented,
  Tooltip,
  Badge,
} from "antd";

const { Search } = Input;

const Application = () => {
  const [loading, setLoading] = useState(true);

  const items = [
    {
      key: "export",
      label: "应用导出",
      icon: <ExportOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "copy",
      label: "应用复制",
      icon: <DiffOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "default",
      label: "设为默认",
      icon: <TagOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "应用删除",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const actions = [
    <Tooltip key="design" title="应用设计">
      <EditOutlined />
    </Tooltip>,
    <Tooltip key="setting" title="应用配置">
      <SettingOutlined />
    </Tooltip>,
    <Dropdown
      key="ellipsis"
      menu={{
        items,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <EllipsisOutlined />
      </a>
    </Dropdown>,
  ];

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  return (
    <Flex justify="space-between" vertical style={{ height: "100%" }}>
      <Flex vertical gap="middle">
        <Space size="middle">
          <Button icon={<PlusOutlined />}>新建应用</Button>
          <Button icon={<ImportOutlined />}>导入应用</Button>
          <Segmented
            options={[
              {
                label: "我创建的",
                value: "create",
              },
              {
                label: "我加入的",
                value: "join",
              },
            ]}
            onChange={(value) => {
              console.log(value); // string
            }}
          />
          <Search placeholder="搜索应用名称" />
        </Space>
        <Flex gap="middle" align="start" wrap>
          <Badge.Ribbon text="默认">
            <Card
              title="应用A"
              loading={loading}
              actions={actions}
              style={{
                minWidth: 300,
              }}
            >
              <Card.Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                }
                description={
                  <>
                    <p>This is the description</p>
                    <p>This is the description</p>
                  </>
                }
              />
            </Card>
          </Badge.Ribbon>

          <Card
            title="应用B"
            loading={loading}
            actions={actions}
            style={{
              minWidth: 300,
            }}
          >
            <Card.Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
              }
              description={
                <>
                  <p>This is the description</p>
                  <p>This is the description</p>
                </>
              }
            />
          </Card>
          <Card
            title="应用B"
            loading={loading}
            actions={actions}
            style={{
              minWidth: 300,
            }}
          >
            <Card.Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
              }
              description={
                <>
                  <p>This is the description</p>
                  <p>This is the description</p>
                </>
              }
            />
          </Card>
          <Card
            title="应用B"
            loading={loading}
            actions={actions}
            style={{
              minWidth: 300,
            }}
          >
            <Card.Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
              }
              description={
                <>
                  <p>This is the description</p>
                  <p>This is the description</p>
                </>
              }
            />
          </Card>
          <Card
            title="应用B"
            loading={loading}
            actions={actions}
            style={{
              minWidth: 300,
            }}
          >
            <Card.Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
              }
              description={
                <>
                  <p>This is the description</p>
                  <p>This is the description</p>
                </>
              }
            />
          </Card>
          <Card
            title="应用B"
            loading={loading}
            actions={actions}
            style={{
              minWidth: 300,
            }}
          >
            <Card.Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
              }
              description={
                <>
                  <p>This is the description</p>
                  <p>This is the description</p>
                </>
              }
            />
          </Card>
        </Flex>
      </Flex>

      <Flex justify="center">
        <Pagination
          showQuickJumper
          defaultCurrent={2}
          total={500}
          onChange={onChange}
        />
      </Flex>
    </Flex>
  );
};

export default Application;
