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
  Drawer,
  Popconfirm,
  App,
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

const Tenant = () => {
  const [dataSource, setDataSource] = useState([1]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const { modal } = App.useApp();

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const showDrawer = (bool) => {
    setAction(bool);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showModal = () => {
    modal.confirm({
      title: "租户详情",
      closable: true,
      maskClosable: true,
      icon: <span></span>,
      open: isModalOpen,
      width: "50%",
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {
        setIsModalOpen(false);
      },
      onCancel() {
        setIsModalOpen(false);
      },
    });
  };

  const columns = [
    {
      title: "租户名称",
      dataIndex: "name",
      key: "name",
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
      render: () => {
        return <Badge status="processing" text="启用" />;
      },
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      key: "created_at",
      render: () => {
        return <span>{dayjs().format("YYYY-MM-DD HH:mm:ss")}</span>;
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
          <Button type="text" size="small" onClick={() => showDrawer(false)}>
            编辑
          </Button>
          <Divider type="vertical" />
          <Button type="text" size="small" onClick={showModal}>
            详情
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="系统提醒"
            description="您确认要删除租户吗?"
            onConfirm={onConfirm}
            onCancel={onCancel}
            okText="确认"
            cancelText="取消"
          >
            <Button type="text" size="small" danger>
              删除
            </Button>
          </Popconfirm>
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

  const onConfirm = () => {};

  const onCancel = () => {};

  return (
    <>
      <Flex vertical gap="middle">
        <Space size="middle">
          <Button icon={<PlusOutlined />} onClick={() => showDrawer(true)}>
            新增租户
          </Button>
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
          <Search placeholder="搜索租户" loading={searchLoading} />
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

      <Drawer
        title={`${action ? "新增" : "编辑"}租户`}
        onClose={onClose}
        open={open}
        footer={
          <Flex justify="flex-end">
            <Space>
              <Button>取消</Button>
              <Button type="primary">确认</Button>
            </Space>
          </Flex>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Tenant;
