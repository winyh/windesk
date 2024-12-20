import {
  DiffOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  LineChartOutlined,
  ConsoleSqlOutlined,
  FunctionOutlined,
  FireOutlined,
  UserOutlined,
  SettingOutlined,
  CloudServerOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

import Dashboard from "@/page/dashboard";

/* 应用管理 */

import AppPage from "@/page/application/page";
import AppKey from "@/page/application/key";
import AppPublish from "@/page/application/publish";

import Database from "@/page/database";
import Function from "@/page/function";
import Storage from "@/page/storage";
import Agent from "@/page/agent";
import Analysis from "@/page/analysis";

/* 账户页 */
import Profile from "@/page/user/profile";
import CustomeTheme from "@/page/user/theme";
import Message from "@/page/user/message";

/* 权限管理 */
import Admin from "@/page/authority/admin";
import Role from "@/page/authority/role";
import Navigation from "@/page/authority/menu/navigation";
import Organization from "@/page/authority/organization";
import Position from "@/page/authority/position";

/* 系统设置 */
import Dictionary from "@/page/system/dictionary";
import Parameter from "@/page/system/parameter";
import Setting from "@/page/system/setting";
import Log from "@/page/system/log";
import Area from "@/page/system/area"; // 待开发-暂时屏蔽
import Cache from "@/page/system/cache"; // 待开发-暂时屏蔽

const appBaseRoutes = [
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
    path: "project",
    meta: {
      label: "应用管理",
      icon: <AppstoreOutlined />,
      key: "project",
      hide_in_menu: false,
    },
    children: [
      {
        path: "page",
        element: <AppPage />,
        meta: {
          label: "页面管理",
          key: "page",
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
    path: "page/:pageId",
    meta: {
      label: "页面管理",
      icon: <DiffOutlined />,
      key: "page",
      hide_in_menu: true,
    },
    children: [
      {
        path: ":tense",
        element: <AppPage />,
        meta: {
          label: "页面时态",
          key: "pageTense",
          hide_in_menu: false,
        },
        children: [
          {
            path: ":action",
            element: <AppPage />,
            meta: {
              label: "页面动作",
              key: "pageAction",
              hide_in_menu: false,
            },
          },
        ],
      },
    ],
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
        path: "navigation",
        element: <Navigation />,
        meta: {
          label: "导航管理",
          key: "navigation",
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
    path: "manage",
    meta: {
      label: "应用配置",
      icon: <SettingOutlined />,
      key: "manage",
      hide_in_menu: false,
    },
    children: [
      {
        path: "dictionary",
        element: <Dictionary />,
        meta: {
          label: "字典管理",
          key: "dictionary",
          hide_in_menu: false,
        },
      },
      {
        path: "parameter",
        element: <Parameter />,
        meta: {
          label: "参数管理",
          key: "parameter",
          hide_in_menu: false,
        },
      },
      {
        path: "setting",
        element: <Setting />,
        meta: {
          label: "应用配置",
          key: "setting",
          hide_in_menu: false,
        },
      },
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
        path: "area",
        element: <Area />,
        meta: {
          label: "行政区划",
          key: "area",
          hide_in_menu: true,
        },
      },
      {
        path: "cache",
        element: <Cache />,
        meta: {
          label: "缓存管理",
          key: "cache",
          hide_in_menu: true,
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

export { appBaseRoutes };

export default appBaseRoutes;
