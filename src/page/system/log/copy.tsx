import React from "react";
import { Button, Tabs } from "antd";
import SuperForm from "@/component/SuperForm";
import SuperTable from "@/component/SuperTable";
import { useNavigate } from "react-router-dom";
import "./index.less";

const { BASE_URL } = import.meta.env;

const Entry = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(`${BASE_URL}saas`);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const onFinish = (values) => {};

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  // 记录全部用户信息就是的登录日志了
  // 数据举例：
  // 系统管理员（admin）
  // 218.79.62.144
  // 中国上海上海市 电信
  // Chrome 87.0.4280.88
  // Windows 10
  // 2024-08-14 09:04:54
  // 2024-08-14 09:05:33

  const formData = [
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

  const columns = [
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

  const tabItems = [
    {
      label: "操作日志",
      key: "operate",
      children: (
        <>
          <SuperForm
            data={formData}
            layout={layout}
            limit={6}
            rulesValid={false}
            btnText="查询"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          ></SuperForm>
          <SuperTable
            queryUrl="/admin/records?current=1&pageSize=10"
            columns={columns}
          />
        </>
      ),
    },
    {
      label: "登录日志",
      key: "log",
      children: "",
    },
  ];

  return (
    <>
      <Tabs
        onChange={onChange}
        type="card"
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab Pane ${id}`,
          };
        })}
      />
    </>
  );
};
export default Entry;
