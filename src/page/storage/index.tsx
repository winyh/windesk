import { Table, Button, Space, Flex, Input } from "antd";
import { FolderOpenOutlined, UploadOutlined } from "@ant-design/icons";

const { Search } = Input;

const Storage = () => {
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
      title: "文件名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "文件ID",
      dataIndex: "hash",
      key: "hash",
    },
    {
      title: "文件后缀",
      dataIndex: "suffix",
      key: "suffix",
    },
    {
      title: "大小",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      key: "created_at",
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
        <Button icon={<FolderOpenOutlined />}>文件夹</Button>
        <Button icon={<UploadOutlined />}>文件上传</Button>
        <Button danger>批量删除</Button>
        <Search placeholder="搜索文件" />
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

export default Storage;
