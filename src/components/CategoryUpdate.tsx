import { Button, Form, Input, Spin, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Header from "./Header";
import { useUpdate } from "../hooks/UseUpdate";

function CategoryUpdate() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: category, isLoading } = useQuery({
    queryKey: ["category", id],
    enabled: !!id,
    queryFn: async () =>
      (await axios.get(`http://localhost:3001/categories/${id}`)).data,
  });

  const updateCategory = useUpdate("categories");

  const handleSubmit = (values: any) => {
    if (!id) return;
    updateCategory.mutate(
      { id, values },
      {
        onSuccess: () => {
          message.success("Cập nhật danh mục thành công");
          navigate("/categories");
        },
        onError: () => {
          message.error("Cập nhật thất bại");
        },
      }
    );
  };

  if (isLoading) return <Spin className="block mx-auto mt-10" />;

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
          Cập nhật danh mục
        </h2>

        <Form
          form={form}
          layout="vertical"
          initialValues={category}
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
            <Button type="primary" htmlType="submit" block loading={updateCategory.isPending}>
              Cập nhật danh mục
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default CategoryUpdate;
