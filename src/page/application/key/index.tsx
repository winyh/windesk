import { useState, useRef, useEffect } from "react";
import { Button, Table, Flex, Space, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SuperForm from "@/component/SuperForm";
import { clientPost, clientPut, clientDel, clientGetList } from "@/request";

const ApiKey = () => {
  const [open, setOpen] = useState(false);
  const formRef = useRef();
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "应用KEY",
      token: "HSHJK-KKDALADLD-KADDKD-JSAJDKAD-JASJKDKAK",
      limit: "60次 / 秒",
      create_at: "2023-01-01",
      expire: "2025-01-01",
      status: "正常",
    },
    {
      key: "2",
      name: "应用KEY",
      token: "HKDJJ-JSAJJAJSSA-KADDKD-DKDKDLAU-JASJKDKAK",
      limit: "60次 / 秒",
      create_at: "2023-01-01",
      expire: "2025-01-01",
      status: "正常",
    },
  ]);
  const [action, setAction] = useState(true);
  const [record, setRecord] = useState({});
  const [loading, setLoading] = useState(false);
  const [keyList, setKeyList] = useState([]);
  const [paginationMeta, setPaginationMeta] = useState({
    pageSize: 10,
    current: 1,
    total: 10,
  });

  useEffect(() => {
    getData({
      current: 1,
      pageSize: 10,
    });
  }, []);

  const getData = (params = {}) => {
    setLoading(true);
    const { current, pageSize } = paginationMeta;
    clientGetList("key", {
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
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "KEY",
      dataIndex: "token",
      key: "token",
    },
    {
      title: "限流",
      dataIndex: "limit",
      key: "limit",
    },
    {
      title: "生成时间",
      dataIndex: "create_at",
      key: "create_at",
    },
    {
      title: "有效期",
      dataIndex: "expire",
      key: "expire",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <Button type="text" danger>
            删除
          </Button>
        );
      },
    },
  ];

  const onPaginationChange = (current, pageSize) => {
    setPaginationMeta((pre) => ({ ...pre, current, pageSize }));
    getData({ current, pageSize });
  };

  const onShowSizeChange = (current, pageSize) => {
    setPaginationMeta((pre) => ({ ...pre, current, pageSize }));
    getData({ current, pageSize });
  };

  return (
    <Flex vertical gap={12}>
      <Flex align="center">
        <Space>
          <Button icon={<PlusOutlined />}>创建KEY</Button>
          <div>
            分为租户KEY可以通过接口管理整个后台-应用KEY 可以管理单个应用
          </div>
        </Space>
      </Flex>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={
          dataSource.length > paginationMeta.pageSize && {
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
    </Flex>
  );
};

export default ApiKey;
