import { useState, useRef, useEffect } from "react";
import { Input, Tabs, Row, Col, Typography } from "antd";
import * as antdIcons from "@ant-design/icons";
import copy from "copy-to-clipboard";
import "./index.css";

import { modal, message } from "@/store/hooks";

import { IconFont } from "../IconFont";

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <title>heart icon</title>
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const IconSelect = ({ onChange, value, id }) => {
  const [icon, setIcon] = useState("");
  const [activeKey, setActiveKey] = useState("antd");
  const { createFromIconfontCN, ...restIcons } = antdIcons;

  const onIconChange = (changeValue) => {
    setIcon(changeValue);
    onChange && onChange(changeValue);
  };

  const onCopy = (icon) => {
    copy(`<${icon} />`);
    setIcon(icon);
    onChange && onChange(icon);
    message.success(`已选中 <${icon} /> 成功`);
  };

  const items = [
    {
      key: "antd",
      label: "内置图标",
      children: (
        <div className="icon-content">
          <Row gutter={[16, 16]}>
            {Object.keys(restIcons).map((icon, index) => {
              // fix getTwoToneColor 暂时去掉双色图标
              if (icon !== "default" && icon !== "getTwoToneColor") {
                return (
                  <Col span={2} onClick={() => onCopy(icon)} key={icon + index}>
                    <div className="icon-card">
                      <IconFont icon={icon} style={{ fontSize: 24 }} />
                    </div>
                  </Col>
                );
              }
            })}
          </Row>
        </div>
      ),
    },
    {
      key: "third",
      label: "三方图标",
      children: "三方图标",
    },
    {
      key: "custom",
      label: "自定义图标",
      children: "自定义图标",
    },
  ];

  const onTabChange = (value) => {
    console.log({ value });
    setActiveKey(value);
  };

  const onClick = () => {
    modal.confirm({
      title: "请选择图标",
      closable: true,
      width: "50%",
      icon: <></>,
      content: (
        <Tabs
          defaultActiveKey={activeKey}
          activeKey={activeKey}
          items={items}
          onChange={onTabChange}
        />
      ),
      okText: "确定",
      cancelText: "取消",
    });
  };

  return (
    <Input
      id={id}
      value={value || icon}
      onChange={onIconChange}
      onClick={onClick}
      addonBefore={
        icon ? (
          <IconFont icon={icon || value} />
        ) : (
          <IconFont icon="QuestionCircleOutlined" />
        )
      }
      placeholder="请选择图标"
    />
  );
};

export { IconSelect };
export default IconSelect;
