// src/pages/Register.tsx
import { Button, Form, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { mutate: register, isLoading } = useAuth("register", {
    onSuccess: () => navigate("/login"),
  });

  const onFinish = (values: any) => {
    register(values);
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
          Đăng ký
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ role: "user" }}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <Form.Item
            name="name"
            label="Tên *"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input placeholder="Nhập tên của bạn" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email *"
            rules={[
              { required: true, type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu *"
            rules={[
              { required: true, min: 6, message: "Mật khẩu ít nhất 6 ký tự" },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          
          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu *"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Vai trò *"
            rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
          >
            <Select
              options={[
                { label: "User", value: "user" },
                { label: "Admin", value: "admin" },
              ]}
              placeholder="Chọn vai trò"
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" loading={isLoading} block>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
