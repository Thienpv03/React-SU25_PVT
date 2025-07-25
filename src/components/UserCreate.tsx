import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Select, message } from "antd";
import axios from "axios";
import Header from "./Header";

function UserCreate() {
  const [form] = Form.useForm();

  const addUser = async (values: any) => {
    return await axios.post("http://localhost:3001/users", values);
  };

  const { mutate } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      message.success("Tạo người dùng thành công");
      form.resetFields();
    },
    onError: () => {
      message.error("Tạo người dùng thất bại");
    },
  });

  const handleSubmit = (values: any) => {
    mutate(values);
  };

  return (
    <div className="mt-6 max-w-[600px] mx-auto px-6">
        <Header /> <br />
      <h1 className="text-3xl font-bold text-center mb-6">Create User</h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UserCreate;
