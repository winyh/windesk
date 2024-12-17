import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Flex, Table, Space, Input, Button, Divider, Alert, App } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import SuperForm from "@/component/SuperForm";

import dayjs from "dayjs";

const { Search } = Input;

const Publish = () => {
  const [searchLoading, setSearchLoading] = useState(false);
  const formRef = useRef();
  const { modal } = App.useApp();
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      label: "发布版本",
      name: "version",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入发布版本",
    },
    {
      label: "发布说明",
      name: "description",
      is: "Input.TextArea",
      itemSpan: 24,
      rows: 3,
      placeholder: "请输入发布说明",
    },
  ];

  const dataSource = [
    {
      key: "1",
      version: "V1.0.0",
      status: "DOING",
      description: "1.0.0版本发布线上测试",
    },
    {
      key: "2",
      version: "V1.0.0",
      status: "DONE",
      description: "1.0.0版本发布线上测试",
    },
  ];

  const columns = [
    {
      title: "版本",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "研发状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "发布内容",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "发布时间",
      dataIndex: "created_at",
      key: "created_at",
      render: () => {
        return <span>{dayjs().format("YYYY-MM-DD HH:mm:ss")}</span>;
      },
    },
    {
      title: "操作人",
      dataIndex: "updated_user",
      key: "updated_user",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <Space>
            <Link to="/design">下载</Link>
            {/* <Divider type="vertical" />
            <a href="">停用</a> */}
          </Space>
        );
      },
    },
  ];

  const onPublish = () => {
    modal.confirm({
      title: "发布应用",
      icon: <></>,
      width: "30%",
      content: (
        <Flex gap={24} vertical>
          <Alert
            showIcon={true}
            message="发布线上是直接将日吊版本的内容发布到线上 CDN"
            type="info"
          />
          <SuperForm
            ref={formRef}
            data={formData}
            layout={layout}
            limit={6}
            initialValues={record}
            rulesValid={false}
            btnAction={false}
          ></SuperForm>
        </Flex>
      ),
      onOk: onFinish,
    });
  };

  return (
    <Flex gap={24} vertical>
      <Space>
        <Button icon={<CloudUploadOutlined />} onClick={onPublish}>
          发布线上
        </Button>
        <Button type="text">当前版本：V1.0.0</Button>
      </Space>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <Alert
        message="研发状态说明"
        description={
          <div>
            1.研发状态说明 DOING当前正在研发中的版本 <br />
            2.DONE完成研发。发布线上成功之后会自动变成研发完成状态 <br />
            3.HOLD挂起当前研发。发生在某个回滚操作之后，被回滚的版本会 patch
            位自动加 1 并以此创建新的迭代，同时将当前正在研发的版本挂起
          </div>
        }
        type="info"
      ></Alert>
      <Divider orientation="left" dashed orientationMargin={0}>
        怎么部署到自己的服务器
      </Divider>
      <Space>
        应用发布之后会产出多个静态资源，请按照<a>部署文档</a>进行部署
      </Space>
    </Flex>
  );
};

export default Publish;
