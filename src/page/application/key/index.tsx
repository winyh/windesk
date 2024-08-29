import { useState } from "react";
import { Button, Table, Flex, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const ApiKey = () => {
  const [keyList, setKeyList] = useState([]);

  const dataSource = [
    {
      key: "1",
      name: "应用KEY",
      token: "HSHJK-KKDALADLD-KADDKD-JSAJDKAD-JASJKDKAK",
      limit: "60次 / 秒",
      create_at: "2023-01-01",
      expire: "2025-01-01",
      status: "正常",
    },
    {
      key: "2",
      name: "应用KEY",
      token: "HKDJJ-JSAJJAJSSA-KADDKD-DKDKDLAU-JASJKDKAK",
      limit: "60次 / 秒",
      create_at: "2023-01-01",
      expire: "2025-01-01",
      status: "正常",
    },
  ];

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "KEY",
      dataIndex: "token",
      key: "token",
    },
    {
      title: "限流",
      dataIndex: "limit",
      key: "limit",
    },
    {
      title: "生成时间",
      dataIndex: "create_at",
      key: "create_at",
    },
    {
      title: "有效期",
      dataIndex: "expire",
      key: "expire",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <Button type="text" danger>
            删除
          </Button>
        );
      },
    },
  ];

  return (
    <Flex vertical gap={12}>
      <Flex align="center">
        <Space>
          <Button icon={<PlusOutlined />}>创建KEY</Button>
          <div>
            分为租户KEY可以通过接口管理整个后台-应用KEY 可以管理单个应用
          </div>
        </Space>
      </Flex>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </Flex>
  );
};

export default ApiKey;
