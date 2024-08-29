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
  Tree,
  Drawer,
  Popconfirm,
  App,
} from "antd";
import {
  PlusOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  KeyOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import SuperForm from "@/component/SuperForm";
import dayjs from "dayjs";
import { clientPost, clientPut, clientDel, clientGetList } from "@/request";

const { Search } = Input;
const { DirectoryTree } = Tree;

const Role = () => {
  const formRef = useRef();
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      role_name: "管理员",
      role_code: "R0001",
      description: "可以管理系统",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paginationMeta, setPaginationMeta] = useState({
    pageSize: 10,
    current: 1,
    total: 10,
  });
  const [record, setRecord] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const { modal } = App.useApp();

  useEffect(() => {
    getData({
      current: 1,
      pageSize: 10,
    });
  }, []);

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

  const menuItems = [
    {
      label: "分配用户",
      key: "1",
      icon: <UserAddOutlined />,
      onClick: () => {
        showModal();
      },
    },
    {
      label: "删除角色",
      key: "delete",
      icon: <DeleteOutlined />,
      danger: true,
      disabled: true,
    },
  ];

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const onSelect = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };
  const onExpand = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  const treeData = [
    {
      title: "控制台",
      key: "0-0",
      children: [
        {
          title: "leaf 0-0",
          key: "0-0-0",
          isLeaf: true,
        },
        {
          title: "leaf 0-1",
          key: "0-0-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "租户管理",
      key: "0-1",
      children: [
        {
          title: "leaf 1-0",
          key: "0-1-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-1-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "应用管理",
      key: "0-2",
      children: [
        {
          title: "leaf 1-0",
          key: "0-2-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-2-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "数据库",
      key: "0-3",
      children: [
        {
          title: "leaf 1-0",
          key: "0-3-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-3-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "云函数",
      key: "0-4",
      children: [
        {
          title: "leaf 1-0",
          key: "0-3-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-3-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "文件存储",
      key: "0-5",
      children: [
        {
          title: "leaf 1-0",
          key: "0-3-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-3-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "AI助手",
      key: "0-6",
      children: [
        {
          title: "leaf 1-0",
          key: "0-3-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-3-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "分析监控",
      key: "0-7",
      children: [
        {
          title: "leaf 1-0",
          key: "0-3-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-3-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "权限管理",
      key: "0-8",
      children: [
        {
          title: "leaf 1-0",
          key: "0-3-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-3-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "系统配置",
      key: "0-9",
      children: [
        {
          title: "leaf 1-0",
          key: "0-3-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-3-1",
          isLeaf: true,
        },
      ],
    },
  ];

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
      options: [],
      is: "Select",
    },
    {
      label: "分配权限", // 单独封装一个组件-加入全选/不选-展开/收起按钮
      name: "auth",
      itemSpan: 24,
      is: "Tree.DirectoryTree",
      multiple: true,
      defaultExpandAll: true,
      treeData: treeData,
      onSelect: onSelect,
      onExpand: onExpand,
    },
  ];

  const showModal = () => {
    modal.confirm({
      title: "用户列表",
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
      render: () => {
        return <Badge status="processing" text="启用" />;
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
            分配用户
          </Button>
          <Divider type="vertical" />

          <Popconfirm
            title="系统提醒"
            description="您确认要删除岗位吗?"
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
            onChange: onPaginationChange,
            onShowSizeChange: onShowSizeChange,
            pageSize: paginationMeta.pageSize, // 每页显示记录数
            current: paginationMeta.current, // 当前页码
            total: paginationMeta.total, // 总记录数
          }}
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
    </>
  );
};

export default Role;
