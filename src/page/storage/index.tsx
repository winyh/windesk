import { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Space,
  Flex,
  Input,
  Popconfirm,
  Select,
  Divider,
  Drawer,
  App,
  Upload,
  Card,
  Checkbox,
  Image,
  Row,
  Col,
  Descriptions,
  Form,
} from "antd";
import {
  FolderOpenOutlined,
  UploadOutlined,
  PlusOutlined,
  InboxOutlined,
  EditOutlined,
  DeleteOutlined,
  SwapOutlined,
  ScissorOutlined,
} from "@ant-design/icons";
import SuperForm from "@/component/SuperForm";

const { Search } = Input;
const { Dragger } = Upload;
const { Meta } = Card;

const Storage = () => {
  const formRef = useRef();
  const [form] = Form.useForm();
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState({});
  const [folders, setFolders] = useState(["文件夹A", "文件夹B"]);
  const { message, modal } = App.useApp();

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const props = {
    name: "file",
    multiple: true,
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
      label: "文件夹名称",
      name: "folder_name",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入文件夹名称",
    },
    {
      label: "路径",
      name: "pid",
      options: [],
      is: "Select",
      itemSpan: 24,
      placeholder: "请选择文件夹路径",
    },
  ];

  const imgs = [
    {
      id: "1",
      title: "文件名",
      description: "描述信息",
      url: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
      id: "2",
      title: "文件名",
      description: "描述信息",
      url: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
  ];

  const imgActions = (item) => {
    return [
      <Checkbox key="check"></Checkbox>,
      <EditOutlined key="edit" onClick={showImgEditModal} />,
      <Popconfirm
        key="delete"
        title="系统提醒"
        description="您确认要删除该文件吗?"
        onConfirm={onConfirm}
        onCancel={onCancel}
        okText="确认"
        cancelText="取消"
      >
        <DeleteOutlined key="delete" />
      </Popconfirm>,
    ];
  };

  const showModal = () => {
    modal.confirm({
      title: "文件上传",
      closable: true,
      maskClosable: true,
      icon: <span></span>,
      open: isModalOpen,
      width: "50%",
      content: (
        <Flex gap="middle" vertical>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖动文件到此区域上传</p>
            <p className="ant-upload-hint">可支持单应用或多应用文件同时导入</p>
          </Dragger>

          <Flex gap="middle">
            {imgs.map((item) => {
              return (
                <Card
                  style={{
                    width: 200,
                  }}
                  cover={<Image alt="example" src={item.url} />}
                  actions={imgActions(item)}
                >
                  <Meta description={item.description} />
                </Card>
              );
            })}
          </Flex>
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

  const showImgEditModal = () => {
    modal.confirm({
      title: "文件编辑",
      closable: true,
      maskClosable: true,
      icon: <span></span>,
      open: isModalOpen,
      width: "50%",
      content: (
        <Row gutter={48}>
          <Col span={8}>
            <Flex gap={24} vertical align="center">
              <Image
                alt="example"
                height="100%"
                width="100%"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
              <Space>
                <Button type="text" icon={<SwapOutlined />}>
                  文件替换
                </Button>
                <Button type="text" icon={<ScissorOutlined />}>
                  文件剪裁
                </Button>
              </Space>
            </Flex>
          </Col>
          <Col span={16}>
            <Flex vertical gap="middle">
              <Descriptions title="基本信息" column={2}>
                <Descriptions.Item label="文件名">文件.jpg</Descriptions.Item>
                <Descriptions.Item label="大小">270KB</Descriptions.Item>
                <Descriptions.Item label="后缀">.jpg</Descriptions.Item>
                <Descriptions.Item label="文件描述">描述信息</Descriptions.Item>
                <Descriptions.Item label="文件分类">商品主图</Descriptions.Item>
                <Descriptions.Item label="创建日期">
                  2024-05-08 18:00:22
                </Descriptions.Item>
              </Descriptions>

              <Form layout="vertical" form={form}>
                <Form.Item label="文件名">
                  <Input placeholder="请输入文件名" />
                </Form.Item>
                <Form.Item label="文件分类">
                  <Input placeholder="请输入文件分类" />
                </Form.Item>
                <Form.Item label="Alt">
                  <Input placeholder="请输入文件占位符" />
                </Form.Item>
                <Form.Item label="文件描述">
                  <Input.TextArea placeholder="请输入文件描述" />
                </Form.Item>
                <Form.Item label="存储路径">
                  <Select placeholder="请选择存储路径" />
                </Form.Item>
              </Form>
            </Flex>
          </Col>
        </Row>
      ),
      onOk() {
        setIsModalOpen(false);
      },
      onCancel() {
        setIsModalOpen(false);
      },
    });
  };

  const dataSource = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];

  const columns = [
    {
      title: "文件名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "文件ID",
      dataIndex: "hash",
      key: "hash",
    },
    {
      title: "文件后缀",
      dataIndex: "suffix",
      key: "suffix",
    },
    {
      title: "大小",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
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

  const onSearch = () => {};

  const onConfirm = () => {};

  const onCancel = () => {};

  const addFolder = () => {};

  const childFolders = [
    {
      id: "1",
      folder_name: "子文件夹A-A",
    },
    {
      id: "2",
      folder_name: "子文件夹A-B",
    },
  ];

  return (
    <Flex vertical gap="middle">
      <Flex gap="middle" align="center">
        <Select
          showSearch
          style={{
            width: 110,
          }}
          defaultValue="文件夹A"
          placeholder="请选择文件夹"
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider
                style={{
                  margin: "8px 0",
                }}
              />
              <Button
                type="text"
                block
                icon={<PlusOutlined />}
                onClick={showDrawer}
              >
                新建文件夹
              </Button>
            </>
          )}
          options={folders.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <Button icon={<PlusOutlined />} type="dashed" onClick={showDrawer}>
          新建子文件夹
        </Button>
        {childFolders.map((item) => (
          <Button
            key={item.id}
            icon={<FolderOpenOutlined />}
            type="text"
            onClick={() => showDrawer(false, item)}
          >
            {item.folder_name}
          </Button>
        ))}
      </Flex>

      <Space size="middle">
        <Button icon={<UploadOutlined />} onClick={showModal}>
          文件上传
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
          placeholder="搜索文件"
          onSearch={onSearch}
          loading={searchLoading}
        />
      </Space>

      <Table
        rowSelection={{
          ...rowSelection,
        }}
        rowKey={(record) => record.key}
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

      <Drawer
        title={`${action ? "新增" : "编辑"}文件夹`}
        onClose={onClose}
        open={open}
        footer={
          <Flex justify="flex-end">
            <Space>
              <Popconfirm
                title="系统提醒"
                description="您确认要删除租户吗?"
                onConfirm={onConfirm}
                onCancel={onCancel}
                okText="确认"
                cancelText="取消"
              >
                <Button onClick={onClose} danger>
                  删除
                </Button>
              </Popconfirm>
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

export default Storage;
