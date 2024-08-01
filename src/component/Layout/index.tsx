import { useEffect, useState, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Layout,
  Button,
  Menu,
  Space,
  Dropdown,
  Flex,
  Typography,
  Breadcrumb,
  Tooltip,
  FloatButton,
  Divider,
  Select,
} from "antd";
import {
  PlusOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  LineChartOutlined,
  BellOutlined,
  SettingOutlined,
  ConsoleSqlOutlined,
  GroupOutlined,
  FunctionOutlined,
  SunOutlined,
  FireOutlined,
  FireTwoTone,
  CloudServerOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  StarOutlined,
  MoonOutlined,
  CloseOutlined,
  LogoutOutlined,
  GithubOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";
import { theme } from "antd";
import screenfull from "screenfull";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";
import useStore from "@/store/index";
import { isTauri, getCurrentYear } from "@/utils/index";
import winbaseLogo from "/winbase.png";
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
    label: "AI 助手",
  },
  {
    key: "analysis",
    icon: <LineChartOutlined />,
    label: "分析监控",
  },
  {
    key: "authority",
    icon: <SafetyCertificateOutlined />,
    label: "权限管理",
    children: [
      {
        path: "admin",
        label: "用户管理",
      },
      {
        path: "role",
        label: "角色管理",
      },
      {
        path: "menu",
        label: "菜单管理",
      },
      {
        path: "organization",
        label: "组织机构",
      },
      {
        path: "position",
        label: "岗位管理",
      },
    ],
  },
  {
    key: "system",
    icon: <SettingOutlined />,
    label: "系统配置",
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
    key: "message",
    icon: <BellOutlined />,
    label: "消息通知",
    onClick: () => goProfile(),
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

let index = 0;

const LayoutBase = () => {
  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();

  const themeMode = useStore((state) => state.themeMode);
  const [mode, setMode] = useState<any>(themeMode);
  const [isFull, setIsFull] = useState(false);
  const [isContentFull, setIsContentFull] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [applications, setApplications] = useState(["应用A", "应用B"]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const toggleTheme = useStore((state) => state.toggleTheme);

  const addItem = (e) => {
    e.preventDefault();
    setApplications([...applications, name || `新应用 ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (!isTauri() && screenfull.isEnabled) {
      screenfull.on("change", () => {
        console.log("Am I fullscreen?", screenfull.isFullscreen ? "Yes" : "No");
        if (!screenfull.isFullscreen) {
          setIsFull(false);
          setIsContentFull(false);
        }
      });

      return () => screenfull.off("change", () => {});
    }
    onListenTauriWindow();
  }, []);

  const onListenTauriWindow = async () => {
    // Listen for the "fullscreen-changed" event
    listen("fullscreen-changed", (event) => {
      const isFullscreen = event.payload;
      console.log(`Tauri Fullscreen state changed: ${isFullscreen}`);
      setIsFull(isFullscreen);
    });
  };

  const onFullScreen = async () => {
    // tauri 写法
    if (isTauri()) {
      console.log("isTauri", { isFull });
      setIsFull((isFull) => !isFull);
      await invoke("switch_fullscreen");
    } else {
      if (screenfull.isEnabled) {
        screenfull.toggle();
        setIsFull((isFull) => !isFull);
      } else {
        console.error("无法全屏");
      }
    }
  };

  const onContentFullScreen = () => {
    const content = document.getElementById("content");
    if (screenfull.isEnabled) {
      screenfull.toggle(content as HTMLElement);
      setIsContentFull((isContentFull) => !isContentFull);
    } else {
      console.error("无法全屏");
    }
  };

  const onSwitchMode = () => {
    let newMode = mode === "light" ? "dark" : "light";
    localStorage.setItem("themeMode", newMode);
    setMode(newMode);
    toggleTheme(newMode);
  };

  return (
    <Layout
      style={{
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        background: colorBgContainer,
      }}
    >
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          background: colorBgContainer,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
      >
        <div className="winbase-logo">
          <img src={winbaseLogo} height={36} width={33} alt="" />{" "}
          {collapsed ? (
            ""
          ) : (
            <span
              className="winbase-name"
              style={{
                color: colorText,
              }}
            >
              winbase
            </span>
          )}
        </div>
        <Menu
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
            <Button type="text" icon={<UserOutlined />}>
              {collapsed ? "" : "账户信息"}
            </Button>
          </Dropdown>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
          }}
          className="winbase-header"
        >
          <Flex justify="space-between" align="center">
            <div className="left">
              <Space size="middle">
                <Select
                  showSearch
                  style={{
                    width: 180,
                  }}
                  defaultValue="应用A"
                  placeholder="请选择应用"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                      <Button
                        type="text"
                        block
                        icon={<PlusOutlined />}
                        onClick={addItem}
                      >
                        新增应用
                      </Button>
                    </>
                  )}
                  options={applications.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />

                <Breadcrumb
                  items={[
                    {
                      title: "权限管理",
                    },
                    {
                      title: "组织机构",
                    },
                  ]}
                />
              </Space>
            </div>

            <div className="right">
              <Space>
                <Tooltip title="切换模式">
                  <Button
                    type="text"
                    icon={mode === "light" ? <MoonOutlined /> : <SunOutlined />}
                    onClick={onSwitchMode}
                  ></Button>
                </Tooltip>

                <Tooltip title={isFull ? "退出全屏" : "全屏显示"}>
                  <Button
                    type="text"
                    icon={
                      isFull ? (
                        <FullscreenExitOutlined />
                      ) : (
                        <FullscreenOutlined />
                      )
                    }
                    onClick={onFullScreen}
                  ></Button>
                </Tooltip>
              </Space>
            </div>
          </Flex>
        </Header>
        <Content id="content">
          <Outlet />

          {isContentFull ? (
            <div
              className="exit-content-fullscreen"
              onClick={onContentFullScreen}
            >
              <Tooltip title="退出全屏">
                <CloseOutlined
                  className="exit-content-icon"
                  style={{ color: "#fff", fontSize: "18px" }}
                />
              </Tooltip>
            </div>
          ) : null}
          <FloatButton
            onClick={() => console.log("AI 助手")}
            icon={<FireTwoTone />}
          />
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
