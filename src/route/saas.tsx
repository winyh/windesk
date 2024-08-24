import {
  AppstoreOutlined,
  DashboardOutlined,
  GroupOutlined,
  UserOutlined,
  SettingOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

import Dashboard from "@/page/dashboard";
import Tenant from "@/page/tenant";

/* 应用管理 */
import Application from "@/page/application";
import AppKey from "@/page/application/key";
import AppPage from "@/page/application/page";
import AppNavigation from "@/page/application/navigation";
import AppPublish from "@/page/application/publish";

/* 结果页 */
import Result403 from "@/page/result/403";
import Result404 from "@/page/result/404";
import Result500 from "@/page/result/500";

/* 账户页 */
import Profile from "@/page/user/profile";
import CustomeTheme from "@/page/user/theme";
import Message from "@/page/user/message";

/* 权限管理 */
import Admin from "@/page/authority/admin";
import Role from "@/page/authority/role";
import Menu from "@/page/authority/menu";
import Organization from "@/page/authority/organization";
import Position from "@/page/authority/position";

/* 系统设置 */
import Log from "@/page/system/log";
import Area from "@/page/system/area"; // 待开发-暂时屏蔽

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
    path: "application",
    meta: {
      label: "应用管理",
      key: "application",
      icon: <AppstoreOutlined />,
      hide_in_menu: false,
    },
    children: [
      {
        path: "applist",
        element: <Application />,
        meta: {
          label: "应用列表",
          key: "applist",
          hide_in_menu: false,
        },
      },
      {
        path: "appkey",
        element: <AppKey />,
        meta: {
          label: "应用KEY",
          key: "appkey",
          hide_in_menu: false,
        },
      },
      {
        path: "apppage",
        element: <AppPage />,
        meta: {
          label: "页面管理",
          key: "apppage",
          hide_in_menu: false,
        },
      },
      {
        path: "navigation",
        element: <AppNavigation />,
        meta: {
          label: "导航管理",
          key: "navigation",
          hide_in_menu: false,
        },
      },
      {
        path: "publish",
        element: <AppPublish />,
        meta: {
          label: "应用发布",
          key: "publish",
          hide_in_menu: false,
        },
      },
    ],
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
        element: <Area />,
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
