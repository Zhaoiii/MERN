import useAuthStore from "@/store/useAuthStore";
import { Typography, Button, Card, Space } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div style={{ maxWidth: 500, margin: "24px auto", padding: "0 24px" }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Welcome {user?.username}
      </Title>

      <Card style={{ boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.05)" }}>
        <Paragraph style={{ marginBottom: 24, color: "rgba(0, 0, 0, 0.45)" }}>
          This is a responsive homepage example built with Ant Design
        </Paragraph>

        {!user && (
          <Space size="middle">
            <Link to="/register">
              <Button
                type="primary"
                size="large"
                style={{
                  padding: "0 32px",
                  height: 48,
                  fontSize: "16px",
                }}
              >
                Register
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="large"
                style={{
                  padding: "0 32px",
                  height: 48,
                  fontSize: "16px",
                }}
              >
                Login
              </Button>
            </Link>
          </Space>
        )}
      </Card>
    </div>
  );
}
