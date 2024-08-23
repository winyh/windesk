import { useState } from "react";
import {
  Col,
  Row,
  List,
  Input,
  Flex,
  Space,
  Button,
  Select,
  Table,
  InputNumber,
  Divider,
  Card,
  Tree,
  Segmented,
  Switch,
  TreeSelect,
  Drawer,
  Collapse,
} from "antd";

import {
  PlusOutlined,
  MoreOutlined,
  UserOutlined,
  CodeOutlined,
  QuestionOutlined,
  ExceptionOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { DirectoryTree } = Tree;
const { Option } = Select;

const Menu = () => {
  const [value, setValue] = useState();
  const [menuType, setMenuType] = useState("directory");
  const [externalLink, setExternalLink] = useState(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const data = ["user", "article", "role", "admin", "category"];

  const treeData = [
    {
      title: "控制台",
      key: "0-0",
      children: [
        {
          title: "leaf 0-0",
          key: "0-0-0",
          isLeaf: true,
        },
        {
          title: "leaf 0-1",
          key: "0-0-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "租户管理",
      key: "0-1",
      children: [
        {
          title: "leaf 1-0",
          key: "0-1-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-1-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "应用管理",
      key: "0-2",
      children: [
        {
          title: "leaf 1-0",
          key: "0-2-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-2-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "数据库",
      key: "0-3",
      children: [
        {
          title: "leaf 1-0",
          key: "0-3-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-3-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "云函数",
      key: "0-4",
      children: [
        {
          title: "leaf 1-0",
          key: "0-3-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-3-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "文件存储",
      key: "0-5",
      children: [
        {
          title: "leaf 1-0",
          key: "0-3-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-3-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "AI助手",
      key: "0-6",
      children: [
        {
          title: "leaf 1-0",
          key: "0-3-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-3-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "分析监控",
      key: "0-7",
      children: [
        {
          title: "leaf 1-0",
          key: "0-3-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-3-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "权限管理",
      key: "0-8",
      children: [
        {
          title: "leaf 1-0",
          key: "0-3-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-3-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "系统配置",
      key: "0-9",
      children: [
        {
          title: "leaf 1-0",
          key: "0-3-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-3-1",
          isLeaf: true,
        },
      ],
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

  const text = (
    <p
      style={{
        paddingLeft: 24,
      }}
    >
      A dog is a type of domesticated animal. Known for its loyalty and
      faithfulness, it can be found as a welcome guest in many households across
      the world.
    </p>
  );

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
      key: "33",
      label: "权限标识",
      children: "权限标识，也是权限字符，比如 `system:menu:list` 唯一",
    },
    {
      key: "44",
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

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const onSelect = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };
  const onExpand = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  const onChange = (newValue) => {
    setValue(newValue);
  };
  const onPopupScroll = (e) => {
    console.log("onPopupScroll", e);
  };

  const dataSource = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];

  const columns = [
    {
      title: "文件名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "文件ID",
      dataIndex: "hash",
      key: "hash",
    },
    {
      title: "文件后缀",
      dataIndex: "suffix",
      key: "suffix",
    },
    {
      title: "大小",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text) => (
        <Space>
          <span>增加子项</span>
          <Divider />
          <span>分配角色</span>
          <Divider />
        </Space>
      ),
    },
  ];

  const onChangeMenuType = (value) => {
    setMenuType(value);
  };

  const onChangeLink = (value) => {
    setExternalLink(value);
    console.log(value);
  };

  return (
    <Row gutter={24}>
      <Col span={6}>
        <Card
          title={
            <Space>
              <Button type="text" block icon={<PlusOutlined />}>
                新增菜单
              </Button>
              <Search placeholder="搜索菜单" />
            </Space>
          }
        >
          <DirectoryTree
            multiple
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
          />
        </Card>
      </Col>
      <Col span={18}>
        <Card
          title={
            <Flex justify="space-between">
              <Space size="middle">
                <Button type="primary">保存菜单</Button>
                <Button danger>
                  删除{menuType === "directory" ? "目录" : ""}
                  {menuType === "menu" ? "菜单" : ""}
                  {menuType === "button" ? "按钮" : ""}
                </Button>
              </Space>
              <Space size="middle">
                <Button icon={<ExceptionOutlined />} onClick={showDrawer}>
                  字段注释
                </Button>
              </Space>
            </Flex>
          }
        >
          <Flex vertical gap="middle">
            <Space size="middle" direction="vertical">
              <Row>
                <Col span={4}>菜单类型：</Col>
                <Col span={8}>
                  <Segmented
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
                    value={menuType}
                    onChange={onChangeMenuType}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={4}>上级目录：</Col>
                <Col span={8}>
                  <TreeSelect
                    showSearch
                    value={value}
                    style={{
                      width: "100%",
                    }}
                    dropdownStyle={{
                      maxHeight: 400,
                      overflow: "auto",
                    }}
                    placeholder="请选择"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChange}
                    treeData={treeData}
                    onPopupScroll={onPopupScroll}
                  />
                </Col>
              </Row>

              <Row>
                <Col span={4}>目录名称：</Col>
                <Col span={8}>
                  <Input placeholder="请输入目录名称" />
                </Col>
              </Row>

              <Row>
                <Col span={4}>目录图标：</Col>
                <Col span={8}>
                  <Input placeholder="请选择目录图标" />
                </Col>
              </Row>

              {/* 权限相关 */}

              {menuType !== "directory" ? (
                <Row>
                  <Col span={4}>权限标识：</Col>
                  <Col span={8}>
                    <Input placeholder="请输入权限标识" />
                  </Col>
                </Row>
              ) : null}

              {menuType !== "directory" ? (
                <Row>
                  <Col span={4}>权限名称：</Col>
                  <Col span={8}>
                    <Input placeholder="请输入权限名称" />
                  </Col>
                </Row>
              ) : null}

              {/* 权限相关 */}

              <Row>
                <Col span={4}>路由地址：</Col>
                <Col span={8}>
                  <Input placeholder="请输入路由地址" />
                </Col>
              </Row>

              <Row>
                <Col span={4}>路由名称：</Col>
                <Col span={8}>
                  <Input placeholder="请输入路由名称" />
                </Col>
              </Row>

              <Row>
                <Col span={4}>默认路由：</Col>
                <Col span={8}>
                  <Input placeholder="请输入默认路由" />
                </Col>
              </Row>

              <Row>
                <Col span={4}>路由参数：</Col>
                <Col span={8}>
                  <Input placeholder="请输入路由参数" />
                </Col>
              </Row>

              <Row>
                <Col span={4}>打开方式：</Col>
                <Col span={8}>
                  <Select
                    placeholder="请输入路由参数"
                    style={{ width: "100%" }}
                  >
                    <Option value="tab">页签</Option>
                    <Option value="window">新窗口</Option>
                  </Select>
                </Col>
              </Row>

              <Row>
                <Col span={4}>组件路径：</Col>
                <Col span={8}>
                  <Input placeholder="请输入组件路径" />
                </Col>
              </Row>

              <Row>
                <Col span={4}>显示排序：</Col>
                <Col span={8}>
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="请输入显示排序"
                  />
                </Col>
              </Row>
            </Space>

            <Space size="middle" direction="vertical">
              <Divider orientation="left" dashed>
                功能设置
              </Divider>

              {menuType === "button" ? (
                <Row>
                  <Col span={4}>按钮状态：</Col>
                  <Col span={8}>
                    <Segmented
                      options={[
                        {
                          label: "启用",
                          value: "1",
                        },
                        {
                          label: "停用",
                          value: "0",
                        },
                      ]}
                      onChange={(value) => {
                        console.log(value); // string
                      }}
                    />
                  </Col>
                </Row>
              ) : null}

              {menuType !== "button" ? (
                <>
                  <Row>
                    <Col span={4}>根路由：</Col>
                    <Col span={8}>
                      <Switch
                        checkedChildren="是"
                        unCheckedChildren="否"
                        defaultChecked
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col span={4}>目录状态：</Col>
                    <Col span={8}>
                      <Segmented
                        options={[
                          {
                            label: "启用",
                            value: "1",
                          },
                          {
                            label: "停用",
                            value: "0",
                          },
                        ]}
                        onChange={(value) => {
                          console.log(value); // string
                        }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col span={4}>显示状态：</Col>
                    <Col span={8}>
                      <Segmented
                        options={[
                          {
                            label: "显示",
                            value: "1",
                          },
                          {
                            label: "隐藏",
                            value: "0",
                          },
                        ]}
                        onChange={(value) => {
                          console.log(value); // string
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4}>是否缓存：</Col>
                    <Col span={8}>
                      <Switch
                        checkedChildren="是"
                        unCheckedChildren="否"
                        defaultChecked
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4}>简化路由：</Col>
                    <Col span={8}>
                      <Switch
                        checkedChildren="是"
                        unCheckedChildren="否"
                        defaultChecked
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col span={4}>是否外链：</Col>
                    <Col span={8}>
                      <Switch
                        checkedChildren="是"
                        unCheckedChildren="否"
                        defaultChecked={externalLink}
                        onChange={onChangeLink}
                      />
                    </Col>
                  </Row>
                  {externalLink ? (
                    <Row>
                      <Col span={4}>外链地址：</Col>
                      <Col span={8}>
                        <Input placeholder="请输入外链地址" />
                      </Col>
                    </Row>
                  ) : null}
                </>
              ) : null}
            </Space>
          </Flex>
          <Drawer title="字段注释" onClose={onClose} open={open}>
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
        </Card>
      </Col>
    </Row>
  );
};

export default Menu;
