import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Flex,
  Input,
  Divider,
  Tag,
  Badge,
  Dropdown,
} from "antd";
import {
  PlusOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  KeyOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Search } = Input;

const Admin = () => {
  const [dataSource, setDataSource] = useState([1]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const menuItems = [
    {
      label: "重置密码",
      key: "1",
      icon: <KeyOutlined />,
      disabled: true,
    },
    {
      label: "分配角色",
      key: "2",
      icon: <VerifiedOutlined />,
    },
    {
      label: "删除账户",
      key: "delete",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const columns = [
    {
      title: "用户名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "组织部门",
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
      render: () => {
        return <Tag color="green">222</Tag>;
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: () => {
        return <Badge status="processing" text="启用" />;
      },
    },
    {
      title: "到期时间",
      dataIndex: "expire_at",
      key: "expire_at",
      render: () => {
        return <span>{dayjs().format("YYYY-MM-DD HH:mm:ss")}</span>;
      },
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text) => (
        <>
          <Button type="text" size="small">
            编辑
          </Button>
          <Divider type="vertical" />
          <Button type="text" size="small">
            详情
          </Button>
          <Divider type="vertical" />

          <Dropdown
            menu={{
              items: menuItems,
            }}
          >
            <Button
              type="text"
              size="small"
              iconPosition="end"
              icon={<EllipsisOutlined />}
            >
              更多
            </Button>
          </Dropdown>
        </>
      ),
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

  return (
    <Flex vertical gap="middle">
      <Space size="middle">
        <Button icon={<PlusOutlined />}>新增用户</Button>
        {selectedRows.length > 0 ? <Button danger>批量删除</Button> : null}
        <Search placeholder="搜索用户" loading={searchLoading} />
      </Space>
      <Table
        rowSelection={{
          ...rowSelection,
        }}
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
