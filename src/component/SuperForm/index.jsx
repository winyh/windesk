import React, { useImperativeHandle, useState, useEffect } from "react";
import Component from "../CustomTag";
import { Row, Col, Form, Button, Space } from "antd";
import {
  DownOutlined,
  UpOutlined,
  SearchOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { computedWrapperCol } from "@/utils/index";

/*
 * @desc 超级表单
 * @params { data } array 表单项
 * @params { initialValues } object 初始化值
 * @params { layout } string 表单单项布局 horizontal | vertical
 * @params { gutter } number|object 栅格间隔(16+8n), 响应式可以写成 { xs: 8, sm: 16, md: 24, lg: 32 }
 * @params { span } number 表单项切分
 * @params { labelCol } number 标签布局 可设置 span offset, 也可以设置成响应式
 * @params { wrapperCol } number 标签布局 可设置 span offset, 也可以设置成响应式
 * @params { limit } number 限制展示几项-多余的折叠
 * @params { onFinish } function 表单验证成功
 * @params { onFinishFailed } function 表单验证失败
 * @params { onReset } function 表单重置
 * @params { btnAction } boolean 是否隐藏提交和重置操作，默认true
 * @params { rulesValid } boolean 是否启用表单验证，默认false
 * @params { ref } ref 节点
 */
const SuperForm = (
  {
    data = [],
    initialValues,
    layout = "horizontal",
    labelCol = {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
      md: {
        span: 6,
      },
      lg: {
        span: 6,
      },
      xl: {
        span: 6,
      },
      xxl: {
        span: 6,
      },
    },
    wrapperCol = {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
      md: {
        span: 18,
      },
      lg: {
        span: 18,
      },
      xl: {
        span: 18,
      },
      xxl: {
        span: 18,
      },
    },
    gutter = { xs: 8, sm: 16, md: 24, lg: 32 },
    itemResponsive = {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
      md: {
        span: 12,
      },
      lg: {
        span: 12,
      },
      xl: {
        span: 6,
      },
      xxl: {
        span: 6,
      },
    },
    limit = 100,
    onFinish,
    onFinishFailed,
    onReset,
    rulesValid = false,
    btnAction = true,
    btnText = "查询",
    ...restFormProps
  },
  ref
) => {
  const [form] = Form.useForm();

  const [expand, setExpand] = useState(false);
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    form,
  }));

  useEffect(() => form.resetFields(), [initialValues]);

  /*
   * @desc 请求数据时 查询按钮的 Loading 状态控制
   */
  const getDataCallBack = (status) => {
    setLoading(status);
  };

  /*
   * @desc 表单校验成功处理
   * @params { values } object 表单值对象
   */
  const handleFinish = (values) => {
    onFinish ? onFinish(values, getDataCallBack) : null;
  };

  /*
   * @desc 表单校验失败处理
   * @params { values } object 表单值对象
   */
  const handleFinishFailed = (values) => {
    onFinishFailed ? onFinishFailed(values) : null;
  };

  /*
   * @desc 表单重置处理
   */
  const handleReset = () => {
    form.resetFields();
    if (onReset) {
      onReset();
    }
  };

  /*
   * @desc 表单展开折叠
   */
  const handleExpand = () => {
    setExpand(!expand);
  };

  /*
   * @desc 按钮项布局
   */
  const itemWrapperCol = computedWrapperCol(labelCol);

  /*
   * @desc 实际展示数据
   */
  const showData = () => (expand ? data : data.slice(0, limit));

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      initialValues={initialValues}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      scrollToFirstError={true}
      {...restFormProps}
    >
      <Row gutte={gutter}>
        {showData().map((item, index) => {
          let {
            label,
            name,
            rules,
            valuePropName,
            hideInSearch,
            hideInForm,
            labelCol,
            wrapperCol,
            itemSpan,
            extra,
            ...restProps
          } = item;

          if (itemSpan) {
            return (
              <Col key={index} span={itemSpan}>
                <Form.Item
                  label={label}
                  name={name}
                  extra={extra}
                  labelCol={labelCol}
                  wrapperCol={wrapperCol}
                  rules={rulesValid ? rules : null}
                  valuePropName={valuePropName}
                >
                  <Component {...restProps}></Component>
                </Form.Item>
              </Col>
            );
          } else {
            return (
              <Col key={index} {...itemResponsive}>
                <Form.Item
                  label={label}
                  name={name}
                  extra={extra}
                  rules={rulesValid ? rules : null}
                  valuePropName={valuePropName}
                >
                  <Component {...restProps}></Component>
                </Form.Item>
              </Col>
            );
          }
        })}

        {btnAction && data.length > 0 ? (
          <Col {...itemResponsive}>
            <Form.Item wrapperCol={itemWrapperCol}>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<SearchOutlined />}
                >
                  {btnText}
                </Button>

                <Button
                  htmlType="button"
                  onClick={handleReset}
                  icon={<RedoOutlined />}
                >
                  重置
                </Button>

                {limit < data.length ? (
                  <Button type="link" onClick={handleExpand}>
                    {expand ? "收起" : "展开"}
                    {expand ? <UpOutlined /> : <DownOutlined />}
                  </Button>
                ) : null}
              </Space>
            </Form.Item>
          </Col>
        ) : null}
      </Row>
    </Form>
  );
};

export default React.forwardRef(SuperForm);
