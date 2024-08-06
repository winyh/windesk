import { useState, useEffect, useRef } from "react";
import { Card } from "antd";
import SuperForm from "@/component/SuperForm";

const Profile = () => {
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

  const formData = [
    {
      label: "账户名称",
      name: "username",
      is: "Input",
      placeholder: "请输入账户名称",
    },
    {
      label: "用户昵称",
      name: "nick_name",
      is: "Input",
      placeholder: "请输入用户昵称",
    },
    {
      label: "手机号",
      name: "mobile",
      is: "Input",
      placeholder: "请输入手机号",
    },
    {
      label: "邮箱",
      name: "email",
      is: "Input",
      placeholder: "请输入邮箱",
    },
  ];

  return (
    <>
      <Card title="账户配置" style={{ maxWidth: 600 }}>
        <SuperForm
          ref={formRef}
          data={formData}
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
      </Card>
    </>
  );
};

export default Profile;
