import { useEffect, useState, useRef } from "react";
import {
  Outlet,
  Link,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";

import {
  Layout,
  Button,
  Menu,
  Space,
  Dropdown,
  Flex,
  Drawer,
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
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import useStore from "@/store/index";
import { logoutService } from "@/service/index";
import { clientGetOneByUid, clientGetAll } from "@/request";

import {
  isTauri,
  getCurrentYear,
  findObjByKey,
  routes2menu,
  getMenuSome,
} from "@/utils/index";
import { saasRoutes, appRoutes, routes } from "@/route/index";
import { Storage } from "@/utils/storage";
import winbaseLogo from "/winbase.png";
import "./index.css";

const { BASE_URL } = import.meta.env;

const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

const LayoutBase = () => {
  const {
    token: { colorBgContainer, colorText, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const { message } = App.useApp();

  const [menuItems, setMenuItems] = useState([]);
  const [currentApp, setCurrentApp] = useState([]);
  const [breadcrumbItems, setBreadcrumbItems] = useState<any>([]);
  const [openKeys, setOpenKeys] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const themeMode = useStore((state) => state.themeMode);
  const [mode, setMode] = useState<any>(themeMode);
  const [isFull, setIsFull] = useState(false);
  const [isContentFull, setIsContentFull] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [applications, setApplications] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const inputRef = useRef(null);
  const toggleTheme = useStore((state) => state.toggleTheme);

  useEffect(() => {
    getApps();
  }, [params.appId]);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/saas") {
      navigate("/saas/dashboard");
    } else if (location.pathname === `/app/${params.appId}`) {
      navigate(`/app/${params.appId}/dashboard`);
    } else {
      onRouteChange();
      // console.log(`路由变化监听：${location.pathname}`);
    }
  }, [location.pathname]);

  const getApps = async (params) => {
    const { status, data } = await clientGetAll(
      "platform",
      "application",
      params
    );
    if (status) {
      setApplications(data);
    }
  };

  const getCurrentApp = async () => {
    // 获取当前应用信息

    try {
      // 1.判断当前应用UID是否存在
      if (!params?.appId) {
        return;
      }

      let appInfo = Storage.getItem("app");
      // 2.本地app存在时，则比对参数，相同则不处理，不通则请求获取存本地
      if (appInfo) {
        if (appInfo?.uid !== params?.appId) {
          const { status, data } = await clientGetOneByUid(
            "platform",
            "application",
            params.appId
          );
          if (status && data) {
            Storage.setItem("app", data);
            return data;
          }
        } else {
          return appInfo;
        }
      } else {
        // 3.本地app不存在时，则通过参数请求获取，然后把数据存本地
        const { status, data } = await clientGetOneByUid(
          "platform",
          "application",
          params.appId
        );
        if (status && data) {
          Storage.setItem("app", data);
          return data;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      const { data, status } = await logoutService();
      if (status) {
        Storage.removeItem("token");
        const { pathname, search } = window.location;
        message.open({
          type: "loading",
          content: "即将退出登录!",
          duration: 0,
        });
        setTimeout(() => {
          message.destroy();
          navigate(`/login?redirect=${pathname}${search}`);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goMessage = () => {
    navigate(`${BASE_URL}saas/user/message`);
  };

  const goProfile = () => {
    navigate(`${BASE_URL}saas/user/profile`);
  };

  const themeConfig = () => {
    navigate(`${BASE_URL}saas/user/theme`);
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
    navigate("/saas/project");
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  /* 路由变化监听 */
  const onRouteChange = async () => {
    let curentRoutes = saasRoutes;
    if (location.pathname.includes("/app")) {
      curentRoutes = appRoutes;
    }
    const menus = routes2menu(curentRoutes);
    setMenuItems(menus);
    let keyPaths = location.pathname.split("/").filter((i) => i);

    let someMenu = getMenuSome(routes);
    let breads: any[] = [];
    let linkPath = "";

    const appInfo = await getCurrentApp();

    setCurrentApp(appInfo);

    keyPaths.map((key, _) => {
      linkPath = `${linkPath}/${key}`.replace(/\/\/+/g, "/");
      let label = findObjByKey(someMenu, key, "key")?.label;
      if (!label && appInfo && key === appInfo?.uid) {
        label = appInfo?.name;
      }
      let curentPath = linkPath;
      console.log({ key });
      if (key !== "app") {
        breads.push({
          title: <Link to={`${curentPath}`}>{label}</Link>,
          onClick: () => {
            navigate(`${curentPath}`);
          },
        });
      }
    });

    setOpenKeys(keyPaths); // 初始展开
    setSelectedKeys(keyPaths); // 更新左侧导航选中
    setBreadcrumbItems(breads); // 更新面包屑
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
    console.log(isTauri(), "isTauri");
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
    Storage.setItem("themeMode", newMode);
    setMode(newMode);
    toggleTheme(newMode);
  };

  const onMenuClick = ({ keyPath }) => {
    const pathReverse = keyPath.reverse();
    const path = pathReverse.join("/");
    setSelectedKeys(pathReverse);
    navigate(`${path}`); // 处理路由跳转
  };

  const onOpenChange = (openKeys) => {
    setOpenKeys(openKeys);
  };

  const onCallAgent = () => {
    setOpen(true);
  };

  const onAgentClose = () => {
    setOpen(false);
  };

  const onAppChange = (key) => {
    applications.map((item) => {
      if (item?.id === key) {
        setCurrentApp(item);
        navigate(`/app/${item?.uid}/dashboard`);
      }
    });
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
          onSelect={onMenuClick}
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
                {params?.appId && (
                  <Select
                    showSearch
                    style={{
                      width: 180,
                    }}
                    value={currentApp?.id}
                    defaultValue={currentApp?.id}
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
                      label: item?.name,
                      value: item?.id,
                    }))}
                    onChange={onAppChange}
                  />
                )}

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
          <FloatButton onClick={onCallAgent} icon={<FireTwoTone />} />

          <Drawer
            title="AI助手"
            onClose={onAgentClose}
            open={open}
            mask={false}
          >
            <p>AI 助手对话框</p>
            <p>智能化能力</p>
            <p>生成式AI</p>
          </Drawer>
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
