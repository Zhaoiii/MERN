import { Card, Form, Input, Button, Typography, Space, message } from "antd";
import {
  UserAddOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { authService } from "@/services/auth";
import { Link } from "react-router-dom";

export default function Register() {
  const [form] = Form.useForm();

  const handleSubmit = async (values: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    const result = await authService.register({
      username: values.username,
      email: values.email,
      password: values.password,
    });

    if (result.isSuccess) {
      message.success("Registration successful! Please login.");
      window.location.href = "/login";
    } else {
      message.error(result.error || "Registration failed");
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
            <UserAddOutlined />
            <span>User Registration</span>
          </Space>
        }
      >
        <Form
          form={form}
          name="register"
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
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
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

          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Register Now
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          <Typography.Text>
            Already have an account?{" "}
            <Link to="/login">
              <Button type="link" size="small">
                Login
              </Button>
            </Link>
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
}
