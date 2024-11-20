import { useState, useEffect, useRef, useReducer } from "react";

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
  Card,
} from "antd";
import {
  PlusOutlined,
  ControlOutlined,
  CheckSquareOutlined,
  BorderOutlined,
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

const initialStates = {
  action: false,
  isCheck: false,
  isExpend: false,
  loading: false,
  loadingAdmin: false,
  loadingMenu: false,
  open: false,
  openAccess: false,
  modalOpen: false,
  selectedRows: [],
  selectedRowsAdmin: [],
  menuData: [],
  treeData: [],
  dataSource: {
    list: [],
    pageSize: 10,
    current: 1,
    total: 10,
  },
  dataSourceAdmin: {
    list: [],
    pageSize: 10,
    current: 1,
    total: 10,
  },
};

const statesReducer = (states, action) => {
  switch (action.type) {
    case "action": {
      return { ...states, action: action.bool };
    }
    case "check": {
      return { ...states, isCheck: !states.isCheck };
    }
    case "expend": {
      return { ...states, isExpend: !states.isExpend };
    }
    case "load": {
      return { ...states, loading: !states.loading };
    }
    case "loadAdmin": {
      return { ...states, loadingAdmin: !states.loadingAdmin };
    }
    case "loadMenu": {
      return { ...states, loadingMenu: !states.loadingMenu };
    }
    case "open": {
      return { ...states, open: !states.open };
    }
    case "openAccess": {
      return { ...states, openAccess: !states.openAccess };
    }
    case "selectedRows": {
      return { ...states, selectedRows: action.selectedRows };
    }
    case "selectedRowsAdmin": {
      return { ...states, selectedRowsAdmin: action.selectedRowsAdmin };
    }
    case "menuData": {
      return { ...states, menuData: action.menuData };
    }
    case "treeData": {
      return { ...states, treeData: action.treeData };
    }
    case "dataSource": {
      return {
        ...states,
        dataSource: {
          list: action.list,
          pageSize: action.pageSize,
          current: action.current,
          total: action.total,
        },
      };
    }
    case "dataSourceAdmin": {
      return {
        ...states,
        dataSourceAdmin: {
          list: action.list,
          pageSize: action.pageSize,
          current: action.current,
          total: action.total,
        },
      };
    }
    default: {
      throw Error("未知 action: " + action.type);
    }
  }
};

const Role = () => {
  const formRef = useRef();
  const [states, dispatch] = useReducer(statesReducer, initialStates);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [record, setRecord] = useState({});

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

  const getData = (params = {}) => {
    dispatch({
      type: "load",
    });
    const { current, pageSize } = states.dataSource;
    clientGetList("role", {
      current,
      pageSize,
      ...params,
    })
      .then((res) => {
        if (res.status) {
          const { list, total, current, pageSize } = res.data;
          dispatch({
            type: "dataSource",
            list: list,
            pageSize: pageSize,
            current: current,
            total: total,
          });
          dispatch({
            type: "load",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "load",
        });
      });
  };

  const getDataAdmin = (params = {}) => {
    dispatch({
      type: "loadAdmin",
    });
    const { current, pageSize } = states.dataSourceAdmin;
    clientGetList("admin", {
      current,
      pageSize,
      ...params,
    })
      .then((res) => {
        if (res.status) {
          const { list, total, current, pageSize } = res.data;

          dispatch({
            type: "dataSourceAdmin",
            list: list,
            pageSize: pageSize,
            current: current,
            total: total,
          });

          dispatch({
            type: "loadAdmin",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "loadAdmin",
        });
      });
  };

  const getAllMenus = async (params) => {
    const { status, data } = await comGet("/admin/menus", { ...params });
    if (status) {
      dispatch({
        type: "menuData",
        menuData: data,
      });
      const menuTree = genMenuToTree(data);
      dispatch({
        type: "treeData",
        treeData: menuTree,
      });
    }
  };

  const onSelect = (keys, info) => {
    let current = info.node;
    setSelectedKeys(keys);
  };
  const onExpand = (keys, info) => {
    setExpandedKeys(keys);
  };

  const onCheck = (checkedKeys, event) => {
    setCheckedKeys(checkedKeys);
  };

  const onExpendTree = () => {
    const keys = states.menuData.map((item) => item.id);
    setExpandedKeys(states.isExpend ? [] : keys);
    dispatch({
      type: "expend",
    });
  };

  const onCheckBatch = () => {
    const keys = states.menuData.map((item) => item.id);
    setCheckedKeys(states.isCheck ? [] : keys);
    dispatch({
      type: "check",
    });
  };

  const onSearchMenu = (keyword) => {
    getAllMenus({ title: keyword });
  };

  const onSearch = (value) => {
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
    dispatch({ type: "action", bool: bool });
    dispatch({
      type: "open",
    });
    setRecord(record);
  };
  const onClose = () => {
    dispatch({
      type: "open",
    });
  };

  const onFinish = () => {
    formRef?.current?.form
      .validateFields()
      .then(async (values) => {
        if (action) {
          const res = await clientPost("role", values);
          if (res.status) {
            getData();
            dispatch({
              type: "open",
            });
          }
        } else {
          const res = await clientPut("role", { ...values, id: record.id });
          if (res.status) {
            getData();
            dispatch({
              type: "open",
            });
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch({
        type: "selectedRows",
        selectedRows: selectedRows,
      });
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const rowSelectionAdmin = {
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch({
        type: "selectedRowsAdmin",
        selectedRowsAdmin: selectedRows,
      });
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
      open: states.modalOpen,
      width: "50%",
      content: (
        <Flex vertical gap="middle">
          <Space size="middle">
            <Search
              placeholder="搜索用户"
              loading={states.loadingAdmin}
              allowClear
              onSearch={onSearchAdmin}
            />
          </Space>
          <Table
            rowSelection={{
              ...rowSelectionAdmin,
            }}
            rowKey={(record) => record.id}
            dataSource={states.dataSourceAdmin.list}
            columns={adminColumns}
            loading={states.loadingAdmin}
            pagination={
              states.dataSourceAdmin.list.length > 0 && {
                position: ["bottomCenter"],
                showSizeChanger: true,
                showQuickJumper: true,
                onChange: onPaginationChange,
                onShowSizeChange: onShowSizeChange,
                pageSize: states.dataSourceAdmin.pageSize, // 每页显示记录数
                current: states.dataSourceAdmin.current, // 当前页码
                total: states.dataSourceAdmin.total, // 总记录数
              }
            }
          />
        </Flex>
      ),
      onOk() {
        dispatch({
          type: "action",
          bool: false,
        });
      },
      onCancel() {
        dispatch({
          type: "action",
          bool: false,
        });
      },
    });
  };

  const showAccessDrawer = () => {
    dispatch({
      type: "openAccess",
    });
  };

  const onFinishAccess = () => {
    dispatch({
      type: "openAccess",
    });
  };

  const onCloseAccess = () => {
    dispatch({
      type: "openAccess",
    });
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

  const onConfirm = async (record) => {
    const res = await clientDel("role", { ids: record.id });
    if (res.status) {
      getData();
    }
  };

  const onCancel = () => {};

  const {
    action,
    dataSource,
    selectedRows,
    open,
    openAccess,
    isCheck,
    isExpend,
    loading,
    loadingMenu,
    treeData,
  } = states;

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
          dataSource={dataSource.list}
          columns={columns}
          loading={loading}
          pagination={
            dataSource.length > 0 && {
              position: ["bottomCenter"],
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: onPaginationChange,
              onShowSizeChange: onShowSizeChange,
              pageSize: dataSource.pageSize, // 每页显示记录数
              current: dataSource.current, // 当前页码
              total: dataSource.total, // 总记录数
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
            <Button
              icon={isCheck ? <BorderOutlined /> : <CheckSquareOutlined />}
              onClick={onCheckBatch}
            >
              {isCheck ? "全不选" : "全选"}
            </Button>
            <Button icon={<ControlOutlined />} onClick={onExpendTree}>
              {isExpend ? "收起" : "展开"}
            </Button>
            <Search
              placeholder="搜索菜单"
              loading={loadingMenu}
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
