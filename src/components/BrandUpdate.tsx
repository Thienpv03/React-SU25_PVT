import { Button, Form, Input, message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useUpdate } from "../hooks/UseUpdate";

function BrandUpdate() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const nav = useNavigate();

  const { data: brand, isLoading } = useQuery({
    queryKey: ["brand", id],
    enabled: !!id,
    queryFn: async () =>
      (await axios.get(`http://localhost:3001/brands/${id}`)).data,
  });

  useEffect(() => {
    if (brand) form.setFieldsValue(brand);
  }, [brand]);

  const updateBrand = useUpdate("brands");

  const handleSubmit = (values: any) => {
    if (!id) return message.error("Thiếu ID thương hiệu");
    updateBrand.mutate(
      { id, values },
      {
        onSuccess: () => {
          message.success("Cập nhật thương hiệu thành công");
          nav("/brands");
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
          Cập nhật thương hiệu
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={updateBrand.isPending}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <Form.Item
            label="Tên thương hiệu *"
            name="name"
            rules={[
              { required: true, message: "Tên thương hiệu là bắt buộc" },
              { min: 2, message: "Tối thiểu 2 ký tự" },
            ]}
          >
            <Input placeholder="Nike, Adidas, Puma..." />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={updateBrand.isPending}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default BrandUpdate;
