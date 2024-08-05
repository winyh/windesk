import { useState, useEffect, useRef } from "react";
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
  Alert,
  Typography,
} from "antd";
const { Paragraph, Text } = Typography;
import {
  PlusOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  KeyOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import SuperForm from "@/component/SuperForm";
import dayjs from "dayjs";

const { Search } = Input;

const Admin = () => {
  const formRef = useRef();
  const formPwdRef = useRef();
  const [dataSource, setDataSource] = useState([
    { id: 1, username: "唱响科技", leader: "常山" },
  ]);
  const [open, setOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);
  const [action, setAction] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [record, setRecord] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const { modal } = App.useApp();

  const onSearch = (value) => {
    console.log(value);
  };

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const showDrawer = (bool, record) => {
    setAction(bool);
    setOpen(true);
    console.log({ record });
    setRecord(record);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onFinish = () => {
    formRef?.current?.form
      .validateFields()
      .then(async (values) => {
        console.log({ values });
      })
      .catch(() => {});
  };

  const showPwdDrawer = (bool) => {
    setPwdOpen(true);
  };

  const onPwdClose = () => {
    setPwdOpen(false);
  };

  const onPwdFinish = () => {
    formPwdRef?.current?.form
      .validateFields()
      .then(async (values) => {
        console.log({ values });
      })
      .catch(() => {});
  };

  const onConfirmReset = () => {
    modal.success({
      title: "重置密码成功",
      icon: <span></span>,
      content: (
        <Flex gap={24} vertical justify="center" style={{ height: 120 }}>
          <Text type="warning">新密码只显示一次，请牢记新密码</Text>
          <Alert
            message="Success Tips"
            type="success"
            showIcon
            action={<Text copyable={{ text: "26888888" }} />}
          />
        </Flex>
      ),
      okText: "确认",
    });
  };

  const menuItems = [
    {
      label: "修改密码",
      key: "1",
      icon: <KeyOutlined />,
      onClick: showPwdDrawer,
    },
    {
      label: (
        <Popconfirm
          title="系统提醒"
          description="您确认要重置密码?"
          onConfirm={onConfirmReset}
        >
          重置密码
        </Popconfirm>
      ),
      key: "2",
      icon: (
        <Popconfirm
          title="系统提醒"
          description="您确认要重置密码?"
          onConfirm={onConfirmReset}
        >
          <ReloadOutlined />
        </Popconfirm>
      ),
    },
    {
      label: "删除账户",
      key: "delete",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const formData = [
    {
      label: "账户名称",
      name: "username",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入账户名称",
    },
    {
      label: "用户昵称",
      name: "nick_name",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入用户昵称",
    },
    {
      label: "联系方式",
      name: "mobile",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入联系方式",
    },
    {
      label: "邮箱",
      name: "email",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入邮箱",
    },
    {
      label: "组织部门",
      name: "organization",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入组织部门",
    },
    {
      label: "岗位",
      name: "position",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入岗位",
    },
    {
      label: "角色",
      name: "role",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入角色",
    },
    {
      label: "状态",
      name: "status",
      itemSpan: 24,
      placeholder: "请选择状态",
      options: [],
      is: "Select",
    },
  ];

  const formPwdData = [
    {
      label: "原密码",
      name: "password",
      is: "Input.Password",
      itemSpan: 24,
      placeholder: "请输入原密码",
    },
    {
      label: "新密码",
      name: "new_password",
      is: "Input.Password",
      itemSpan: 24,
      placeholder: "请输入新密码",
    },
    {
      label: "确认密码",
      name: "confirm_password",
      is: "Input.Password",
      itemSpan: 24,
      placeholder: "请确认密码",
    },
  ];

  const showModal = () => {
    modal.confirm({
      title: "用户详情",
      closable: true,
      maskClosable: true,
      icon: <span></span>,
      open: isModalOpen,
      width: "50%",
      content: (
        <div>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
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
      title: "账户名称",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "用户昵称",
      dataIndex: "nick_name",
      key: "nick_name",
    },
    {
      title: "联系方式",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "组织部门",
      dataIndex: "organization",
      key: "organization",
    },
    {
      title: "岗位",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      render: () => {
        return <Tag color="green">管理员</Tag>;
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
      title: "注册时间",
      dataIndex: "created_at",
      key: "created_at",
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
          <Button
            type="text"
            size="small"
            onClick={() => showDrawer(false, record)}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button type="text" size="small" onClick={showModal}>
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

  const onConfirm = () => {};

  const onCancel = () => {};

  return (
    <>
      <Flex vertical gap="middle">
        <Space size="middle">
          <Button icon={<PlusOutlined />} onClick={() => showDrawer(true)}>
            新增用户
          </Button>
          {selectedRows.length > 0 ? (
            <Popconfirm
              title="系统提醒"
              description="您确认要删除用户吗?"
              onConfirm={onConfirm}
              onCancel={onCancel}
              okText="确认"
              cancelText="取消"
            >
              <Button danger>批量删除</Button>
            </Popconfirm>
          ) : null}
          <Search
            placeholder="搜索用户"
            loading={searchLoading}
            onSearch={onSearch}
          />
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

      <Drawer
        title={`${action ? "新增" : "编辑"}用户`}
        onClose={onClose}
        open={open}
        footer={
          <Flex justify="flex-end">
            <Space>
              <Button onClick={onClose}>取消</Button>
              <Button type="primary" onClick={onFinish}>
                确认
              </Button>
            </Space>
          </Flex>
        }
      >
        <SuperForm
          ref={formRef}
          data={formData}
          layout={layout}
          initialValues={record}
          rulesValid={false}
          btnAction={false}
        ></SuperForm>
      </Drawer>

      <Drawer
        title="修改密码"
        onClose={onPwdClose}
        open={pwdOpen}
        footer={
          <Flex justify="flex-end">
            <Space>
              <Button onClick={onPwdClose}>取消</Button>
              <Button type="primary" onClick={onPwdFinish}>
                确认
              </Button>
            </Space>
          </Flex>
        }
      >
        <SuperForm
          ref={formPwdRef}
          data={formPwdData}
          layout={layout}
          btnAction={false}
        ></SuperForm>
      </Drawer>
    </>
  );
};

export default Admin;
