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
import { PlusOutlined } from "@ant-design/icons";
import SuperForm from "@/component/SuperForm";
import dayjs from "dayjs";

const { Search } = Input;

const Position = () => {
  const formRef = useRef();
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      position_name: "财务总监",
      position_code: "CS001",
      description: "管理全体系财务",
    },
  ]);
  const [open, setOpen] = useState(false);
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

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const formData = [
    {
      label: "岗位名称",
      name: "position_name",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入岗位名称",
    },
    {
      label: "岗位编码",
      name: "position_code",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入联系方式",
    },
    {
      label: "岗位描述",
      name: "description",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入岗位描述",
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

  const showModal = () => {
    modal.confirm({
      title: "岗位详情",
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
      title: "岗位名称",
      dataIndex: "position_name",
      key: "position_name",
    },
    {
      title: "岗位编码",
      dataIndex: "position_code",
      key: "position_code",
    },
    {
      title: "岗位描述",
      dataIndex: "description",
      key: "description",
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

  const onConfirm = () => {};

  const onCancel = () => {};

  return (
    <>
      <Flex vertical gap="middle">
        <Space size="middle">
          <Button icon={<PlusOutlined />} onClick={() => showDrawer(true)}>
            新增岗位
          </Button>
          {selectedRows.length > 0 ? (
            <Popconfirm
              title="系统提醒"
              description="您确认要删除岗位吗?"
              onConfirm={onConfirm}
              onCancel={onCancel}
              okText="确认"
              cancelText="取消"
            >
              <Button danger>批量删除</Button>
            </Popconfirm>
          ) : null}
          <Search
            placeholder="搜索岗位"
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
        title={`${action ? "新增" : "编辑"}岗位`}
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
          limit={6}
          initialValues={record}
          rulesValid={false}
          btnAction={false}
        ></SuperForm>
      </Drawer>
    </>
  );
};

export default Position;
