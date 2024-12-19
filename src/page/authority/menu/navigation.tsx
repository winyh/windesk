import { useState, useRef, useEffect, useReducer } from "react";
import {
  Col,
  Row,
  Input,
  Flex,
  Space,
  Button,
  Select,
  InputNumber,
  Divider,
  Tree,
  Popconfirm,
  Switch,
  TreeSelect,
  Drawer,
  Collapse,
  Form,
  Tabs,
  Table,
  Typography,
} from "antd";

import {
  PlusOutlined,
  UserOutlined,
  ControlOutlined,
  ExceptionOutlined,
  AlignLeftOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams, Link } from "react-router-dom";
import { SegmentedItem } from "@/component/CustomFormItem";
import { IconSelect } from "@/component/IconSelect";
import {
  clientPost,
  clientPut,
  clientDelete,
  clientGetList,
  clientGetAll,
} from "@/request";
import { genMenuToTree, transBool2Str, transBool2num } from "@/utils";
import { message } from "@/store/hooks";

import "./index.css";

const { VITE_WIN_ENGINE_HOST } = import.meta.env;

const { Text } = Typography;
const { Search } = Input;
const { DirectoryTree } = Tree;
const { Option } = Select;

const initialStates = {
  open: false,
  openNav: false,
  loading: false,
  loadingPage: false,
};

const statesReducer = (states, action) => {
  switch (action.type) {
    case "open": {
      return { ...states, open: action.bool };
    }
    case "openNav": {
      return { ...states, openNav: action.bool };
    }
    case "loading": {
      return { ...states, loading: action.bool };
    }
    case "loadingPage": {
      return { ...states, loadingPage: action.bool };
    }
    default: {
      throw Error("未知 action: " + action.type);
    }
  }
};

