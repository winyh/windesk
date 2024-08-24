import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Table,
  Space,
  Input,
  Button,
  Divider,
  Drawer,
  Popconfirm,
  Alert,
  Steps,
} from "antd";
import {
  PlusOutlined,
  LoadingOutlined,
  CloudServerOutlined,
  BorderlessTableOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import SuperForm from "@/component/SuperForm";

const { Search } = Input;

const Page = () => {
  const formRef = useRef();
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [record, setRecord] = useState({});

  const onSearch = () => {};

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

  const onConfirm = () => {};

  const onCancel = () => {};

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const formData = [
    {
      label: "页面名称",
      name: "tenant_name",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入页面名称",
    },
    {
      label: "标识",
      name: "uuid",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入标识",
    },
  ];

  const dataSource = [
    {
      key: "1",
      name: "第一个页面",
      uuid: "dkla",
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "第二个页面",
      uuid: "lflf",
      address: "西湖区湖底公园1号",
    },
  ];

  const ENGINE_HOST = import.meta.env.VITE_WIN_ENGINE_HOST;

  const columns = [
    {
      title: "页面名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "标识",
      dataIndex: "uuid",
      key: "uuid",
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "修改时间",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "最近修改人",
      dataIndex: "updated_user",
      key: "updated_user",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        console.log({ record });
        return (
          <Space>
            <Link
              to={`${ENGINE_HOST}/app/2/page/${record.uuid}/design`}
              target="_blank"
            >
              设计
            </Link>
            <Divider type="vertical" />
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
              onConfirm={onConfirm}
              onCancel={onCancel}
            >
              <Button type="text" size="small" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Flex gap={24} vertical>
      <Space>
        <Button icon={<PlusOutlined />} onClick={() => showDrawer(true)}>
          新建页面
        </Button>
        <Search
          placeholder="搜索页面"
          loading={searchLoading}
          onSearch={onSearch}
        />
      </Space>
      <Table dataSource={dataSource} columns={columns} />
      <Drawer
        width={420}
        title={`${action ? "新增" : "编辑"}页面`}
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

        <Flex vertical gap={24}>
          <Alert
            description="页面标识用于导航中定位和跳转，建议使用有意义的名称，由数字和字母组成"
            type="info"
          ></Alert>

          <Steps
            size="small"
            items={[
              {
                title: "HOST",
                status: "finish",
                description: "https://xxx.com",
                icon: <CloudServerOutlined />,
              },
              {
                title: "APP_ID",
                status: "finish",
                description: "base",
                icon: <FontColorsOutlined />,
              },
              {
                title: "页面标识",
                status: "finish",
                description: "#/8luil",
                icon: <BorderlessTableOutlined />,
              },
            ]}
          />
        </Flex>
      </Drawer>
    </Flex>
  );
};

export default Page;
