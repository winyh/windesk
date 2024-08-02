import { Table, Button, Space, Flex, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;

const Position = () => {
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const dataSource = [
    {
      key: "1",
      name: "前端开发",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "运营经理",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];

  const columns = [
    {
      title: "岗位名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "岗位编码",
      dataIndex: "hash",
      key: "hash",
    },
    {
      title: "岗位排序",
      dataIndex: "suffix",
      key: "suffix",
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
        <Button icon={<PlusOutlined />}>岗位新增</Button>
        <Button danger>批量删除</Button>
        <Search placeholder="搜索岗位" />
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

export default Position;
