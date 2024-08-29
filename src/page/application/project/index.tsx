import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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
  PushpinOutlined,
} from "@ant-design/icons";
import {
  Empty,
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
  Popconfirm,
} from "antd";
import SuperForm from "@/component/SuperForm";
import { clientPost, clientPut, clientDel, clientGetList } from "@/request";
import appLogo from "@/assets/react.svg";

const { Paragraph, Text } = Typography;
const { Dragger } = Upload;
const { Search } = Input;

const Project = () => {
  const formRef = useRef();
  const [appType, setAppType] = useState("create");
  const [action, setAction] = useState(true);
  const [record, setRecord] = useState({});
  const { message, modal } = App.useApp();
  const [appItems, setAppItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
    clientGetList("application", {
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
          setAppItems(list);
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

  const showDrawer = (bool, record) => {
    setAction(bool);
    setOpen(true);
    setRecord(record);
  };

  const onDesign = (item) => {
    console.log({ item });
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = () => {
    formRef?.current?.form
      .validateFields()
      .then(async (values) => {
        if (action) {
          const res = await clientPost("application", values);
          if (res.status) {
            getData();
            setOpen(false);
          }
        } else {
          const res = await clientPut("application", {
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

  const formData = [
    {
      label: "项目名称",
      name: "name",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入项目名称",
    },
    {
      label: "项目描述",
      name: "description",
      is: "Input.TextArea",
      itemSpan: 24,
      placeholder: "请输入项目描述",
    },
    {
      label: "项目标识",
      name: "app_code",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入项目标识",
    },
    {
      label: "项目域名",
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
      options: [],
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

  const onAppDetete = async (item) => {
    console.log(item);
    const res = await clientDel("application", { ids: item.id });
    if (res.status) {
      getData();
      console.log({ res });
    }
  };

  const actionMore = (item) => {
    return [
      {
        key: "edit",
        label: "项目配置",
        icon: <SettingOutlined />,
        onClick: () => onAppConfig(item),
      },
      {
        type: "divider",
      },
      {
        key: "export",
        label: "项目导出",
        icon: <ExportOutlined />,
        onClick: () => onAppExport(item),
      },
      {
        type: "divider",
      },
      {
        key: "copy",
        label: "项目复制",
        icon: <DiffOutlined />,
        onClick: () => onAppCopy(item),
      },
      {
        type: "divider",
      },
      {
        key: "default",
        label: "设为默认",
        icon: <PushpinOutlined />,
        onClick: () => onAppDefault(item),
      },
      {
        type: "divider",
      },
      {
        key: "3",
        label: (
          <Popconfirm
            title="系统提醒"
            description="您确认要删除项目吗?"
            onConfirm={() => onAppDetete(item)}
            okText="确认"
            cancelText="取消"
          >
            项目删除
          </Popconfirm>
        ),
        icon: <DeleteOutlined />,
        danger: true,
      },
    ];
  };

  const actions = (item) => {
    return [
      <Tooltip key="design" title="项目设计">
        <DesktopOutlined onClick={() => onDesign(item)} />
      </Tooltip>,
      <Tooltip key="setting" title="项目修改">
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
      title: "导入项目",
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
            <p className="ant-upload-hint">可支持单项目或多项目文件同时导入</p>
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

  const onSegmentedChange = (key) => {
    console.log({ key });
    setAppType(key);
  };

  return (
    <Flex justify="space-between" vertical style={{ height: "100%" }}>
      <Flex vertical gap="middle">
        <Space size="middle">
          <Button icon={<PlusOutlined />} onClick={() => showDrawer(true)}>
            新建项目
          </Button>
          <Button icon={<ImportOutlined />} onClick={showModal}>
            导入项目
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
            placeholder="搜索项目名称"
            loading={loading}
            onSearch={onSearch}
          />
        </Space>
        <Flex gap="middle" align="start" wrap>
          {appItems.map((item) => {
            const child = (
              <Card
                title={item.name}
                loading={loading}
                actions={actions(item)}
                key={item.id}
                style={{
                  width: 360,
                }}
                extra={
                  <Badge
                    status={item.status === "1" ? "processing" : "default"}
                    text={item?.status === "1" ? "启用" : "禁用"}
                  ></Badge>
                }
              >
                <Link to={`/app/${item.id}/dashboard`}>
                  <Card.Meta
                    avatar={<img src={item.logo || appLogo} />}
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
                </Link>
              </Card>
            );
            if (item.isDefault === "1") {
              return (
                <Badge.Ribbon text={<PushpinOutlined />} key={item.id}>
                  {child}
                </Badge.Ribbon>
              );
            } else {
              return child;
            }
          })}
        </Flex>
      </Flex>

      {appItems.length === 0 && (
        <Flex justify="center">
          <Empty />
        </Flex>
      )}

      <Flex justify="center">
        <Pagination
          showQuickJumper
          current={paginationMeta.current}
          total={paginationMeta.total}
          onChange={onChange}
        />
      </Flex>

      <Drawer
        title={`${action ? "新增" : "编辑"}项目`}
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
    </Flex>
  );
};

export default Project;
