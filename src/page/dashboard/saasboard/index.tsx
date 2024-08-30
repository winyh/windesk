import { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";

const Dashboard = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <Row gutter={24}>
        <Col span={6}>
          <Card title="项目总数">
            <p>Card content</p>
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
    </div>
  );
};

export default Dashboard;
