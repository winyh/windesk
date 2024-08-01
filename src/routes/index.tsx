// 路由表-创建动态路由
import { createBrowserRouter } from "react-router-dom";

import {
  AppstoreOutlined,
  DashboardOutlined,
  LineChartOutlined,
  ConsoleSqlOutlined,
  GroupOutlined,
  FunctionOutlined,
  FireOutlined,
  CloudServerOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

import Layout from "@/component/Layout";
import Dashboard from "@/page/dashboard";
import Tenant from "@/page/tenant";
import Application from "@/page/application";
import Database from "@/page/database";
import Function from "@/page/function";
import Storage from "@/page/storage";
import Agent from "@/page/agent";
import Analysis from "@/page/analysis";
import System from "@/page/system";

/* 结果页 */
import Result403 from "@/page/result/403";
import Result404 from "@/page/result/404";
import Result500 from "@/page/result/500";

/* 账户页 */
import Login from "@/page/login";
import Register from "@/page/register";

/* 权限管理 */
import Admin from "@/page/authority/admin";
import Role from "@/page/authority/role";
import Menu from "@/page/authority/menu";
import Organization from "@/page/authority/organization";
import Position from "@/page/authority/position";

const basename = import.meta.env.BASE_URL;

const childRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
    meta: {
      label: "控制台",
      icon: <DashboardOutlined />,
      key: "dashboard",
      hide_in_menu: false,
    },
  },
  {
    path: "tenant",
    element: <Tenant />,
    meta: {
      label: "租户管理",
      key: "tenant",
      icon: <GroupOutlined />,
      hide_in_menu: false,
    },
  },
  {
    path: "application",
    element: <Application />,
    meta: {
      label: "应用管理",
      key: "application",
      icon: <AppstoreOutlined />,
      hide_in_menu: false,
    },
  },
  {
    path: "database",
    element: <Database />,
    meta: {
      label: "数据库",
      key: "database",
      icon: <ConsoleSqlOutlined />,
      hide_in_menu: false,
    },
  },
  {
    path: "function",
    element: <Function />,
    meta: {
      label: "云函数",
      key: "function",
      icon: <FunctionOutlined />,
      hide_in_menu: false,
    },
  },
  {
    path: "storage",
    element: <Storage />,
    meta: {
      label: "文件存储",
      key: "storage",
      icon: <CloudServerOutlined />,
      hide_in_menu: false,
    },
  },
  {
    path: "agent",
    element: <Agent />,
    meta: {
      label: "AI 助手",
      key: "agent",
      icon: <FireOutlined />,
      hide_in_menu: false,
    },
  },
  {
    path: "analysis",
    element: <Analysis />,
    meta: {
      label: "分析监控",
      key: "analysis",
      icon: <LineChartOutlined />,
      hide_in_menu: false,
    },
  },
  {
    path: "authority",
    meta: {
      label: "权限管理",
      key: "authority",
      icon: <SafetyCertificateOutlined />,
      hide_in_menu: false,
    },
    children: [
      {
        path: "admin",
        element: <Admin />,
        meta: {
          label: "用户管理",
          key: "admin",
          hide_in_menu: false,
        },
      },
      {
        path: "role",
        element: <Role />,
        meta: {
          label: "角色管理",
          key: "role",
          hide_in_menu: false,
        },
      },
      {
        path: "menu",
        element: <Menu />,
        meta: {
          label: "菜单管理",
          key: "menu",
          hide_in_menu: false,
        },
      },
      {
        path: "organization",
        element: <Organization />,
        meta: {
          label: "组织机构",
          key: "organization",
          hide_in_menu: false,
        },
      },
      {
        path: "position",
        element: <Position />,
        meta: {
          label: "岗位管理",
          key: "position",
          hide_in_menu: false,
        },
      },
    ],
  },
  {
    path: "system",
    element: <System />,
    meta: {
      label: "系统配置",
      icon: <DashboardOutlined />,
      key: "system",
      hide_in_menu: false,
    },
  },
  {
    path: "403",
    element: <Result403 />,
    meta: {
      label: "403",
      key: "403",
      hide_in_menu: true,
    },
  },
  {
    path: "500",
    element: <Result500 />,
    meta: {
      label: "500",
      key: "500",
      hide_in_menu: true,
    },
  },
  {
    path: "*",
    element: <Result404 />,
    meta: {
      label: "404",
      key: "404",
      hide_in_menu: true,
    },
  },
];

const routes = [
  {
    path: "/",
    element: <Layout />,
    meta: {
      key: "/",
      label: "主页",
      hide_in_menu: false,
    },
    children: childRoutes,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      label: "用户登录",
      key: "login",
      hide_in_menu: true,
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      label: "用户注册",
      key: "register",
      hide_in_menu: true,
    },
  },
];

const router = createBrowserRouter(routes, {
  basename,
});

export { childRoutes };

export default router;
