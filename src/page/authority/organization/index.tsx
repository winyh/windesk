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
} from "antd";
import { PlusOutlined, ControlOutlined } from "@ant-design/icons";
import SuperForm from "@/component/SuperForm";
import dayjs from "dayjs";
import { genOptions } from "@/utils";
import {
  clientGetTree,
  clientPost,
  clientPut,
  clientDel,
  clientGetList,
} from "@/request";

const { Search } = Input;

const Organization = () => {
  const formRef = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(true);
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState({});
  const [paginationMeta, setPaginationMeta] = useState({
    pageSize: 10,
    current: 1,
    total: 10,
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [organizationOptions, setOrganizationOptions] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = (params) => {
    clientGetList("organization", {
      current: 1,
      pageSize: 10,
      name: params?.name,
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

  const getTreeData = (params) => {
    clientGetTree("organization", params)
      .then((res) => {
        if (res.status) {
          const data = res.data;
          const tree = genOptions(data);
          setOrganizationOptions(tree);
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

  const showDrawer = async (bool, record, isAddChild) => {
    setAction(bool);
    setOpen(true);
    if (isAddChild) {
      record.pid = record.id;
      setOrganizationOptions([
        {
          label: record.name,
          value: record.id,
        },
      ]);
    } else {
      await getTreeData({
        parent_field: "pid",
        level: 0,
      });
    }
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
          const res = await clientPost("organization", values);
          if (res.status) {
            getData();
            setOpen(false);
          }
        } else {
          const res = await clientPut("organization", {
            ...values,
            id: record.id,
          });
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
      label: "组织名称",
      name: "name",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入组织名称",
    },
    {
      label: "组织编码",
      name: "code",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入组织编码",
    },
    {
      label: "组织描述",
      name: "description",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入组织描述",
    },
    {
      label: "上级组织",
      name: "pid",
      itemSpan: 24,
      style: { width: "100%" },
      placeholder: "请选择上级组织",
      is: "Select",
      options: organizationOptions,
    },
    {
      label: "联系人",
      name: "contacts",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入联系人",
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
      label: "排序",
      name: "sort",
      is: "InputNumber",
      itemSpan: 24,
      style: { width: "100%" },
      placeholder: "请输入排序",
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

  const columns = [
    {
      title: "组织名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "组织编码",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "组织描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "上级组织",
      dataIndex: "pid",
      key: "pid",
    },
    {
      title: "负责人",
      dataIndex: "contacts",
      key: "contacts",
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
      title: "排序",
      dataIndex: "sort",
      key: "sort",
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
          <Button
            type="text"
            size="small"
            onClick={() => showDrawer(false, record, true)}
          >
            新增子组织
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="系统提醒"
            description="您确认要删除组织吗?"
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
    const res = await clientDel("organization", { ids: record.id });
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
            新增组织
          </Button>
          <Button icon={<ControlOutlined />}>展开折叠</Button>
          {selectedRows.length > 0 ? (
            <Popconfirm
              title="系统提醒"
              description="您确认要删除组织吗?"
              onConfirm={onConfirm}
              onCancel={onCancel}
              okText="确认"
              cancelText="取消"
            >
              <Button danger>批量删除</Button>
            </Popconfirm>
          ) : null}
          <Search
            placeholder="搜索组织"
            loading={loading}
            allowClear
            onSearch={onSearch}
          />
        </Space>
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          loading={loading}
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
        title={`${action ? "新增" : "编辑"}组织`}
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

export default Organization;
