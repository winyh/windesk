import { useState, useEffect } from "react";
import { Row, Col, Card, Statistic } from "antd";
import CountUp from "react-countup";

import { comGet } from "@/request";

const Dashboard = () => {
  const [appData, setAppData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data, status } = await comGet("/admin/application/data");
    if (status) {
      setAppData(data);
    }
  };

  const formatter = (value) => <CountUp end={value as number} separator="," />;

  return (
    <div>
      <Row gutter={24}>
        <Col span={6}>
          <Card title="应用总数">
            <Statistic
              title="平台应用总数"
              value={appData?.total}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="今日新增">
            <Statistic
              title="今日新增应用"
              value={appData?.todayCount}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="运行中">
            <Statistic
              title="运行中应用"
              value={appData?.runCount}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="已停服">
            <Statistic
              title="已停服应用"
              value={appData?.stopCount}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
