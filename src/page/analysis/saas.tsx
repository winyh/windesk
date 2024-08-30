import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Space,
  Row,
  Col,
  Card,
  Divider,
  Tabs,
  Flex,
  Typography,
} from "antd";
const Analysis = () => {
  return (
    <Row gutter={24}>
      <Col span={6}>
        <Card title="项目总数">
          <p>数据分析-（内容可以暂时放控制台，多了再开放这个）</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="今日新增">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="运行中">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="已停服">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
    </Row>
  );
};

export default Analysis;
