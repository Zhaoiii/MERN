import { Card, Form, Input, Button, Typography, Space, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import useAuthStore from "@/store/useAuthStore";
import { Link } from "react-router-dom";

export default function Login() {
  const store = useAuthStore();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    const result = await store.login(values);

    if (result.isSuccess) {
      window.location.href = "/user";
    } else {
      message.error(result.error || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 400,
          boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.05)",
        }}
        title={
          <Space>
            <LockOutlined />
            <span>User Login</span>
          </Space>
        }
      >
        <Form
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Login Now
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          <Typography.Text>
            Don't have an account?{" "}
            <Link to="/register">
              <Button type="link" size="small">
                Register Now
              </Button>
            </Link>
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
}
