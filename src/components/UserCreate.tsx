import { Button, Form, Input, Select, message } from "antd";
import Header from "./Header";
import { useCreate } from "../hooks/UseCreate";

function UserCreate() {
  const [form] = Form.useForm();
  const createUser = useCreate("users");

  const handleSubmit = (values: any) => {
    createUser.mutate(values, {
      onSuccess: () => {
        message.success("Tạo người dùng thành công");
        form.resetFields();
      },
      onError: () => {
        message.error("Tạo người dùng thất bại");
      },
    });
  };

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", paddingTop: 30 }}>
      <Header />
      <div
        style={{
          maxWidth: 600,
          margin: "40px auto",
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>
          Tạo người dùng
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <Form.Item
            label="Họ tên *"
            name="name"
            rules={[
              { required: true, message: "Họ tên là bắt buộc" },
              { min: 3, message: "Họ tên ít nhất 3 ký tự" },
            ]}
          >
            <Input placeholder="Nguyễn Văn A" />
          </Form.Item>

          <Form.Item
            label="Email *"
            name="email"
            rules={[
              { required: true, message: "Email là bắt buộc" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="example@gmail.com" />
          </Form.Item>

          <Form.Item
            label="Vai trò *"
            name="role"
            rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
          >
            <Select placeholder="Chọn vai trò">
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="user">Khách hàng</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
            >
              Thêm người dùng
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default UserCreate;
