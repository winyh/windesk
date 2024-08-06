import React, { useState, useRef } from "react";
import {
  EditOutlined,
  DesktopOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
  DiffOutlined,
  ExportOutlined,
  TagOutlined,
  PlusOutlined,
  ImportOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Flex,
  Pagination,
  Dropdown,
  Space,
  Button,
  Input,
  Segmented,
  Tooltip,
  Badge,
  Typography,
  Drawer,
  App,
  Upload,
  Alert,
} from "antd";
import SuperForm from "@/component/SuperForm";
import appLogo from "@/assets/react.svg";

const { Paragraph, Text } = Typography;
const { Dragger } = Upload;
const { Search } = Input;

const Application = () => {
  const formRef = useRef();
  const [appType, setAppType] = useState("create");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(true);
  const [record, setRecord] = useState({});
  const { message, modal } = App.useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

  const props = {
    name: "file",
    multiple: false,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const appItems = [
    {
      id: "1",
      application_name: "应用A",
      description:
        "这是应用描述这是应用描述这是应用描述这是应用描述这是应用描述这是应用描述这是应用描述这是应用描述这是应用描述",
      logo: appLogo,
      isDefault: true,
    },
    {
      id: "2",
      application_name: "应用B",
      description: "这是应用描述这是应用描述",
      logo: appLogo,
    },
    {
      id: "3",
      application_name: "应用C",
      description:
        "这是应用描述这是应用描述这是应用描述这是应用描述这是应用描述这是应用描述",
      logo: appLogo,
    },
    {
      id: "4",
      application_name: "应用D",
      description:
        "这是应用描述这是应用描述这是应用描述这是应用描述这是应用描述这是应用描述",
      logo: appLogo,
    },
    {
      id: "5",
      application_name: "应用E",
      description:
        "这是应用描述这是应用描述这是应用描述这是应用描述这是应用描述这是应用描述",
      logo: appLogo,
    },
    {
      id: "6",
      application_name: "应用F",
      description:
        "这是应用描述这是应用描述这是应用描述这是应用描述这是应用描述这是应用描述",
      logo: appLogo,
    },
    {
      id: "7",
      application_name: "应用G",
      description:
        "这是应用描述这是应用描述这是应用描述这是应用描述这是应用描述这是应用描述",
      logo: appLogo,
    },
  ];

  const formData = [
    {
      label: "应用名称",
      name: "application_name",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入应用名称",
    },
    {
      label: "应用描述",
      name: "description",
      is: "Input.TextArea",
      itemSpan: 24,
      placeholder: "请输入应用描述",
    },
    {
      label: "应用域名",
      name: "domain",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入自定义域名",
    },
    {
      label: "数据库源",
      name: "database",
      is: "Select",
      itemSpan: 24,
      placeholder: "请选择数据库",
    },
    {
      label: "数据库名",
      name: "database",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入数据库名",
    },
    {
      label: "密码",
      name: "database",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入数据库密码",
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

  const onAppConfig = (item) => {
    console.log(item);
  };

  const onAppExport = (item) => {
    console.log(item);
  };

  const onAppCopy = (item) => {
    console.log(item);
  };

  const onAppDefault = (item) => {
    console.log(item);
  };

  const onAppDetete = (item) => {
    console.log(item);
  };

  const actionMore = (item) => {
    return [
      {
        key: "edit",
        label: "应用配置",
        icon: <SettingOutlined />,
        onClick: () => onAppConfig(item),
      },
      {
        type: "divider",
      },
      {
        key: "export",
        label: "应用导出",
        icon: <ExportOutlined />,
        onClick: () => onAppExport(item),
      },
      {
        type: "divider",
      },
      {
        key: "copy",
        label: "应用复制",
        icon: <DiffOutlined />,
        onClick: () => onAppCopy(item),
      },
      {
        type: "divider",
      },
      {
        key: "default",
        label: "设为默认",
        icon: <TagOutlined />,
        onClick: () => onAppDefault(item),
      },
      {
        type: "divider",
      },
      {
        key: "3",
        label: "应用删除",
        icon: <DeleteOutlined />,
        onClick: () => onAppDetete(item),
        danger: true,
      },
    ];
  };

  const actions = (item) => {
    return [
      <Tooltip key="design" title="应用设计">
        <DesktopOutlined />
      </Tooltip>,
      <Tooltip key="setting" title="应用修改">
        <EditOutlined onClick={() => showDrawer(false, item)} />
      </Tooltip>,
      <Dropdown
        key="ellipsis"
        menu={{
          items: actionMore(item),
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <EllipsisOutlined />
        </a>
      </Dropdown>,
    ];
  };

  const showModal = () => {
    modal.confirm({
      title: "导入应用",
      closable: true,
      maskClosable: true,
      icon: <span></span>,
      open: isModalOpen,
      width: "50%",
      content: (
        <Flex gap="middle" vertical>
          <Alert message="仅支持winbase格式文件导入" type="success" />
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖动文件到此区域上传</p>
            <p className="ant-upload-hint">可支持单应用或多应用文件同时导入</p>
          </Dragger>
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

  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  const onSearch = (keyword) => {
    console.log(keyword);
    setSearchLoading(false);
  };

  const onSegmentedChange = (key) => {
    console.log({ key });
    setAppType(key);
  };

  return (
    <Flex justify="space-between" vertical style={{ height: "100%" }}>
      <Flex vertical gap="middle">
        <Space size="middle">
          <Button icon={<PlusOutlined />} onClick={showDrawer}>
            新建应用
          </Button>
          <Button icon={<ImportOutlined />} onClick={showModal}>
            导入应用
          </Button>
          <Segmented
            options={[
              {
                label: "我创建的",
                value: "create",
              },
              {
                label: "我加入的",
                value: "join",
              },
            ]}
            value={appType}
            onChange={onSegmentedChange}
          />
          <Search
            placeholder="搜索应用名称"
            loading={searchLoading}
            onSearch={onSearch}
          />
        </Space>
        <Flex gap="middle" align="start" wrap>
          {appItems.map((item) => {
            const child = (
              <Card
                title={item.application_name}
                loading={loading}
                actions={actions(item)}
                key={item.id}
                style={{
                  width: 360,
                }}
              >
                <Card.Meta
                  avatar={<img src={item.logo} />}
                  description={
                    <Paragraph
                      ellipsis={{
                        rows: 4,
                        expandable: false,
                      }}
                      style={{ minHeight: 80 }}
                    >
                      {item.description}
                    </Paragraph>
                  }
                />
              </Card>
            );
            if (item.isDefault) {
              return (
                <Badge.Ribbon text="默认" key={item.id}>
                  {child}
                </Badge.Ribbon>
              );
            } else {
              return child;
            }
          })}
        </Flex>
      </Flex>

      <Flex justify="center">
        <Pagination
          showQuickJumper
          defaultCurrent={2}
          total={500}
          onChange={onChange}
        />
      </Flex>

      <Drawer
        title={`${action ? "新增" : "编辑"}应用`}
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

export default Application;
