// 路由表-创建动态路由
import { createBrowserRouter } from "react-router-dom";

import Layout from "@/component/Layout";
import Dashboard from "@/page/dashboard";
import Tenant from "@/page/tenant";
import Application from "@/page/application";
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

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "tenant",
        element: <Tenant />,
      },
      {
        path: "authority",
        children: [
          {
            path: "admin",
            element: <Admin />,
          },
          {
            path: "role",
            element: <Role />,
          },
          {
            path: "menu",
            element: <Menu />,
          },
          {
            path: "organization",
            element: <Organization />,
          },
          {
            path: "position",
            element: <Position />,
          },
        ],
      },
      {
        path: "application",
        element: <Application />,
      },
      {
        path: "analysis",
        element: <Analysis />,
      },
      {
        path: "system",
        element: <System />,
      },
      {
        path: "403",
        element: <Result403 />,
      },
      {
        path: "500",
        element: <Result500 />,
      },
      {
        path: "*",
        element: <Result404 />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

const router = createBrowserRouter(routes, {
  basename,
});

export default router;
