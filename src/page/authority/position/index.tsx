import {
  Col,
  Row,
  List,
  Input,
  Flex,
  Space,
  Button,
  Dropdown,
  Table,
} from "antd";
import {
  PlusOutlined,
  MoreOutlined,
  UserOutlined,
  CodeOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const Position = () => {
  const data = ["user", "article", "role", "admin", "category"];

  const items = [
    {
      label: "修改",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "配置",
      key: "2",
      icon: <UserOutlined />,
    },
    {
      label: "删除",
      key: "3",
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: "禁用",
      key: "4",
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];

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
    <Row gutter={24}>
      <Col span={4}>
        <List
          header={<Search placeholder="搜索数据表" />}
          footer={
            <Button type="text" block icon={<PlusOutlined />}>
              新增数据表
            </Button>
          }
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomLeft"
                >
                  <Button type="text" icon={<MoreOutlined />}></Button>
                </Dropdown>,
              ]}
            >
              {item}
            </List.Item>
          )}
        />
      </Col>
      <Col span={20}>
        <Flex vertical gap="middle">
          <Flex justify="space-between">
            <Space size="middle">
              <Button icon={<CodeOutlined />}>SQL</Button>
              <Button danger>批量删除</Button>
              <Search placeholder="搜索数据" />
            </Space>
            <Space size="middle">
              <Button>API / GraphQL</Button>
              <Button icon={<PlusOutlined />}>新增记录</Button>
            </Space>
          </Flex>
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
      </Col>
    </Row>
  );
};

export default Position;
