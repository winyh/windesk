import { useEffect, useState, useRef } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";

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
  App,
} from "antd";
import {
  PlusOutlined,
  BellOutlined,
  SunOutlined,
  FireTwoTone,
  UserOutlined,
  StarOutlined,
  MoonOutlined,
  CloseOutlined,
  LogoutOutlined,
  GithubOutlined,
  SolutionOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";
import { theme } from "antd";
import screenfull from "screenfull";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";
import useStore from "@/store/index";
import { logoutService } from "@/service/index";
import {
  isTauri,
  getCurrentYear,
  findObjByKey,
  routes2menu,
  getMenuSome,
} from "@/utils/index";
import { childRoutes } from "@/routes/index";
import winbaseLogo from "/winbase.png";
import "./index.css";

const { BASE_URL } = import.meta.env;

const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

let index = 0;

const LayoutBase = () => {
  const {
    token: { colorBgContainer, colorText, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [menuItems, setMenuItems] = useState([]);
  const [breadcrumbItems, setBreadcrumbItems] = useState<any>([]);
  const [openKeys, setOpenKeys] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const themeMode = useStore((state) => state.themeMode);
  const [mode, setMode] = useState<any>(themeMode);
  const [isFull, setIsFull] = useState(false);
  const [isContentFull, setIsContentFull] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [applications, setApplications] = useState(["应用A", "应用B"]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const toggleTheme = useStore((state) => state.toggleTheme);

  const logout = async () => {
    try {
      const { data, status } = await logoutService();
      if (status) {
        localStorage.removeItem("token");
        message.open({
          type: "loading",
          content: "即将退出登录!",
          duration: 0,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goMessage = () => {
    navigate(`${BASE_URL}user/message`);
  };

  const goProfile = () => {
    navigate(`${BASE_URL}user/profile`);
  };

  const themeConfig = () => {
    navigate(`${BASE_URL}user/theme`);
  };

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
      onClick: () => goMessage(),
    },
    {
      key: "profile",
      icon: <SolutionOutlined />,
      label: "账户设置",
      onClick: () => goProfile(),
    },
    {
      type: "divider",
    },
    {
      key: "personal",
      icon: <StarOutlined />,
      label: "主题配置",
      onClick: () => themeConfig(),
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
    // console.log(`路由变化监听：${location.pathname}`);
    const menus = routes2menu(childRoutes);
    setMenuItems(menus);
    let keyPaths = location.pathname.split("/").filter((i) => i);

    let someMenu = getMenuSome(childRoutes);
    let breads: any[] = [];
    var linkPath = "";
    keyPaths.map((key, index) => {
      linkPath = `${linkPath}/${key}`.replace(/\/\/+/g, "/");
      const label = findObjByKey(someMenu, key, "key")?.label;
      let curentPath = linkPath;
      breads.push({
        title: <Link to={`${curentPath}`}>{label}</Link>,
        onClick: () => {
          navigate(`${curentPath}`);
        },
      });
    });

    setOpenKeys(keyPaths); // 初始展开
    setSelectedKeys(keyPaths); // 更新左侧导航选中
    setBreadcrumbItems(breads); // 更新面包屑
  }, [location.pathname]);

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

  const onHandleMenuClick = ({ keyPath }) => {
    const pathReverse = keyPath.reverse();
    const path = pathReverse.join("/");
    setSelectedKeys(pathReverse);
    navigate(`${path}`); // 处理路由跳转
  };

  const onOpenChange = (openKeys) => {
    setOpenKeys(openKeys);
  };

  const goAgent = () => {
    navigate(`/agent`);
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
          mode="inline"
          items={menuItems}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onSelect={onHandleMenuClick}
          onOpenChange={onOpenChange}
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
            padding: "0 24px",
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

                <Breadcrumb items={breadcrumbItems} />
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
        <Content
          id="content"
          style={{
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
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
          <FloatButton onClick={goAgent} icon={<FireTwoTone />} />
        </Content>
        <Footer
          style={{
            background: colorBgContainer,
          }}
        >
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
