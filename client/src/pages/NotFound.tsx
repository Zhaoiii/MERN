import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const NotFound: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={
        <Link to="/dashboard">
          <Button type="primary" icon={<HomeOutlined />}>
            返回首页
          </Button>
        </Link>
      }
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    />
  );
};

export default NotFound;
