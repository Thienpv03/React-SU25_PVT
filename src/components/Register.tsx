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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
      <h2 className="text-2xl mb-4 text-center">Đăng ký</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ role: "user" }}
      >
        <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

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

        <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
          <Select options={[{ label: "User", value: "user" }, { label: "Admin", value: "admin" }]} />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading}
            className="w-full"
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
