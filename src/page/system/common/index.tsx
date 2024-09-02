import { useState, useEffect, useRef } from "react";
import { Card, Flex, Tabs } from "antd";
import SuperForm from "@/component/SuperForm";
import { options } from "node_modules/axios/index.d.cts";

const Common = () => {
  const formRef = useRef();
  const [record, setRecord] = useState({});

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

  const formBasic = [
    {
      label: "应用名称",
      name: "username",
      is: "Input",
      placeholder: "请输入应用名称",
    },
    {
      label: "应用描述",
      name: "description",
      is: "Input",
      placeholder: "请输入用户应用描述",
    },
    {
      label: "备案编号",
      name: "icp",
      is: "Input",
      placeholder: "请输入备案编号",
    },
    {
      label: "所属公司",
      name: "company",
      is: "Input",
      placeholder: "请输入所属公司",
    },
  ];

  const formBase = [
    {
      label: "链接名",
      name: "username",
      is: "Input",
      placeholder: "请输入链接名",
    },
    {
      label: "主机",
      name: "host",
      is: "Input",
      placeholder: "请输入主机",
    },
    {
      label: "端口",
      name: "port",
      is: "Input",
      placeholder: "请输入端口",
    },
    {
      label: "数据库名",
      name: "username",
      is: "Input",
      placeholder: "请输入数据库名",
    },
    {
      label: "用户名",
      name: "username",
      is: "Input",
      placeholder: "请输入用户名",
    },
    {
      label: "密码",
      name: "password",
      is: "Input.Password",
      placeholder: "请输入密码",
    },
  ];

  const formStorage = [
    {
      label: "存储平台",
      name: "platform",
      is: "Select",
      options: [
        {
          label: "本地存储",
          value: "local",
        },
        {
          label: "阿里云",
          value: "ali",
        },
        {
          label: "腾讯云",
          value: "tencent",
        },
        {
          label: "七牛云",
          value: "qiniu",
        },
        {
          label: "华为云",
          value: "huawei",
        },
      ],
      placeholder: "请选择存储平台",
    },
    {
      label: "主机",
      name: "host",
      is: "Input",
      placeholder: "请输入主机",
    },
    {
      label: "端口",
      name: "port",
      is: "Input",
      placeholder: "请输入端口",
    },
    {
      label: "用户名",
      name: "username",
      is: "Input",
      placeholder: "请输入用户名",
    },
    {
      label: "密码",
      name: "password",
      is: "Input.Password",
      placeholder: "请输入密码",
    },
  ];

  const formEmail = [
    {
      label: "发件人邮箱",
      name: "form_email",
      is: "Input",
      placeholder: "请输入发件人邮箱",
    },
    {
      label: "SMTP服务器地址",
      name: "smtp_host",
      is: "Input",
      placeholder: "请输入SMTP服务器地址",
    },
    {
      label: "SMTP服务器端口",
      name: "smtp_port",
      is: "Input",
      placeholder: "请输入SMTP服务器端口",
    },
    {
      label: "SMTP用户名",
      name: "smtp_username",
      is: "Input",
      placeholder: "请输入SMTP用户名",
    },
    {
      label: "SMTP密码",
      name: "smtp_password",
      is: "Input",
      placeholder: "请输入SMTP密码",
    },
  ];

  const formAgent = [
    {
      label: "AI模型",
      name: "agent_platform",
      is: "Select",
      options: [
        {
          label: "GPT4.0",
          value: "key-gpt4",
        },
        {
          label: "Turing",
          value: "key-turing",
        },
        {
          label: "通义千问",
          value: "key-tongyi",
        },
      ],
      placeholder: "请选择AI模型",
    },
    {
      label: "模型KEY",
      name: "agent_key",
      is: "Input",
      placeholder: "请输入模型KEY",
    },
  ];

  const form = (data) => (
    <SuperForm
      ref={formRef}
      data={data}
      layout={layout}
      initialValues={record}
      itemResponsive={{
        xs: {
          span: 24,
        },
        sm: {
          span: 24,
        },
        md: {
          span: 24,
        },
        lg: {
          span: 24,
        },
        xl: {
          span: 24,
        },
        xxl: {
          span: 24,
        },
      }}
      btnText="确定"
    ></SuperForm>
  );

  const tabItems = [
    {
      label: `基本信息`,
      key: "basic",
      children: <div style={{ width: 500 }}>{form(formBasic)}</div>,
    },
    {
      label: `数据库`,
      key: "database",
      children: <div style={{ width: 500 }}>{form(formBase)}</div>,
    },
    {
      label: `云函数`,
      key: "function",
      children: <div style={{ width: 500 }}> {form(formBase)}</div>,
    },
    {
      label: `文件存储`,
      key: "storage",
      children: <div style={{ width: 500 }}>{form(formStorage)}</div>,
    },
    {
      label: `邮件设置`,
      key: "email",
      children: <div style={{ width: 500 }}>{form(formEmail)}</div>,
    },
    {
      label: `智能助手`,
      key: "agent",
      children: <div style={{ width: 500 }}>{form(formAgent)}</div>,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" type="card" items={tabItems} />
    </>
  );
};

export default Common;
