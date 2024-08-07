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

const { Search } = Input;

const Organization = () => {
  const formRef = useRef();
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      organization_name: "全栈科技",
      organization_code: "OZ001",
      description: "低代码系统",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(true);
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

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const formData = [
    {
      label: "组织名称",
      name: "organization_name",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入组织名称",
    },
    {
      label: "组织编码",
      name: "organization_code",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入联系方式",
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
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入上级组织",
    },
    {
      label: "负责人",
      name: "leader",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入负责人",
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
      options: [],
      is: "Select",
    },
  ];

  const columns = [
    {
      title: "组织名称",
      dataIndex: "organization_name",
      key: "organization_name",
    },
    {
      title: "组织编码",
      dataIndex: "organization_code",
      key: "organization_code",
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
      dataIndex: "leader",
      key: "leader",
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
            onClick={() => showDrawer(false, record)}
          >
            新增子组织
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="系统提醒"
            description="您确认要删除组织吗?"
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
            organization: ["bottomCenter"],
            showSizeChanger: true,
            showQuickJumper: true,
            onShowSizeChange: { onShowSizeChange },
            defaultCurrent: 3,
            total: 500,
          }}
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
