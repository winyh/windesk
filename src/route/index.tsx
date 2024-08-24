// 路由表-创建动态路由
import { createBrowserRouter } from "react-router-dom";

import { DashboardOutlined } from "@ant-design/icons";

import appBaseRoutes from "./app";
import saasBaseRoutes from "./saas";

import Layout from "@/component/Layout";

/* 结果页 */
import Result403 from "@/page/result/403";
import Result404 from "@/page/result/404";
import Result500 from "@/page/result/500";

/* 账户页 */
import Login from "@/page/account/login";
import Register from "@/page/account/register";

const basename = import.meta.env.BASE_URL;

const resultRoutes = [
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

const saasRoutes = [...saasBaseRoutes, ...resultRoutes];
const appRoutes = [...appBaseRoutes, ...resultRoutes];

const routes = [
  {
    path: "/",
    meta: {
      key: "/",
      label: "主页",
      hide_in_menu: false,
    },
    children: [],
  },
  {
    path: "saas",
    element: <Layout />,
    meta: {
      label: "平台",
      icon: <DashboardOutlined />,
      key: "saas",
      hide_in_menu: false,
    },
    children: saasRoutes,
  },
  {
    path: "app/:appId",
    element: <Layout />,
    meta: {
      label: "应用",
      icon: <DashboardOutlined />,
      key: "app",
      hide_in_menu: false,
    },
    children: appRoutes,
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

export { routes, saasRoutes, appRoutes };

export default router;
