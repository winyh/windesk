import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Layout, Button, Menu, Space, Dropdown, Flex, Typography } from "antd";
import {
  AppstoreOutlined,
  DashboardOutlined,
  LineChartOutlined,
  MailOutlined,
  SettingOutlined,
  ConsoleSqlOutlined,
  GroupOutlined,
  FunctionOutlined,
  FireOutlined,
  CloudServerOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  StarOutlined,
  LogoutOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { getCurrentYear } from "@/utils/index";
import winbaseLogo from "/public/winbase.png";
import "./index.css";

const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

const items = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "控制台",
  },
  {
    key: "tenant",
    icon: <GroupOutlined />,
    label: "租户管理",
  },
  {
    key: "admin",
    icon: <SafetyCertificateOutlined />,
    label: "用户管理",
  },
  {
    key: "application",
    icon: <AppstoreOutlined />,
    label: "应用管理",
  },
  {
    key: "database",
    icon: <ConsoleSqlOutlined />,
    label: "数据库",
  },
  {
    key: "function",
    icon: <FunctionOutlined />,
    label: "云函数",
  },
  {
    key: "storage",
    icon: <CloudServerOutlined />,
    label: "文件存储",
  },
  {
    key: "agent",
    icon: <FireOutlined />,
    label: "AI助手",
  },
  {
    key: "analysis",
    icon: <LineChartOutlined />,
    label: "分析监控",
  },
  {
    key: "system",
    icon: <SettingOutlined />,
    label: "系统配置",
  },
  {
    key: "sub1",
    label: "多级菜单",
    icon: <MailOutlined />,
    children: [
      {
        key: "5",
        label: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
      },
      {
        key: "7",
        label: "Option 7",
      },
      {
        key: "8",
        label: "Option 8",
      },
    ],
  },
  {
    key: "sub2",
    label: "子菜单",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "9",
        label: "Option 9",
      },
      {
        key: "10",
        label: "Option 10",
      },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          {
            key: "11",
            label: "Option 11",
          },
          {
            key: "12",
            label: "Option 12",
          },
        ],
      },
    ],
  },
];

const accountItems = [
  {
    key: "info",
    label: "2712192471@qq.com",
    icon: (
      <>
        <span></span>
      </>
    ),
  },
  {
    type: "divider",
  },
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "个人中心",
    onClick: () => goProfile(),
  },
  {
    type: "divider",
  },
  {
    key: "personal",
    icon: <StarOutlined />,
    label: "主题配置",
    onClick: () => goPersonal(),
  },
  {
    type: "divider",
  },
  {
    key: "login",
    icon: <LogoutOutlined />,
    label: "退出登录",
    onClick: () => logout(),
  },
];

const siderStyle = {
  color: "#fff",
  overflow: "auto",
  height: "100vh",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  maxWidth: "100%",
  height: "100%",
};

const LayoutBase = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={layoutStyle}>
      <Sider
        style={siderStyle}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
      >
        <div className="winbase-logo">
          <img src={winbaseLogo} height={36} width={33} alt="" />{" "}
          {collapsed ? "" : <span className="winbase-name">winbase</span>}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={[]}
          mode="inline"
          items={items}
        />

        <div className="slider-bottom">
          <Dropdown
            placement="topRight"
            menu={{
              items: accountItems,
            }}
          >
            <Button
              type="text"
              style={{ color: "gray" }}
              icon={<UserOutlined />}
            >
              {collapsed ? "" : "账户信息"}
            </Button>
          </Dropdown>
        </div>
      </Sider>
      <Layout>
        <Header></Header>
        <Content>
          <Outlet />
        </Content>
        <Footer>
          <Flex justify="center" align="center">
            <Space>
              <Text>
                @2020 ~ {getCurrentYear()}{" "}
                <Link to="https://winyh.github.io/winsax" target="_blank">
                  winbase
                </Link>
              </Text>
              <Link to="https://github.com/winyh/winsax" target="_blank">
                <GithubOutlined></GithubOutlined>
              </Link>
            </Space>
          </Flex>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutBase;
