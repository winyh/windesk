import { useEffect, useState, useRef } from "react";
import {
  Col,
  Row,
  List,
  Input,
  Flex,
  Space,
  Button,
  Dropdown,
  Table,
  Segmented,
  Popconfirm,
  Drawer,
  Tabs,
  Divider,
  Tag,
  Alert,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import {
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  CodeOutlined,
  TableOutlined,
  SendOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import SuperForm from "@/component/SuperForm";
import HighLight from "@/component/HighLight";
import WinCode from "@/component/Code";

const { Search } = Input;
const { Text } = Typography;

const Database = () => {
  const formRef = useRef();
  const { appId } = useParams();
  const [mode, setMode] = useState("table");
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [docOpen, setDocOpen] = useState(false);
  const [action, setAction] = useState(true);
  const [activeKey, setActiveKey] = useState("js");
  const [docType, setDocType] = useState("api");
  const [searchLoading, setSearchLoading] = useState(false);
  const [dataSearchLoading, setDataSearchLoading] = useState(false);
  const [paginationMeta, setPaginationMeta] = useState({
    pageSize: 10,
    current: 1,
    total: 10,
  });
  const [record, setRecord] = useState({});
  const data = ["user", "article", "role", "admin", "category"];

  console.log({ appId });

  const showDrawer = (bool, record) => {
    setAction(bool);
    setOpen(true);
    setRecord(record);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onDocClose = () => {
    setDocOpen(false);
  };

  const onDocShow = () => {
    setDocOpen(true);
  };

  const onDocChange = (type) => {
    setDocType(type);
  };

  const onFinish = () => {
    formRef?.current?.form
      .validateFields()
      .then(async (values) => {
        console.log({ values });
      })
      .catch(() => {});
  };

  const items = [
    {
      label: "修改",
      key: "1",
      icon: <EditOutlined />,
      onClick: () => showDrawer(false, {}),
    },
    {
      label: "配置",
      key: "2",
      icon: <SettingOutlined />,
    },
    {
      label: "删除",
      key: "3",
      icon: <DeleteOutlined />,
      danger: true,
      disabled: true,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const onPaginationChange = (current, pageSize) => {
    setPaginationMeta((pre) => ({ ...pre, current, pageSize }));
    getData({ current, pageSize });
  };

  const onShowSizeChange = (current, pageSize) => {
    setPaginationMeta((pre) => ({ ...pre, current, pageSize }));
    getData({ current, pageSize });
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const formData = [
    {
      label: "数据表名称",
      name: "table_name",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入数据表名称",
    },
    {
      label: "数据表描述",
      name: "description",
      is: "Input.TextArea",
      itemSpan: 24,
      placeholder: "请输入数据表描述",
    },
  ];

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
    },
  ];

  const paramsColumns = [
    {
      title: "参数",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
  ];

  const paramsSources = [
    {
      key: 1,
      name: "name",
      type: "String",
      description: "名称",
    },
  ];

  const onSearch = () => {
    setSearchLoading(false);
  };

  const onDataSearch = () => {};

  const onModeChange = (value) => {
    setMode(value);
  };

  const onCodeChange = (delta, content) => {
    // console.log({ delta, content });
  };

  const onConfirm = () => {};

  const onCancel = () => {};

  const onDocTypeChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  const tabContent = [
    {
      label: "JavaScript",
      key: "js",
      children: (
        <HighLight
          language="js"
          code={`
import { createClient } from '@winbase/winbase-js'

const winbaseUrl = 'https://cwbtvnofqvimqiyznkbt.winbase.io'
const winbaseKey = process.env.WINBASE_KEY
const winbase = createClient(winbaseUrl, winbaseKey)`}
        />
      ),
    },
    {
      label: "Node",
      key: "node",
      children: <HighLight language="js" code='const developer = "winyh"' />,
    },
    {
      label: "Python",
      key: "python",
      children: (
        <HighLight
          language="python"
          code={`def all_unique(lst): 
          x = [1, 1, 2, 2, 3, 2, 3, 4, 5, 6] 
          y = [1, 2,
          3, 4, 5] all_unique(x) # False{" "}`}
        />
      ),
    },
  ];

  const tabItems = [
    {
      key: "list",
      label: "列表",
      children: (
        <Flex vertical gap={16}>
          <Space>
            列表 <Tag color="cyan">POST</Tag>
          </Space>
          <Space>分页获取数据-支持过滤</Space>
          <Tabs
            activeKey={activeKey}
            type="card"
            size="small"
            items={tabContent}
            onChange={onDocTypeChange}
          />
          <Divider orientation="left" orientationMargin={0}>
            接口详情
          </Divider>
          <Alert
            message={
              <Space>
                <Tag color="#55acee">POST</Tag>

                <Text
                  copyable={{
                    text: "/api/collections/posts/records/:id",
                  }}
                >
                  /api/collections/posts/records/:id
                </Text>
              </Space>
            }
            type="info"
          />
          <Divider orientation="left" orientationMargin={0}>
            路径参数
          </Divider>

          <Table
            dataSource={paramsSources}
            columns={paramsColumns}
            bordered
            pagination={false}
          />

          <Divider orientation="left" orientationMargin={0}>
            查询参数
          </Divider>

          <Table
            dataSource={paramsSources}
            columns={paramsColumns}
            bordered
            pagination={false}
          />

          <Divider orientation="left" orientationMargin={0}>
            接口响应
          </Divider>

          <HighLight
            language="json"
            code={`{
  "id": "RECORD_ID",
  "collectionId": "BHKW36mJl3ZPt6z",
  "collectionName": "posts",
  "created": "2022-01-01 01:00:00.123Z",
  "updated": "2022-01-01 23:59:59.456Z",
  "title": "test",
  "description": "test",
  "active": true,
  "options": [
    "optionA"
  ],
  "featuredImages": [
    "filename.jpg"
  ]
}`}
          />
        </Flex>
      ),
    },
    {
      key: "search",
      label: "查询",
      children: (
        <Flex vertical gap={8}>
          <Space>
            查询 <Tag color="cyan">GET</Tag>
          </Space>
          <div>获取数据-支持过滤</div>
          <Divider></Divider>
          <Tabs
            activeKey={activeKey}
            type="card"
            size="small"
            items={tabContent}
            onChange={onDocTypeChange}
          />
        </Flex>
      ),
    },
    {
      key: "view",
      label: "详情",
      children: "Content of Tab Pane 2",
    },
    {
      key: "create",
      label: "新增",
      children: "Content of Tab Pane 2",
    },
    {
      key: "delete",
      label: "删除",
      children: "Content of Tab Pane 2",
    },
    {
      key: "update",
      label: "更新",
      children: "Content of Tab Pane 2",
    },
  ];

  return (
    <Row gutter={24} style={{ height: "100%" }}>
      <Col span={4}>
        <List
          header={
            <Search
              placeholder="搜索数据表"
              loading={searchLoading}
              allowClear
              onSearch={onSearch}
            />
          }
          footer={
            <Button
              type="text"
              block
              icon={<PlusOutlined />}
              onClick={() => showDrawer(true)}
            >
              新增数据表
            </Button>
          }
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item}>
              <List.Item.Meta title={item} />
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomLeft"
              >
                <Button type="text" icon={<MoreOutlined />}></Button>
              </Dropdown>
            </List.Item>
          )}
        />
      </Col>
      <Col span={20}>
        <Flex vertical gap="middle" style={{ height: "100%" }}>
          <Flex justify="space-between">
            <Space size="middle">
              <Segmented
                options={[
                  {
                    label: "Table",
                    value: "table",
                    icon: <TableOutlined />,
                  },
                  {
                    label: "SQL",
                    value: "sql",
                    icon: <CodeOutlined />,
                  },
                ]}
                value={mode}
                onChange={onModeChange}
              ></Segmented>
              {mode === "table" ? (
                <Space>
                  {selectedRows.length > 0 ? (
                    <Popconfirm
                      title="系统提醒"
                      description="您确认要删除数据表吗?"
                      onConfirm={onConfirm}
                      onCancel={onCancel}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button danger>批量删除</Button>
                    </Popconfirm>
                  ) : null}
                  <Search
                    placeholder="搜索数据"
                    loading={dataSearchLoading}
                    onSearch={onDataSearch}
                  />
                </Space>
              ) : null}
            </Space>
            <Space size="middle">
              {mode === "table" ? (
                <Space>
                  <Button onClick={onDocShow}>API / GraphQL</Button>
                  <Button icon={<PlusOutlined />}>新增记录</Button>
                </Space>
              ) : (
                <Button icon={<SendOutlined />}>运行脚本</Button>
              )}
            </Space>
          </Flex>

          <Drawer
            title="文档"
            onClose={onDocClose}
            open={docOpen}
            width="40%"
            extra={
              <Segmented
                value={docType}
                options={[
                  {
                    label: "API 接口",
                    value: "api",
                  },
                  {
                    label: "GraphQL",
                    value: "graphql",
                  },
                ]}
                onChange={onDocChange}
              />
            }
          >
            <Tabs tabPosition="left" items={tabItems} />
          </Drawer>

          {mode === "table" ? (
            <Table
              rowSelection={{
                ...rowSelection,
              }}
              rowKey={(record) => record.key}
              dataSource={dataSource}
              columns={columns}
              pagination={
                dataSource.length > 0 && {
                  position: ["bottomCenter"],
                  showSizeChanger: true,
                  showQuickJumper: true,
                  onChange: onPaginationChange,
                  onShowSizeChange: onShowSizeChange,
                  pageSize: paginationMeta.pageSize, // 每页显示记录数
                  current: paginationMeta.current, // 当前页码
                  total: paginationMeta.total, // 总记录数
                }
              }
            />
          ) : (
            <WinCode
              initialValue="SELECT * FROM users"
              options={{ useWorker: false }}
              mode="sql"
              onChange={onCodeChange}
            />
          )}
        </Flex>
      </Col>
      <Drawer
        title={`${action ? "新增" : "编辑"}数据表`}
        onClose={onClose}
        open={open}
        footer={
          <Flex justify="flex-end">
            <Space>
              <Button onClick={onClose}>取消</Button>
              <Button type="primary" onClick={onFinish}>
                确认
              </Button>
            </Space>
          </Flex>
        }
      >
        <SuperForm
          ref={formRef}
          data={formData}
          layout={layout}
          limit={6}
          initialValues={record}
          rulesValid={false}
          btnAction={false}
        ></SuperForm>
      </Drawer>
    </Row>
  );
};

export default Database;
