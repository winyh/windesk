import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, Button, Form, Input, theme, Image, App } from "antd";
import { getAdminService, loginService } from "@/service/index";
import { TranslationOutlined } from "@ant-design/icons";
import logo from "@/assets/img/winbase.png";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { notification } = App.useApp();
  const [loading, setLoading] = useState(false);
  const redirect = searchParams.get("redirect");

  const {
    token: { colorPrimary, colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    // localStorage.removeItem("token");
  }, []);

  const pageRoute = redirect ? redirect : "/saas/dashboard";

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data, status, msg } = await loginService(values);
      if (status) {
        notification.success({
          message: "系统提醒",
          description: `登录成功! 即将跳转到${
            redirect ? "退出前页面" : "系统首页"
          }`,
        });
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          setLoading(false);
          navigate(pageRoute);
        }, 1000);
      } else {
        setLoading(false);
        notification.warning({
          message: "系统提醒",
          description: `${msg} 登录异常，请联系管理员!`,
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
      <div className="language">
        <Button type="text" icon={<TranslationOutlined />}>
          中文 / English
        </Button>
      </div>
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
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
