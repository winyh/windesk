import { Table, Button, Space, Flex, Input, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;

const Admin = () => {
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const dataSource = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];

  const columns = [
    {
      title: "用户名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "组织部门（部门）",
      dataIndex: "hash",
      key: "hash",
    },
    {
      title: "岗位",
      dataIndex: "suffix",
      key: "suffix",
    },
    {
      title: "联系方式",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "角色",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "到期时间",
      dataIndex: "expire_at",
      key: "expire_at",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text) => (
        <Space>
          <span>重置密码</span>
          <Divider />
          <span>分配角色</span>
          <Divider />
        </Space>
      ),
    },
  ];
  return (
    <Flex vertical gap="middle">
      <Space size="middle">
        <Button icon={<PlusOutlined />}>录入用户</Button>
        <Button danger>批量删除</Button>
        <Search placeholder="搜索用户" />
      </Space>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          position: ["bottomCenter"],
          showSizeChanger: true,
          showQuickJumper: true,
          onShowSizeChange: { onShowSizeChange },
          defaultCurrent: 3,
          total: 500,
        }}
      />
    </Flex>
  );
};

export default Admin;
