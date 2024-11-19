import { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Space,
  Flex,
  Input,
  Divider,
  Badge,
  Tree,
  Drawer,
  Popconfirm,
  Tag,
  Select,
  Card,
} from "antd";
import {
  PlusOutlined,
  ControlOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import SuperForm from "@/component/SuperForm";
import { modal } from "@/store/hooks";
import dayjs from "dayjs";
import { genMenuToTree } from "@/utils/index";
import {
  comGet,
  clientPost,
  clientPut,
  clientDel,
  clientGetList,
} from "@/request";

const { Search } = Input;
const { DirectoryTree } = Tree;
const { Option } = Select;

const Role = () => {
  const formRef = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [dataSourceAdmin, setDataSourceAdmin] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAccess, setOpenAccess] = useState(false);
  const [action, setAction] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(false);
  const [isExpend, setIsExpend] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [paginationMeta, setPaginationMeta] = useState({
    pageSize: 10,
    current: 1,
    total: 10,
  });
  const [paginationMetaAdmin, setPaginationMetaAdmin] = useState({
    pageSize: 10,
    current: 1,
    total: 10,
  });
  const [record, setRecord] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsAdmin, setSelectedRowsAdmin] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    getData({
      current: 1,
      pageSize: 10,
    });
    getDataAdmin({
      current: 1,
      pageSize: 10,
    });
    getAllMenus();
  }, []);

  useEffect(() => {}, [expandedKeys]);

  const getData = (params = {}) => {
    setLoading(true);
    const { current, pageSize } = paginationMeta;
    clientGetList("role", {
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

  const getDataAdmin = (params = {}) => {
    setLoadingAdmin(true);
    const { current, pageSize } = setPaginationMetaAdmin;
    clientGetList("admin", {
      current,
      pageSize,
      ...params,
    })
      .then((res) => {
        if (res.status) {
          const { list, total, current, pageSize } = res.data;
          setPaginationMetaAdmin({
            pageSize: pageSize,
            current: current,
            total: total,
          });
          setDataSourceAdmin(list);
          setLoadingAdmin(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingAdmin(false);
      });
  };

  const getAllMenus = async (params) => {
    const { status, data } = await comGet("/admin/menus", { ...params });
    if (status) {
      setMenuData(data);
      const menuTree = genMenuToTree(data);
      setTreeData(menuTree);
    }
  };

  const onSelect = (keys, info) => {
    let current = info.node;
    console.log(current);
    setSelectedKeys(keys);
  };
  const onExpand = (keys, info) => {
    console.log({ keys });
    setExpandedKeys(keys);
  };

  const onCheck = (checkedKeys, event) => {
    console.log(checkedKeys, event);
    setCheckedKeys(checkedKeys);
  };

  const onExpendTree = () => {
    const keys = menuData.map((item) => item.id);
    console.log({ keys }, isExpend);
    setExpandedKeys(isExpend ? [] : keys);
    setIsExpend(!isExpend);
  };

  const onCheckBatch = () => {
    const keys = menuData.map((item) => item.id);
    console.log({ keys });
    setCheckedKeys(checkedKeys.length === 0 ? keys : []);
  };

  const onSearchMenu = (keyword) => {
    getAllMenus({ title: keyword });
  };

  const onSearch = (value) => {
    console.log(value);
    getData({ role_name: value });
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
          const res = await clientPost("role", values);
          if (res.status) {
            getData();
            setOpen(false);
          }
        } else {
          const res = await clientPut("role", { ...values, id: record.id });
          if (res.status) {
            getData();
            setOpen(false);
          }
        }
      })
      .catch(() => {});
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const formData = [
    {
      label: "角色名称",
      name: "role_name",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入角色名称",
    },
    {
      label: "角色编码",
      name: "role_code",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入角色编码",
    },
    {
      label: "角色描述",
      name: "description",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入角色描述",
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

  const adminColumns = [
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
  ];

  const rowSelectionAdmin = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowsAdmin(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const onSearchAdmin = (value) => {
    console.log(value);
    getData({ username: value });
  };

  const showModal = () => {
    modal.confirm({
      title: "用户列表",
      closable: true,
      maskClosable: true,
      icon: <span></span>,
      open: isModalOpen,
      width: "50%",
      content: (
        <Flex vertical gap="middle">
          <Space size="middle">
            <Search
              placeholder="搜索用户"
              loading={loading}
              allowClear
              onSearch={onSearchAdmin}
            />
          </Space>
          <Table
            rowSelection={{
              ...rowSelectionAdmin,
            }}
            rowKey={(record) => record.id}
            dataSource={dataSourceAdmin}
            columns={adminColumns}
            loading={loadingAdmin}
            pagination={
              dataSourceAdmin.length > 0 && {
                position: ["bottomCenter"],
                showSizeChanger: true,
                showQuickJumper: true,
                onChange: onPaginationChange,
                onShowSizeChange: onShowSizeChange,
                pageSize: paginationMetaAdmin.pageSize, // 每页显示记录数
                current: paginationMetaAdmin.current, // 当前页码
                total: paginationMetaAdmin.total, // 总记录数
              }
            }
          />
        </Flex>
      ),
      onOk() {
        setIsModalOpen(false);
      },
      onCancel() {
        setIsModalOpen(false);
      },
    });
  };

  const showAccessDrawer = () => {
    setOpenAccess(true);
  };

  const onFinishAccess = () => {
    setOpenAccess(false);
  };

  const onCloseAccess = () => {
    setOpenAccess(false);
  };

  const columns = [
    {
      title: "角色名称",
      dataIndex: "role_name",
      key: "role_name",
    },
    {
      title: "角色编码",
      dataIndex: "role_code",
      key: "role_code",
    },
    {
      title: "角色描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        return (
          <Badge
            status={text === "1" ? "processing" : "default"}
            text={text === "1" ? "启用" : "禁用"}
          />
        );
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
            分配用户
          </Button>
          <Divider type="vertical" />

          <Button type="text" size="small" onClick={showAccessDrawer}>
            分配权限
          </Button>
          <Divider type="vertical" />

          <Popconfirm
            title="系统提醒"
            description="您确认要删除岗位吗?"
            onConfirm={() => onConfirm(record)}
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

  const onConfirm = async (record) => {
    const res = await clientDel("role", { ids: record.id });
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
            新增角色
          </Button>
          {selectedRows.length > 0 ? (
            <Popconfirm
              title="系统提醒"
              description="您确认要删除角色吗?"
              onConfirm={onConfirm}
              onCancel={onCancel}
              okText="确认"
              cancelText="取消"
            >
              <Button danger>批量删除</Button>
            </Popconfirm>
          ) : null}
          <Search
            placeholder="搜索角色"
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
          loading={loading}
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
        title={`${action ? "新增" : "编辑"}角色`}
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
        title="分配权限"
        closable
        width="30%"
        open={openAccess}
        footer={
          <Flex justify="flex-end">
            <Space>
              <Button onClick={onCloseAccess}>取消</Button>
              <Button type="primary" onClick={onFinishAccess}>
                确认
              </Button>
            </Space>
          </Flex>
        }
        onClose={onCloseAccess}
      >
        <Flex vertical gap="middle">
          <Space size="middle">
            <Button icon={<CheckSquareOutlined />} onClick={onCheckBatch}>
              {isExpend ? "全选" : "全不选"}
            </Button>
            <Button icon={<ControlOutlined />} onClick={onExpendTree}>
              {isExpend ? "收起" : "展开"}
            </Button>
            <Search
              placeholder="搜索菜单"
              loading={loading}
              allowClear
              onSearch={onSearchMenu}
            />
          </Space>

          <Card>
            <Tree
              checkable
              expandedKeys={expandedKeys}
              selectedKeys={selectedKeys}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              onExpand={onExpand}
              onCheck={onCheck}
              treeData={treeData}
            />
          </Card>
        </Flex>
      </Drawer>
    </>
  );
};

export default Role;
