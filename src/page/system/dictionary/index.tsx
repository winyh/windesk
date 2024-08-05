import { useState, useEffect, useRef } from "react";
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
  Tag,
  Popconfirm,
} from "antd";
import { PlusOutlined, MoreOutlined, UserOutlined } from "@ant-design/icons";

const { Search } = Input;

const Dictionary = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const data = ["用户性别", "订单状态", "租户状态", "云存储", "数据库"];

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
      title: "字典项编码",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "字典项标签",
      dataIndex: "hash",
      key: "hash",
    },
    {
      title: "字典项键",
      dataIndex: "suffix",
      key: "suffix",
    },
    {
      title: "字典项值",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "回显样式",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "备注",
      dataIndex: "mark",
      key: "mark",
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const onConfirm = () => {};

  const onCancel = () => {};

  return (
    <Row gutter={24}>
      <Col span={6}>
        <List
          header={<Search placeholder="搜索字典名称" />}
          footer={
            <Button type="text" block icon={<PlusOutlined />}>
              新增字典
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
              <Flex justify="space-between" style={{ flex: 1 }}>
                <span>{item}</span>
                <Tag color="green">sys_user_sex</Tag>
              </Flex>
            </List.Item>
          )}
        />
      </Col>
      <Col span={18}>
        <Flex vertical gap="middle">
          <Space size="middle">
            <Button icon={<PlusOutlined />}>新增字典项</Button>
            {selectedRows.length > 0 ? (
              <Popconfirm
                title="系统提醒"
                description="您确认要删除租户吗?"
                onConfirm={onConfirm}
                onCancel={onCancel}
                okText="确认"
                cancelText="取消"
              >
                <Button danger>批量删除</Button>
              </Popconfirm>
            ) : null}
            <Search placeholder="搜索字典项名称" />
          </Space>
          <Table
            rowSelection={{
              ...rowSelection,
            }}
            rowKey={(record) => record.id}
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
      </Col>
    </Row>
  );
};

export default Dictionary;
