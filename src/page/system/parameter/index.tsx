import React from "react";
import { Button } from "antd";
import SuperForm from "@/component/SuperForm";
import SuperTable from "@/component/SuperTable";
import { useNavigate } from "react-router-dom";
import "./index.css";

const onFinish = (values) => {};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const formData = [
  {
    label: "参数名称",
    name: "name",
    is: "Input",
    placeholder: "请输入角色名称",
  },
  {
    label: "参数键名",
    name: "code",
    is: "Input",
    placeholder: "请输入角色编码",
  },
  {
    label: "参数键值",
    name: "description",
    is: "Input",
    placeholder: "请输入角色描述",
  },
  {
    label: "备注",
    name: "description",
    is: "Input",
    placeholder: "请输入角色描述",
  },
  {
    label: "系统内置",
    name: "status",
    placeholder: "请选择状态",
    options: [],
    is: "Select",
  },
];

const columns = [
  {
    title: "参数名称",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "参数键名",
    dataIndex: "nick_name",
    key: "nick_name",
  },
  {
    title: "参数键值",
    dataIndex: "mobile",
    key: "mobile",
  },
  {
    title: "系统内置",
    dataIndex: "mobile",
    key: "mobile",
  },
  {
    title: "备注",
    dataIndex: "avator",
    key: "avator",
  },
  {
    title: "创建时间",
    dataIndex: "gender",
    key: "gender",
  },
];

const Parameter = () => {
  const navigate = useNavigate();
  const { BASE_URL } = import.meta.env;
  const goHome = () => {
    navigate(`${BASE_URL}saas`);
  };
  return (
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
  );
};
export default Parameter;
