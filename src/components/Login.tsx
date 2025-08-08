// src/pages/Login.tsx
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useAuth("login", {
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email);
      navigate("/products");
    },
  });

  const onFinish = (values: any) => {
    login(values);
  };

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", paddingTop: 30 }}>
      <div
        style={{
          maxWidth: 400,
          margin: "60px auto",
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 24,
          }}
        >
          Đăng nhập
        </h2>

        <Form form={form} layout="vertical" onFinish={onFinish} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Form.Item
            name="email"
            label="Email *"
            rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ" }]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu *"
            rules={[{ required: true, min: 6, message: "Mật khẩu ít nhất 6 ký tự" }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              loading={isLoading}
              block
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
