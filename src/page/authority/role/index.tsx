import { Table, Button, Space, Flex, Input, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;

const Role = () => {
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
      title: "角色名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "角色编号",
      dataIndex: "hash",
      key: "hash",
    },
    {
      title: "角色排序",
      dataIndex: "suffix",
      key: "suffix",
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
      render: (text) => (
        <Space>
          <span>菜单权限</span>
          <Divider />
          <span>数据权限</span>
          <Divider />
          <span>分配用户</span>
          <Divider />
        </Space>
      ),
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

export default Role;
