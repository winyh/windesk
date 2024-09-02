import React from "react";
import { Button, Tabs } from "antd";
import SuperForm from "@/component/SuperForm";
import SuperTable from "@/component/SuperTable";
import { useNavigate } from "react-router-dom";
import "./index.less";

const { BASE_URL } = import.meta.env;

const Log = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(`${BASE_URL}dashboard`);
  };

  const onFinish = (values) => {};

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const formOperateData = [
    {
      label: "登录地点",
      name: "name",
      is: "Input",
      placeholder: "请输入角色名称",
    },
    {
      label: "用户名称",
      name: "code",
      is: "Input",
      placeholder: "请输入角色编码",
    },
    {
      label: "浏览器",
      name: "description",
      is: "Input",
      placeholder: "请输入角色描述",
    },
  ];

  const operateColumns = [
    {
      title: "操作人",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "操作内容",
      dataIndex: "action",
      key: "action", // 用户退出、查询树列表、分页查询列表等
    },
    {
      title: "所属模块",
      dataIndex: "module",
      key: "module", // 登录、用户管理、系统日志等
    },
    {
      title: "操作 IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "操作地点",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "耗时",
      dataIndex: "time_consume",
      key: "time_consume", // 58ms、100ms、8ms
    },
    {
      title: "浏览器",
      dataIndex: "browser",
      key: "browser",
    },
    {
      title: "操作系统",
      dataIndex: "os",
      key: "os",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status", // 成功、失败
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (text, row) => <div>强制退出</div>,
    },
  ];

  const formAccountData = [
    {
      label: "登录地点",
      name: "name",
      is: "Input",
      placeholder: "请输入角色名称",
    },
    {
      label: "用户名称",
      name: "code",
      is: "Input",
      placeholder: "请输入角色编码",
    },
    {
      label: "浏览器",
      name: "description",
      is: "Input",
      placeholder: "请输入角色描述",
    },
  ];

  const accountColumns = [
    {
      title: "会话编号",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "登录昵称",
      dataIndex: "nick_name",
      key: "nick_name",
    },
    {
      title: "登录行为",
      dataIndex: "action",
      key: "action", // 账号登录、账号退出
    },
    {
      title: "登录 IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "登录地点",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "浏览器",
      dataIndex: "browser",
      key: "browser",
    },
    {
      title: "操作系统",
      dataIndex: "os",
      key: "os",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status", // 成功、失败
    },
    {
      title: "登录时间",
      dataIndex: "login_at",
      key: "login_at",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (text, row) => <div>强制退出</div>,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  const tabItems = [
    {
      label: "操作日志",
      key: "operate",
      children: (
        <>
          <SuperForm
            data={formOperateData}
            layout={layout}
            limit={6}
            rulesValid={false}
            btnText="查询"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          ></SuperForm>
          <SuperTable
            queryUrl="/admin/records?current=1&pageSize=10"
            columns={operateColumns}
          />
        </>
      ),
    },
    {
      label: "登录日志",
      key: "log",
      children: (
        <>
          <SuperForm
            data={formAccountData}
            layout={layout}
            limit={6}
            rulesValid={false}
            btnText="查询"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          ></SuperForm>
          <SuperTable
            queryUrl="/admin/records?current=1&pageSize=10"
            columns={accountColumns}
          />
        </>
      ),
    },
  ];

  return <Tabs onChange={onChange} type="card" items={tabItems} />;
};
export default Log;
