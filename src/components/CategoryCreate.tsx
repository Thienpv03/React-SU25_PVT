import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import Header from "./Header";

function CategoryCreate() {
  const [form] = Form.useForm();

  const addCategory = async (values: any) => {
    return await axios.post("http://localhost:3001/categories", values);
  };

  const { mutate } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      message.success("Tạo danh mục thành công");
      form.resetFields();
    },
    onError: () => {
      message.error("Tạo danh mục thất bại");
    },
  });

  const handleSubmit = async (values: any) => {
    mutate(values);
  };

  return (
    <div className="mt-6 max-w-[600px] mx-auto px-6">
        <Header />
        <br />
      <h1 className="text-3xl font-bold text-center mb-6">Create Category</h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên danh mục *"
          name="name"
          rules={[
            { required: true, message: "Tên danh mục là bắt buộc" },
            { min: 3, message: "Tên phải có ít nhất 3 ký tự" },
          ]}
        >
          <Input placeholder="Ví dụ: Premier League" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ min: 5, message: "Mô tả ít nhất 5 ký tự" }]}
        >
          <Input.TextArea rows={4} placeholder="Mô tả danh mục (nếu có)" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CategoryCreate;
