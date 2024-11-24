import { useState, useEffect } from "react";
import { Row, Col, Card, Statistic } from "antd";
import CountUp from "react-countup";

const Dashboard = () => {
  useEffect(() => {}, []);

  const formatter = (value) => <CountUp end={value as number} separator="," />;

  return (
    <div>
      <Row gutter={24}>
        <Col span={6}>
          <Card title="应用总数">
            <Statistic title="平台应用总数" value={18} formatter={formatter} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="今日新增">
            <Statistic title="今日新增应用" value={10} formatter={formatter} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="运行中">
            <Statistic title="运行中应用" value={12} formatter={formatter} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="已停服">
            <Statistic title="已停服应用" value={12} formatter={formatter} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
