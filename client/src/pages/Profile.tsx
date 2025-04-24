import { useEffect, useState } from "react";
import { Card, Typography, Spin, Descriptions } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { request } from "../utils/request";

type User = {
  id: string;
  username: string;
  email: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await request.get<User>("/user/profile");
        if (!response.data?.data) throw new Error("Failed to fetch profile");
        setUser(response.data.data!);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  return (
    <div>
      <Card
        style={{ maxWidth: 800, margin: "0 auto" }}
        title={<Typography.Title level={3}>个人信息</Typography.Title>}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item
            label={
              <>
                <UserOutlined /> 用户名
              </>
            }
          >
            {user.username}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <MailOutlined /> 邮箱
              </>
            }
          >
            {user.email}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
