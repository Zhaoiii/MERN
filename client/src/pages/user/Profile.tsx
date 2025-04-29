import { useEffect, useState } from "react";
import { Card, Typography, Spin, Descriptions } from "antd";
import { request } from "@/utils/request";
import { UserOutlined, MailOutlined } from "@ant-design/icons";

type User = {
  id: string;
  username: string;
  email: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await request.get<User>("/user/profile");

      if (result.isSuccess && result.data) {
        setUser(result.data);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return <Typography.Text>Failed to load profile</Typography.Text>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "24px auto", padding: "0 24px" }}>
      <Card title="User Information">
        <Descriptions column={1}>
          <Descriptions.Item
            label={
              <span>
                <UserOutlined /> Username
              </span>
            }
          >
            {user.username}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <MailOutlined /> Email
              </span>
            }
          >
            {user.email}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
