import {
  AppstoreOutlined,
  DashboardOutlined,
  GroupOutlined,
  UserOutlined,
  SettingOutlined,
  LineChartOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

import Dashboard from "@/page/dashboard/saasboard";
import Tenant from "@/page/tenant";

/* 应用管理 */
import Application from "@/page/application";

/* 账户页 */
import Profile from "@/page/user/profile";
import CustomeTheme from "@/page/user/theme";
import Message from "@/page/user/message";

/* 数据分析 */
import Analysis from "@/page/analysis/saas";

/* 权限管理 */
import Admin from "@/page/authority/admin";
import Role from "@/page/authority/role";
import Menu from "@/page/authority/menu";
import Organization from "@/page/authority/organization";
import Position from "@/page/authority/position";

/* 系统设置 */
import Log from "@/page/system/log";
import Common from "@/page/system/common";

const saasBaseRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
    meta: {
      label: "总览",
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
    path: "project",
    element: <Application />,
    meta: {
      label: "应用管理",
      key: "project",
      icon: <AppstoreOutlined />,
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
      label: "平台权限",
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
          label: "组织部门",
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
    meta: {
      label: "系统配置",
      icon: <SettingOutlined />,
      key: "system",
      hide_in_menu: false,
    },
    children: [
      {
        path: "log",
        element: <Log />,
        meta: {
          label: "日志信息",
          key: "log",
          hide_in_menu: false,
        },
      },
      {
        path: "common",
        element: <Common />,
        meta: {
          label: "通用配置",
          key: "common",
          hide_in_menu: false,
        },
      },
    ],
  },
  {
    path: "user",
    meta: {
      label: "账户管理",
      icon: <UserOutlined />,
      key: "user",
      hide_in_menu: true,
    },
    children: [
      {
        path: "message",
        element: <Message />,
        meta: {
          label: "消息通知",
          key: "message",
          hide_in_menu: true,
        },
      },
      {
        path: "profile",
        element: <Profile />,
        meta: {
          label: "个人中心",
          key: "profile",
          hide_in_menu: true,
        },
      },
      {
        path: "theme",
        element: <CustomeTheme />,
        meta: {
          label: "主题配置",
          key: "theme",
          hide_in_menu: true,
        },
      },
    ],
  },
];

export { saasBaseRoutes };

export default saasBaseRoutes;
