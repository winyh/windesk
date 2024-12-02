import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form, Input, Image, App, theme } from "antd";
import { registerService } from "@/service/index";
import { encryptData } from "@/utils/crypto";
import logo from "@/assets/img/winbase.png";
import "./style.css";

const Register = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const [loading, setLoading] = useState(false);

  const {
    token: { colorPrimary, colorBgContainer },
  } = theme.useToken();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // 密码加密
      const encryptPassword = encryptData(values?.password, "win");
      const encryptConfirmPassword = encryptData(
        values?.confirm_password,
        "win"
      );
      values.password = encryptPassword;
      values.confirm_password = encryptConfirmPassword;
      // 密码加密

      let { data, status, msg } = await registerService(values);
      if (status) {
        notification.success({
          message: "系统提醒",
          description: "注册成功! 即将跳转到登录页",
        });
        setTimeout(() => {
          setLoading(false);
          navigate("/login");
        }, 500);
      } else {
        setLoading(false);
        notification.warning({
          message: "系统提醒",
          description: `${msg}. 注册异常，请联系管理员!`,
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-bg" style={{ background: colorBgContainer }}>
      <div className="login">
        <Card
          style={{
            borderRadius: 12,
          }}
          title={
            <div style={{ textAlign: "center", margin: "8px 0" }}>
              <Image src={logo} preview={false} />
            </div>
          }
        >
          <Form
            name="basic"
            labelCol={{
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
                span: 6,
              },
              xl: {
                span: 6,
              },
              xxl: {
                span: 6,
              },
            }}
            wrapperCol={{
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
                span: 18,
              },
              xl: {
                span: 18,
              },
              xxl: {
                span: 18,
              },
            }}
            style={{
              minWidth: 320,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="手机号"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "请输入手机号!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                {
                  required: true,
                  message: "请输入邮箱!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="确认密码"
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: "请确认密码!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                xs: {
                  offset: 0,
                  span: 24,
                },
                sm: {
                  offset: 0,
                  span: 24,
                },
                md: {
                  offset: 0,
                  span: 24,
                },
                lg: {
                  offset: 6,
                  span: 18,
                },
                xl: {
                  offset: 6,
                  span: 18,
                },
                xxl: {
                  offset: 6,
                  span: 18,
                },
              }}
            >
              <Button type="primary" htmlType="submit" block loading={loading}>
                注册
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
