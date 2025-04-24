import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2>系统概览</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="活跃用户"
              value={112893}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="团队数量" value={112} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="文件数量"
              value={1128}
              prefix={<FileOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="系统访问量"
              value={93}
              prefix={<GlobalOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="最近活动">
            <p>暂无活动记录</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="系统公告">
            <p>欢迎使用后台管理系统</p>
            <p>系统版本：1.0.0</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
