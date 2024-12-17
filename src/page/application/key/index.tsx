import { useState, useRef, useEffect } from "react";
import {
  Button,
  Table,
  Flex,
  Space,
  Drawer,
  Popconfirm,
  Badge,
  Divider,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import SuperForm from "@/component/SuperForm";
import { clientPost, clientPut, clientDelete, clientGetList } from "@/request";
import { genAlphabetKey } from "@/utils/index";

const ApiKey = () => {
  const [open, setOpen] = useState(false);
  const formRef = useRef();
  const [action, setAction] = useState(true);
  const [record, setRecord] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageMeta, setPageMeta] = useState({
    list: [],
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
    const { current, pageSize } = pageMeta;
    clientGetList("project", "appkey", {
      current,
      pageSize,
      ...params,
    })
      .then((res) => {
        if (res.status) {
          const { list, total, current, pageSize } = res.data;
          setPageMeta({
            list,
            pageSize,
            current,
            total,
          });
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
    if (record) {
      record.expired_at = dayjs(record?.expired_at);
    }
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
          values.app_key = genAlphabetKey();
          const res = await clientPost("project", "appkey", values);
          if (res.status) {
            getData();
            setOpen(false);
          }
        } else {
          const res = await clientPut("project", "appkey", {
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

  const onDelete = async (record) => {
    const res = await clientDelete("project", "appkey", { ids: record.id });
    if (res.status) {
      getData();
      setOpen(false);
    }
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const formData = [
    {
      label: "KEY名称",
      name: "key_name",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入KEY名称",
    },
    {
      label: "KEY描述",
      name: "description",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入KEY描述",
    },
    {
      label: "SECRET",
      name: "app_secret",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入密钥",
    },
    {
      label: "限流",
      name: "rate",
      is: "InputNumber",
      itemSpan: 24,
      style: { width: "100%" },
      placeholder: "请输入限流次数 N 次/秒",
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

  const columns = [
    {
      title: "名称",
      dataIndex: "key_name",
      key: "key_name",
    },
    {
      title: "KEY",
      dataIndex: "app_key",
      key: "app_key",
    },
    {
      title: "SECRET",
      dataIndex: "app_secret",
      key: "app_secret",
    },
    {
      title: "限流",
      dataIndex: "rate",
      key: "rate",
      render: (text) => `${text} 次/秒`,
    },
    {
      title: "生成时间",
      dataIndex: "create_at",
      key: "create_at",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "有效期",
      dataIndex: "expired_at",
      key: "expired_at",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
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
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button
            type="text"
            size="small"
            onClick={() => showDrawer(false, record)}
          >
            修改
          </Button>
          <Divider type="vertical" />

          <Popconfirm
            title="系统提醒"
            description="您确定要删除当前页面吗?"
            onConfirm={() => onDelete(record)}
          >
            <Button type="text" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onPaginationChange = (current, pageSize) => {
    setPageMeta((pre) => ({ ...pre, current, pageSize }));
    getData({ current, pageSize });
  };

  const onShowSizeChange = (current, pageSize) => {
    setPageMeta((pre) => ({ ...pre, current, pageSize }));
    getData({ current, pageSize });
  };

  return (
    <Flex vertical gap={12}>
      <Flex align="center">
        <Button icon={<PlusOutlined />} onClick={showDrawer}>
          创建KEY
        </Button>
      </Flex>
      <Table
        dataSource={pageMeta.list}
        columns={columns}
        loading={loading}
        pagination={
          pageMeta.list.length > pageMeta.pageSize && {
            position: ["bottomCenter"],
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: onPaginationChange,
            onShowSizeChange: onShowSizeChange,
            pageSize: pageMeta.pageSize, // 每页显示记录数
            current: pageMeta.current, // 当前页码
            total: pageMeta.total, // 总记录数
          }
        }
      />

      <Drawer
        title={`${action ? "新增" : "编辑"}KEY`}
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
          rate={6}
          initialValues={record}
          rulesValid={false}
          btnAction={false}
        ></SuperForm>
      </Drawer>
    </Flex>
  );
};

export default ApiKey;
