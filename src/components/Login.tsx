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
      navigate("/products");
    },
  });

  const onFinish = (values: any) => {
    login(values);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
      <h2 className="text-2xl mb-4 text-center">Đăng nhập</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading}
            className="w-full"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