const Menu = () => {
  const { appId, pageId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [scene, setScene] = useState("pc");
  const [menuType, setMenuType] = useState("directory");
  const [isExpend, setIsExpend] = useState(false);
  const [action, setAction] = useState(true);
  const [record, setRecord] = useState({});
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [externalLink, setExternalLink] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [treeData, setTreeData] = useState([]);

  const [states, dispatch] = useReducer(statesReducer, initialStates);

  const [pageMeta, setPageMeta] = useState({
    list: [],
    pageSize: 10,
    current: 1,
    total: 0,
  });

  useEffect(() => {
    getAllMenus({
      scene,
    });
  }, []);

  useEffect(() => {
    getData({ current: 1, pageSize: 10 });
  }, [appId]);

  const getData = (params = {}) => {
    dispatch({
      type: "loading",
      bool: true,
    });
    const { current, pageSize } = pageMeta;
    clientGetList("project", "page", {
      current,
      pageSize,
      ...params,
    })
      .then((res) => {
        if (res.status) {
          const { list, total, current, pageSize } = res.data;
          setPageMeta({
            list,
            pageSize,
            current,
            total,
          });
          dispatch({
            type: "loading",
            bool: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "loading",
          bool: false,
        });
      });
  };

  const getAllMenus = async (params) => {
    const { status, data, msg } = await clientGetAll("project", "menu", {
      ...params,
    });
    if (status) {
      setMenuData(data);
      const menuTree = genMenuToTree(data);
      setTreeData(menuTree);
    } else {
      message.warning(msg);
    }
  };

  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        values = {
          ...values,
          scene,
          status: transBool2Str(values?.status),
          hide_in_menu: transBool2num(values?.hide_in_menu),
          is_link: transBool2num(values?.is_link),
          is_cache: transBool2num(values?.is_cache),
          is_iframe: transBool2num(values?.is_iframe),
        };

        if (action) {
          const res = await clientPost("project", "menu", values);
          if (res.status) {
            form.resetFields();
            getAllMenus();
            dispatch({
              type: "openNav",
              bool: false,
            });
            message.success("新增成功");
          }
        } else {
          const res = await clientPut("project", "menu", {
            ...values,
            id: record.id,
          });
          if (res.status) {
            form.resetFields();
            getAllMenus();
            dispatch({
              type: "openNav",
              bool: false,
            });
            message.success("修改成功");
          }
        }
      })
      .catch(() => {});
  };

  const onDeleteMenu = (record) => {
    clientDelete("project", "menu", { ids: record.id })
      .then((res) => {
        if (res.status) {
          message.success("删除成功");
          form.resetFields();
          getAllMenus();
        } else {
          message.success("删除失败");
        }
      })
      .catch(() => {});
  };

  const showDrawer = () => {
    dispatch({
      type: "open",
      bool: true,
    });
  };

  const onClose = () => {
    dispatch({
      type: "open",
      bool: false,
    });
  };

  const onCloseNav = () => {
    dispatch({
      type: "openNav",
      bool: false,
    });
  };

  const columns = [
    {
      title: "UID",
      dataIndex: "uid",
      key: "uid",
      width: 280,
      render: (text) => (
        <Text
          copyable={{ text }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: 16,
          }}
        >
          <Link
            to={`${VITE_WIN_ENGINE_HOST}/app/${appId}/page/${text}/preview`}
            target="_blank"
          >
            {text}
          </Link>
        </Text>
      ),
    },
    {
      title: "页面",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
  ];

  const items = [
    {
      label: "修改",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "配置",
      key: "2",
      icon: <UserOutlined />,
    },
    {
      label: "删除",
      key: "3",
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: "禁用",
      key: "4",
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];

  const collapseItems = [
    {
      key: "1",
      label: "菜单类型",
      children: "菜单分为：目录、菜单、按钮三种类型。",
    },
    {
      key: "2",
      label: "上级目录",
      children: "无上级目录默认为空",
    },
    {
      key: "3",
      label: "目录名称",
      children: "目录名称",
    },
    {
      key: "4",
      label: "目录图标",
      children:
        "目录图标，填写图标组件名称，需在 `src\router\router-icons.ts` 中导入并映射",
    },
    {
      key: "41",
      label: "标识",
      children: "唯一标识，页面时取页面 uid值，目录和按钮时随机生成",
    },
    {
      key: "42",
      label: "权限标识",
      children: "权限标识，也是权限字符，比如 `system:menu:list` 唯一",
    },
    {
      key: "43",
      label: "权限名称",
      children: "权限名称 对应 权限标识 `中文名称`",
    },
    {
      key: "5",
      label: "路由地址",
      children: "路由地址，如：user",
    },
    {
      key: "6",
      label: "路由名称",
      children:
        "对应路由配置文件中 `name` 只能是唯一性，配置 `http(s)://` 开头地址 则会新窗口打开",
    },
    {
      key: "7",
      label: "默认路由",
      children: "默认跳转路由地址，如：`/system/menu/menu` 多级路由情况下适用",
    },
    {
      key: "8",
      label: "路由参数",
      children: "默认携带参数",
    },
    {
      key: "9",
      label: "组件路径",
      children:
        "访问的组件路径，如：`/system/menu/menu`，默认在`views`目录下，默认 `LAYOUT` 如果是多级菜单 `ParentLayout`",
    },
    {
      key: "10",
      label: "显示排序",
      children: "数字越小越靠前",
    },
  ];

  const collapseFnItems = [
    {
      key: "61",
      label: "根路由",
      children: "如果使用 `顶部混合菜单`，必须传 true，否则左侧会显示异常",
    },
    {
      key: "71",
      label: "目录状态",
      children: "选择停用则路由将不会出现在侧边栏，也不能被访问",
    },
    {
      key: "81",
      label: "显示状态",
      children: "选择隐藏则路由将不会出现在侧边栏，但仍然可以访问",
    },
    {
      key: "91",
      label: "是否缓存",
      children:
        "选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致",
    },
    {
      key: "101",
      label: "简化路由",
      children:
        "取消自动计算根路由模式 开启之后，当菜单子菜单只有1个的时候，会直接显示子菜单",
    },
    {
      key: "11",
      label: "按钮状态",
      children: "选择停用则路由将不会出现在侧边栏，也不能被访问",
    },
  ];

  const onAdd = () => {
    setAction(true);
    setExpandedKeys([]);
    setSelectedKeys([]);
    setRecord({});
    dispatch({
      type: "openNav",
      bool: true,
    });
    setMenuType("directory");
    form.resetFields();
  };

  const onSelect = (keys, info) => {
    let current = info.node;
    let { type } = current;
    setMenuType(type);
    setSelectedKeys(keys);
  };
  const onExpand = (keys, info) => {
    setExpandedKeys(keys);
  };

  const onSearch = (keyword) => {
    getAllMenus({ title: keyword });
  };

  const onSearchPage = (value) => {
    console.log(value);
    getData({ name: value });
  };

  const onChangeTab = (newValue) => {
    setScene(newValue);
    getAllMenus({ scene: newValue });
  };

  const onChangeMenuType = (value) => {
    setMenuType(value);
  };

  const onChangeLink = (value) => {
    setExternalLink(value);
  };

  const onExpendTree = () => {
    const keys = menuData.map((item) => item.id);
    setExpandedKeys(isExpend ? [] : keys);
    setIsExpend(!isExpend);
  };

  const onPaginationChange = (current, pageSize) => {
    setPageMeta((pre) => ({ ...pre, current, pageSize }));
    getData({ current, pageSize });
  };

  const onShowSizeChange = (current, pageSize) => {
    setPageMeta((pre) => ({ ...pre, current, pageSize }));
    getData({ current, pageSize });
  };

  const labelText = {
    directory: "目录",
    menu: "菜单",
    button: "按钮",
  };

  const tabItems = [
    {
      label: "PC 导航",
      key: "pc",
      children: <></>,
    },
    {
      label: "H5 导航",
      key: "mobile",
      children: <></>,
    },
    {
      label: "App 导航",
      key: "app",
      children: <></>,
    },
    {
      label: "Mini 导航",
      key: "mini",
      children: <></>,
    },
    {
      label: "底部导航",
      key: "bottom",
      children: <></>,
    },
  ];

  const onLeafEdit = (node) => {
    dispatch({
      type: "openNav",
      bool: true,
    });
    let { status, hide_in_menu, is_link, is_cache, is_iframe } = node;
    node = {
      ...node,
      status: status === "1" ? true : false,
      hide_in_menu: hide_in_menu ? true : false,
      is_link: is_link ? true : false,
      is_cache: is_cache ? true : false,
      is_iframe: is_iframe ? true : false,
    };
    setRecord(node);
    setAction(false);
    form.setFieldsValue(node);
  };

  const onLeafShow = () => {};

  const onLeafPreview = () => {};

  const renderNodeTitle = (node: any) => (
    <>
      <Flex justify="space-between" align="center">
        <span>{node.title}</span>
        <Space>
          <Button size="small" type="text" onClick={() => onLeafEdit(node)}>
            编辑
          </Button>
          <Button size="small" type="text" onClick={onLeafShow}>
            隐藏
          </Button>
          <Popconfirm
            title="您确定要删除吗?"
            onConfirm={() => onDeleteMenu(node)}
            okText="确定"
            cancelText="取消"
          >
            <Button size="small" type="text" danger>
              删除
            </Button>
          </Popconfirm>
          <Button size="small" type="text" onClick={onLeafPreview}>
            预览
          </Button>
        </Space>
      </Flex>
    </>
  );

  return (
    <div>
      <Tabs onChange={onChangeTab} type="card" items={tabItems} />

      <Row gutter={48}>
        <Col span={10}>
          <Flex gap={24} vertical>
            <Space>
              <Button icon={<PlusOutlined />} onClick={onAdd}>
                新建
              </Button>
              <Button icon={<ControlOutlined />} onClick={onExpendTree}>
                {isExpend ? "收起" : "展开"}
              </Button>
              <Button icon={<ExceptionOutlined />} onClick={showDrawer}>
                注释
              </Button>
              <Button icon={<AlignLeftOutlined />}>配置</Button>
              <Search
                placeholder="搜索导航"
                loading={states.loading}
                allowClear
                onSearch={onSearch}
              />
            </Space>
            <DirectoryTree
              showLine
              showIcon={false}
              selectedKeys={selectedKeys}
              expandedKeys={expandedKeys}
              onSelect={onSelect}
              onExpand={onExpand}
              treeData={treeData.map((node) => {
                const mapNode = (node) => ({
                  ...node,
                  title: renderNodeTitle(node),
                  children: node.children.map(mapNode),
                });
                return mapNode(node);
              })}
            />
          </Flex>
        </Col>
        <Col span={14}>
          <Flex gap={24} vertical>
            <Space>
              <Search
                placeholder="搜索页面"
                loading={states.loadingPage}
                allowClear
                onSearch={onSearchPage}
              />
            </Space>

            <Table
              dataSource={pageMeta.list}
              loading={states.loadingPage}
              rowKey={(record) => record.id}
              size="small"
              columns={columns}
              pagination={
                pageMeta.list.length > pageMeta.pageSize && {
                  position: ["bottomCenter"],
                  showSizeChanger: true,
                  showQuickJumper: true,
                  onChange: onPaginationChange,
                  onShowSizeChange: onShowSizeChange,
                  pageSize: pageMeta.pageSize, // 每页显示记录数
                  current: pageMeta.current, // 当前页码
                  total: pageMeta.total, // 总记录数
                }
              }
            />
          </Flex>
        </Col>
      </Row>

      <Drawer
        title={`${action ? "新增" : "编辑"}导航`}
        open={states.openNav}
        onClose={onCloseNav}
        footer={
          <Flex justify="flex-end">
            <Space>
              <Button onClick={onCloseNav}>取消</Button>
              <Button type="primary" onClick={onFinish}>
                确认
              </Button>
            </Space>
          </Flex>
        }
      >
        <Form name="menu" form={form}>
          <Flex vertical gap="middle">
            <Space size="middle" direction="vertical">
              <Row>
                <Col span={6}>菜单类型：</Col>
                <Col span={18}>
                  <Form.Item name="type">
                    <SegmentedItem
                      options={[
                        {
                          label: "目录",
                          value: "directory",
                        },
                        {
                          label: "菜单",
                          value: "menu",
                        },
                        {
                          label: "按钮",
                          value: "button",
                        },
                      ]}
                      onChange={onChangeMenuType}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={6}>上级目录：</Col>
                <Col span={18}>
                  <Form.Item name="pid">
                    <TreeSelect
                      showSearch
                      style={{
                        width: "100%",
                      }}
                      dropdownStyle={{
                        maxHeight: 400,
                        overflow: "auto",
                      }}
                      placeholder="请选择"
                      allowClear
                      treeData={treeData}
                      fieldNames={{
                        label: "title",
                        value: "id",
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={6}>
                  {menuType === "directory" ? "目录" : ""}
                  {menuType === "menu" ? "菜单" : ""}
                  {menuType === "button" ? "按钮" : ""}名称：
                </Col>
                <Col span={18}>
                  <Form.Item name="title">
                    <Input
                      placeholder={`请输入${
                        menuType === "directory" ? "目录" : ""
                      }${menuType === "menu" ? "菜单" : ""}${
                        menuType === "button" ? "按钮" : ""
                      }名称`}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={6}>
                  {menuType === "directory" ? "目录" : ""}
                  {menuType === "menu" ? "菜单" : ""}
                  {menuType === "button" ? "按钮" : ""}图标：
                </Col>
                <Col span={18}>
                  <Form.Item name="icon">
                    <IconSelect></IconSelect>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={6}>
                  {menuType === "directory" ? "目录" : ""}
                  {menuType === "menu" ? "菜单" : ""}
                  {menuType === "button" ? "按钮" : ""}标识：
                </Col>
                <Col span={18}>
                  <Form.Item name="hash_sign">
                    <Input placeholder="请输入标识" />
                  </Form.Item>
                </Col>
              </Row>

              {menuType !== "button" ? (
                <Row>
                  <Col span={6}>路由地址：</Col>
                  <Col span={18}>
                    <Form.Item name="path">
                      <Input placeholder="请输入路由地址" />
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {menuType !== "button" ? (
                <Row>
                  <Col span={6}>路由名称：</Col>
                  <Col span={18}>
                    <Form.Item name="path_name">
                      <Input placeholder="请输入路由名称" />
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {menuType !== "button" ? (
                <Row>
                  <Col span={6}>组件路径：</Col>
                  <Col span={18}>
                    <Form.Item name="component">
                      <Input placeholder="请输入组件路径" />
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {/* 权限相关 */}

              {menuType !== "directory" ? (
                <Row>
                  <Col span={6}>权限标识：</Col>
                  <Col span={18}>
                    <Form.Item name="access">
                      <Input placeholder="请输入权限标识" />
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {menuType !== "directory" ? (
                <Row>
                  <Col span={6}>权限名称：</Col>
                  <Col span={18}>
                    <Form.Item name="access_name">
                      <Input placeholder="请输入权限名称" />
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {menuType !== "directory" ? (
                <Row>
                  <Col span={6}>权限描述：</Col>
                  <Col span={18}>
                    <Form.Item name="access_description">
                      <Input placeholder="请输入权限描述" />
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {menuType !== "directory" ? (
                <Row>
                  <Col span={6}>权限类型：</Col>
                  <Col span={18}>
                    <Form.Item name="access_type">
                      <Select
                        placeholder="请选择权限类型"
                        options={[
                          {
                            label: "页面权限",
                            value: "1",
                          },
                          {
                            label: "操作权限",
                            value: "2",
                          },
                          {
                            label: "数据权限",
                            value: "3",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {menuType === "button" ? (
                <Row>
                  <Col span={6}>操作方法：</Col>
                  <Col span={18}>
                    <Form.Item name="access_method">
                      <Select
                        placeholder="请选择操作方法"
                        options={[
                          {
                            label: "GET",
                            value: "GET",
                          },
                          {
                            label: "POST",
                            value: "POST",
                          },
                          {
                            label: "PUT",
                            value: "PUT",
                          },
                          {
                            label: "DELETE",
                            value: "DELETE",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {menuType === "button" ? (
                <Row>
                  <Col span={6}>访问资源：</Col>
                  <Col span={18}>
                    <Form.Item name="access_resource">
                      <Input placeholder="请输入访问资源" />
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {/* 权限相关 */}

              {menuType !== "button" ? (
                <Row>
                  <Col span={6}>默认路由：</Col>
                  <Col span={18}>
                    <Form.Item name="default_path">
                      <Input placeholder="请输入默认路由" />
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {menuType === "menu" ? (
                <Row>
                  <Col span={6}>路由参数：</Col>
                  <Col span={18}>
                    <Form.Item name="params">
                      <Input placeholder="请输入路由参数" />
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {menuType === "menu" ? (
                <Row>
                  <Col span={6}>打开方式：</Col>
                  <Col span={18}>
                    <Form.Item name="target">
                      <Select
                        placeholder="请选择打开方式"
                        style={{ width: "100%" }}
                      >
                        <Option value="_self">页签</Option>
                        <Option value="_blank">新窗口</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {menuType !== "button" ? (
                <Row>
                  <Col span={6}>显示排序：</Col>
                  <Col span={18}>
                    <Form.Item name="sort">
                      <InputNumber
                        style={{ width: "100%" }}
                        placeholder="请输入显示排序"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}
            </Space>

            <Space size="middle" direction="vertical">
              <Divider orientation="left" dashed>
                功能设置
              </Divider>

              <Row>
                <Col span={6}>
                  {menuType === "directory" ? "目录" : ""}
                  {menuType === "menu" ? "菜单" : ""}
                  {menuType === "button" ? "按钮" : ""}状态：
                </Col>
                <Col span={18}>
                  <Form.Item name="status">
                    <Switch checkedChildren="启" unCheckedChildren="停" />
                  </Form.Item>
                </Col>
              </Row>

              {menuType !== "button" ? (
                <>
                  {/* <Row>
                        <Col span={6}>根路由：</Col>
                        <Col span={18}>
                          
                          <Form.Item name="is_root">
                          <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
                            
                          </Form.Item>
                        </Col>
                      </Row> */}

                  <Row>
                    <Col span={6}>显示状态：</Col>
                    <Col span={18}>
                      <Form.Item name="hide_in_menu">
                        <Switch
                          checkedChildren="显"
                          unCheckedChildren="隐"
                          defaultChecked
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={6}>是否缓存：</Col>
                    <Col span={18}>
                      <Form.Item name="is_cache">
                        <Switch
                          checkedChildren="是"
                          unCheckedChildren="否"
                          defaultChecked
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* <Row>
                        <Col span={6}>简化路由：</Col>
                        <Col span={18}>
                          <Form.Item name="is_short">
                            <Switch
                              checkedChildren="是"
                              unCheckedChildren="否"
                              defaultChecked
                            />
                          </Form.Item>
                        </Col>
                      </Row> */}

                  <Row>
                    <Col span={6}>是否内嵌：</Col>
                    <Col span={18}>
                      <Form.Item name="is_iframe">
                        <Switch
                          checkedChildren="是"
                          unCheckedChildren="否"
                          defaultChecked={externalLink}
                          onChange={onChangeLink}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={6}>是否外链：</Col>
                    <Col span={18}>
                      <Form.Item name="is_link">
                        <Switch
                          checkedChildren="是"
                          unCheckedChildren="否"
                          defaultChecked={externalLink}
                          onChange={onChangeLink}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* {externalLink ? (
                        <Row>
                          <Col span={6}>外链地址：</Col>
                          <Col span={18}>
                            <Input placeholder="请输入外链地址" />
                          </Col>
                        </Row>
                      ) : null} */}
                </>
              ) : null}
            </Space>
          </Flex>
        </Form>
      </Drawer>

      <Drawer title="字段注释" onClose={onClose} open={states.open}>
        <Collapse
          items={collapseItems}
          bordered={false}
          defaultActiveKey={["1"]}
        />
        <Divider orientation="left" dashed>
          功能设置
        </Divider>
        <Collapse
          items={collapseFnItems}
          bordered={false}
          defaultActiveKey={["1"]}
        />
      </Drawer>
    </div>
  );
};

export default Menu;
