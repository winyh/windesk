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
  Drawer,
  Popconfirm,
  App,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SuperForm from "@/component/SuperForm";
import dayjs from "dayjs";
import { clientPost, clientPut, clientDel, clientGetList } from "@/request";

const { Search } = Input;

const Tenant = () => {
  const formRef = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(true);
  const [loading, setLoading] = useState(false);
  const [paginationMeta, setPaginationMeta] = useState({
    pageSize: 10,
    current: 1,
    total: 10,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    clientGetList("tenant", {
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
          const res = await clientPost("tenant", values);
          if (res.status) {
            getData();
            setOpen(false);
          }
        } else {
          const res = await clientPut("tenant", { ...values, id: record.id });
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
      label: "租户名称",
      name: "name",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入租户名称",
    },
    {
      label: "租户描述",
      name: "description",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入租户描述",
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
      label: "到期时间",
      name: "expired_at",
      is: "DatePicker",
      itemSpan: 24,
      style: { width: "100%" },
      placeholder: "请录入到期时间",
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
      title: "租户名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "租户描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "联系人",
      dataIndex: "contacts",
      key: "contacts",
    },
    {
      title: "联系方式",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "应用数",
      dataIndex: "app_num",
      key: "app_num",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        return (
          <Badge
            status={Number(text) > 0 ? "processing" : "default"}
            text={Number(text) > 0 ? "启用" : "禁用"}
          />
        );
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
      dataIndex: "expired_at",
      key: "expired_at",
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
          <Popconfirm
            title="系统提醒"
            description="您确认要删除租户吗?"
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
          <Search
            placeholder="搜索租户"
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
        title={`${action ? "新增" : "编辑"}租户`}
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

export default Tenant;
