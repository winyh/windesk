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
  Form,
  Select,
} from "antd";
import { useParams } from "react-router-dom";
import {
  PlusOutlined,
  InteractionOutlined,
  EditOutlined,
  CodeOutlined,
  TableOutlined,
  SendOutlined,
  CloudDownloadOutlined,
  DeleteOutlined,
  SwapOutlined,
  FontSizeOutlined,
  UpCircleOutlined,
  LockOutlined,
  MailOutlined,
  LinkOutlined,
  ReadOutlined,
  CalendarOutlined,
  FileZipOutlined,
  OrderedListOutlined,
  ShareAltOutlined,
  ExpandOutlined,
  BorderlessTableOutlined,
} from "@ant-design/icons";
import useStore from "@/store/index";
import {
  clientPost,
  clientPut,
  clientGetList,
  clientDelete,
  comGet,
  comPost,
  comDelete,
} from "@/request";
import HighLight from "@/component/HighLight";
import WinCode from "@/component/Code";

import "./index.css";
import { message } from "@/store/hooks";

const { Search } = Input;
const { Text } = Typography;

const Database = () => {
  const themeMode = useStore((state) => state.themeMode);

  const [form] = Form.useForm();
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
  const [tableColumns, setTableColumns] = useState([]);
  const [columnOptions, setColumnOptions] = useState([]);

  const [pageMeta, setPageMeta] = useState({
    list: [],
    pageSize: 10,
    current: 1,
    total: 10,
  });
  const [loading, setLoading] = useState(false);
  const [tables, setTables] = useState([]);
  const [record, setRecord] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sqlCode, setSqlCode] = useState({});
  const [initialValueJson, setInitialValueJson] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedRow, setSelectedRow] = useState({ name: "默认页" });

  useEffect(() => {
    getDataTable();
  }, []);

  const getDataTable = async (params = {}) => {
    await comGet(`/project/${appId}/meta/table/names`, params)
      .then((res) => {
        if (res.status) {
          const data = res.data;
          const first = data[0];
          setTables(data);
          if (first) {
            getDataColumns({ table_name: first.table_name });
            setSelectedRowIndex(0);
            setRecord(first);
            getTableDataList(first.table_name);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const getDataColumns = (params = {}) => {
    comGet(`/project/${appId}/meta/table/columns`, params)
      .then((res) => {
        if (res.status) {
          setColumnOptions(
            res.data.map((item) => ({
              label: item.COLUMN_NAME,
              value: item.COLUMN_NAME,
            }))
          );
          setTableColumns(
            res.data
              .sort((a, b) => {
                if (a.COLUMN_NAME === "id") return -1;
                if (b.COLUMN_NAME === "id") return 1;
                if (a.COLUMN_NAME.includes("id")) return -1;
                if (b.COLUMN_NAME.includes("id")) return 1;
                if (a.COLUMN_NAME.includes("_at")) return 1;
                if (b.COLUMN_NAME.includes("_at")) return -1;
                return 0;
              })
              .map((item) => ({
                dataIndex: item.COLUMN_NAME,
                key: item.COLUMN_NAME,
                width: 200,
                fixed: item.COLUMN_NAME === "id" ? "left" : null,
                title: (_, record) => (
                  <Flex justify="space-between">
                    {item.COLUMN_NAME}
                    <Space>
                      <Button
                        size="small"
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => editColumn(record)}
                      ></Button>
                      <Popconfirm
                        title="确定删除吗?"
                        onConfirm={() => deleteColumn(item)}
                      >
                        <Button
                          size="small"
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                        ></Button>
                      </Popconfirm>
                    </Space>
                  </Flex>
                ),
                render: (text) => {
                  if (String(text).length > 120) {
                    return (
                      <Text style={{ width: 200 }} ellipsis={{ tooltip: text }}>
                        {text}
                      </Text>
                    );
                  } else {
                    return text;
                  }
                },
              }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const getTableDataList = (collection, params = {}) => {
    setLoading(true);
    const { current, pageSize } = pageMeta;
    clientGetList("project", collection, {
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
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const executeNativeSql = (isQuery) => {
    comPost(`/project/${appId}/meta/table/sql`, {
      sql: sqlCode,
      isQuery,
    })
      .then((res) => {
        const { status, data } = res;
        if (status) {
          console.log({ data });
          setInitialValueJson(JSON.stringify(data, null, 2));
          message.success("执行成功");
        } else {
          message.error(`执行失败：${data}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const deleteColumn = async (col) => {
    const { status, data } = await comDelete(
      `/project/${appId}/meta/table/columns`,
      {
        table_name: record?.table_name,
        table_column: col?.COLUMN_NAME,
      }
    );

    if (status) {
      message.success("删除成功");
      getDataTable();
    } else {
      message.warning("删除失败");
    }
  };

  const onClearCode = () => {
    setInitialValueJson("");
    message.success("清空成功");
  };

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
    setPageMeta((pre) => ({ ...pre, current, pageSize }));
    getDataTable({ current, pageSize });
  };

  const onShowSizeChange = (current, pageSize) => {
    setPageMeta((pre) => ({ ...pre, current, pageSize }));
    getDataTable({ current, pageSize });
  };

  const onRowClassName = (record, index) => {
    return selectedRowIndex === index
      ? themeMode === "dark"
        ? "high-bg-dark"
        : "high-bg-light"
      : "";
  };

  // 行点击事件处理函数
  const onRowClick = (record, index) => {
    setSelectedRow(record);
    setRecord(record);
    setSelectedRowIndex(index);
    getDataColumns({
      table_name: record?.table_name,
    });
    getTableDataList(record?.table_name, {});
  };

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

  const onSearch = (value) => {
    setSearchLoading(false);
    getDataTable({ table_name: value });
  };

  const onDataSearch = (value) => {
    getTableDataList(record?.table_name, {
      [searchKeyword]: value,
    });
  };

  const onKeywordChange = (value) => {
    console.log({ value });
    setSearchKeyword(value);
  };

  const onModeChange = (value) => {
    setMode(value);
  };

  const onCodeChange = (delta, content) => {
    // console.log({ delta, content });
    setSqlCode(content);
  };

  const onConfirm = async () => {
    const ids = selectedRows.map((item) => item.id).join(",");
    const { status, data } = await clientDelete("project", "page", {
      ids: ids,
    });

    if (status) {
      message.success("删除成功");
      getTableDataList({ table_name: record?.table_name });
    } else {
      message.warning("删除失败");
    }
  };

  const deleteTable = async (record) => {
    const { status, data } = await comDelete(
      `/project/${appId}/meta/table/names`,
      {
        table_names: record?.table_name,
      }
    );

    if (status) {
      message.success("删除成功");
      getDataTable();
    } else {
      message.warning("删除失败");
    }
  };

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

  const columnsLeft = [
    {
      title: "表名",
      dataIndex: "table_name",
      key: "table_name",
    },
    {
      title: "操作",
      dataIndex: "operate",
      key: "operate",
      render: (text, record) => (
        <Space>
          <Button
            size="small"
            type="text"
            onClick={() => showDrawer(false, record)}
          >
            修改
          </Button>
          <Popconfirm
            title="您确认要删除数据表吗？"
            onConfirm={() => deleteTable(record)}
            okText="确认"
            cancelText="取消"
          >
            <Button size="small" type="text" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const columnsTable = [
    {
      title: "字段",
      dataIndex: "field",
      key: "field",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "操作",
      dataIndex: "operate",
      key: "operate",
    },
  ];

  const itemsFieldType = [
    {
      label: "UID 唯一id",
      key: "uid",
      icon: <BorderlessTableOutlined />,
      onClick: () => showDrawer(false, {}),
    },
    {
      label: "Plain Text 文本",
      key: "plain",
      icon: <EditOutlined />,
      onClick: () => showDrawer(false, {}),
    },
    {
      label: "Rich Editor 富文本",
      key: "rich",
      icon: <ReadOutlined />,
      onClick: () => showDrawer(false, {}),
    },
    {
      label: "Number 数字",
      key: "number",
      icon: <FontSizeOutlined />,
    },
    {
      label: "Bool 布尔值",
      key: "bool",
      icon: <SwapOutlined />,
    },
    {
      label: "Email 邮箱",
      key: "email",
      icon: <MailOutlined />,
    },
    {
      label: "Url 网址",
      key: "url",
      icon: <LinkOutlined />,
    },
    {
      label: "Password 密码",
      key: "pasword",
      icon: <LockOutlined />,
    },
    {
      label: "DateTime 日期时间",
      key: "datetime",
      icon: <CalendarOutlined />,
    },
    {
      label: "AutoDate 自动日期",
      key: "autodate",
      icon: <UpCircleOutlined />,
    },
    {
      label: "Enumeration 枚举",
      key: "enumeration",
      icon: <OrderedListOutlined />,
    },
    {
      label: "File 文件",
      key: "file",
      icon: <FileZipOutlined />,
    },
    {
      label: "Relation 关联",
      key: "relation",
      icon: <ShareAltOutlined />,
    },
    {
      label: "JSON 格式",
      key: "json",
      icon: <ExpandOutlined />,
    },
  ];

  return (
    <Row gutter={24} style={{ height: "100%" }}>
      <Col span={4}>
        <Flex vertical gap="middle" style={{ height: "100%" }}>
          <Space>
            <Button icon={<PlusOutlined />} onClick={() => showDrawer(true)}>
              新增数据表
            </Button>
            <Search
              placeholder="搜索数据表"
              loading={searchLoading}
              allowClear
              onSearch={onSearch}
            />
          </Space>

          <Table
            size="middle"
            dataSource={tables}
            columns={columnsLeft}
            onRow={(record, index) => ({
              onClick: () => onRowClick(record, index), // 绑定点击事件
            })}
            rowHoverable={false}
            rowClassName={(record, index) => onRowClassName(record, index)}
            virtual
            scroll={{ y: 720 }}
            pagination={false}
          />
        </Flex>
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
                  {
                    label: "Schema",
                    value: "schema",
                    icon: <InteractionOutlined />,
                  },
                ]}
                value={mode}
                onChange={onModeChange}
              ></Segmented>

              {mode === "table" ? (
                <Button icon={<PlusOutlined />}>新增列</Button>
              ) : null}

              {mode === "table" ? (
                <Space>
                  {selectedRows.length > 0 ? (
                    <Popconfirm
                      title="系统提醒"
                      description="您确认要删除数据吗?"
                      onConfirm={onConfirm}
                      onCancel={onCancel}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button danger>批量删除</Button>
                    </Popconfirm>
                  ) : null}
                  <Space>
                    <Select
                      options={columnOptions}
                      style={{ width: 160 }}
                      onChange={onKeywordChange}
                    ></Select>
                    <Search
                      placeholder="搜索数据"
                      loading={dataSearchLoading}
                      allowClear
                      onSearch={onDataSearch}
                    />
                  </Space>
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
                <Space>
                  <Button icon={<DeleteOutlined />} onClick={onClearCode}>
                    清空数据
                  </Button>
                  <Button
                    icon={<CloudDownloadOutlined />}
                    onClick={() => executeNativeSql(true)}
                  >
                    执行返回
                  </Button>
                  <Button
                    icon={<SendOutlined />}
                    onClick={() => executeNativeSql(false)}
                  >
                    仅执行
                  </Button>
                </Space>
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
              size="middle"
              rowSelection={{
                ...rowSelection,
              }}
              rowKey={(record) => record.id}
              dataSource={pageMeta.list}
              columns={tableColumns}
              scroll={{ x: "max-content" }}
              loading={loading}
              pagination={
                pageMeta.list.length > 0 && {
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
          ) : (
            <Row gutter={24}>
              <Col span={16}>
                <WinCode
                  initialValue="SELECT * FROM page"
                  options={{ useWorker: false }}
                  mode="sql"
                  onChange={onCodeChange}
                />
              </Col>
              <Col span={8}>
                <WinCode
                  initialValue={initialValueJson}
                  options={{ useWorker: false }}
                  mode="json"
                />
              </Col>
            </Row>
          )}
        </Flex>
      </Col>
      <Drawer
        title={`${action ? "新增" : "编辑"}数据表`}
        onClose={onClose}
        open={open}
        width="40%"
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
        <Form
          name="databse"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item name="table_name" label="数据表名">
            <Input placeholder="请输入数据表名" />
          </Form.Item>

          <Form.Item name="description" label="数据表描述">
            <Input.TextArea placeholder="请输入数据表描述" />
          </Form.Item>
        </Form>

        <Row gutter={16}>
          <Col offset={4} span={20}>
            <Table
              size="small"
              bordered
              dataSource={[]}
              columns={columnsTable}
            />
          </Col>
          <Col offset={4} span={20}>
            <Dropdown
              menu={{ items: itemsFieldType }}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
            >
              <Button icon={<PlusOutlined />} block style={{ marginTop: 16 }}>
                新增字段
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </Drawer>
    </Row>
  );
};

export default Database;
