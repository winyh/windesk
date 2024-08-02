import { Table, Button, Space, Flex, Input } from "antd";
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
      title: "租户名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "所属机构",
      dataIndex: "hash",
      key: "hash",
    },
    {
      title: "负责人",
      dataIndex: "suffix",
      key: "suffix",
    },
    {
      title: "联系方式",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "应用数",
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
    },
  ];
  return (
    <Flex vertical gap="middle">
      <Space size="middle">
        <Button icon={<PlusOutlined />}>录入租户</Button>
        <Button danger>批量删除</Button>
        <Search placeholder="搜索租户" />
      </Space>
      <Table
        dataSource={dataSource}
        columns={columns}
        virtual
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