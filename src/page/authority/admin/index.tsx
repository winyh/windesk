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
import {
  clientPost,
  clientPut,
  clientDel,
  clientGetList,
  clientGetAll,
} from "@/request";

const { Search } = Input;

const Admin = () => {
  const formRef = useRef();
  const formPwdRef = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);
  const [action, setAction] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paginationMeta, setPaginationMeta] = useState({
    pageSize: 10,
    current: 1,
    total: 10,
  });
  const [record, setRecord] = useState({});
  const [roles, setRoles] = useState([]);
  const [positions, setPositions] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { modal } = App.useApp();

  useEffect(() => {
    getData({
      current: 1,
      pageSize: 10,
    });
    getOrganizations();
    getPositions();
    getRoles();
  }, []);

  const getData = (params = {}) => {
    setLoading(true);
    const { current, pageSize } = paginationMeta;
    clientGetList("admin", {
      current,
      pageSize,
      ...params,
    })
      .then((res) => {
        if (res.status) {
          const { list, total, current, pageSize } = res.data;
          setPaginationMeta({
            pageSize: pageSize,
            current: current,
            total: total,
          });
          setDataSource(list);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getOrganizations = () => {
    clientGetAll("organization", {})
      .then((res) => {
        if (res.status) {
          const { data } = res;
          setOrganizations(data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const getRoles = () => {
    clientGetAll("role", {})
      .then((res) => {
        if (res.status) {
          const { data } = res;
          setRoles(data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const getPositions = () => {
    clientGetAll("position", {})
      .then((res) => {
        if (res.status) {
          const { data } = res;
          setPositions(data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const onSearch = (value) => {
    console.log(value);
    getData({ name: value });
  };

  const onPaginationChange = (current, pageSize) => {
    setPaginationMeta((pre) => ({ ...pre, current, pageSize }));
    getData({ current, pageSize });
  };

  const onShowSizeChange = (current, pageSize) => {
    setPaginationMeta((pre) => ({ ...pre, current, pageSize }));
    getData({ current, pageSize });
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
        if (action) {
          const res = await clientPost("admin", values);
          if (res.status) {
            getData();
            setOpen(false);
          }
        } else {
          const res = await clientPut("admin", { ...values, id: record.id });
          if (res.status) {
            getData();
            setOpen(false);
          }
        }
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

  // 系统默认生成密码，所以没有密码-确认密码录入框
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
      name: "organization_id",
      is: "Select",
      itemSpan: 24,
      placeholder: "请选择组织部门",
      options: organizations.map((item) => ({
        label: item?.name,
        value: item?.id,
      })),
    },
    {
      label: "岗位",
      name: "position_id",
      is: "Select",
      itemSpan: 24,
      placeholder: "请选择岗位",
      options: positions.map((item) => ({
        label: item?.name,
        value: item?.id,
      })),
    },
    {
      label: "角色",
      name: "role_id",
      is: "Select",
      itemSpan: 24,
      placeholder: "请选择角色",
      options: roles.map((item) => ({
        label: item?.role_name,
        value: item?.id,
      })),
    },
    {
      label: "状态",
      name: "status",
      itemSpan: 24,
      placeholder: "请选择状态",
      is: "Select",
      options: [
        {
          label: "启用",
          value: "1",
        },
        {
          label: "禁用",
          value: "0",
        },
      ],
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
      dataIndex: "organization_id",
      key: "organization_id",
    },
    {
      title: "岗位",
      dataIndex: "position_id",
      key: "position_id",
    },
    {
      title: "角色",
      dataIndex: "role_id",
      key: "role_id",
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
      render: (text, record) => (
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

  const onConfirm = async (record) => {
    const res = await clientDel("tenant", { ids: record.id });
    if (res.status) {
      getData();
      console.log({ res });
    }
  };

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
            loading={loading}
            allowClear
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
          pagination={
            dataSource.length > 0 && {
              position: ["bottomCenter"],
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: onPaginationChange,
              onShowSizeChange: onShowSizeChange,
              pageSize: paginationMeta.pageSize, // 每页显示记录数
              current: paginationMeta.current, // 当前页码
              total: paginationMeta.total, // 总记录数
            }
          }
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
