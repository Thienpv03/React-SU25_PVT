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
        <h2
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 24,
          }}
        >
          Thêm danh mục
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
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

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Tạo danh mục
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default CategoryCreate;
