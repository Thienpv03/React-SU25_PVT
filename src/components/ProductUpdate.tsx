import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Spin,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useUpdate } from "../hooks/UseUpdate";

function ProductUpdate() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const nav = useNavigate();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    enabled: !!id,
    queryFn: async () =>
      (await axios.get(`http://localhost:3001/products/${id}`)).data,
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: async () =>
      (await axios.get("http://localhost:3001/brands")).data,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      (await axios.get("http://localhost:3001/categories")).data,
  });

  useEffect(() => {
    if (product) form.setFieldsValue(product);
  }, [product]);

  const updateProduct = useUpdate("products", (values) => ({
    brand: brands.find((b) => b.id === values.brandId),
    category: categories.find((c) => c.id === values.categoryId),
  }));

  const handleSubmit = (values: any) => {
    if (!id) return message.error("Thiếu ID sản phẩm");
    updateProduct.mutate(
      { id, values },
      {
        onSuccess: () => {
          message.success("Cập nhật thành công!");
          nav("/products");
        },
        onError: () => {
          message.error("Cập nhật thất bại");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 50,
        }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", paddingTop: 30 }}>
      <Header />
      <div
        style={{
          maxWidth: 800,
          margin: "40px auto",
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 24,
          }}
        >
          Cập nhật sản phẩm
        </h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={updateProduct.isPending}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <Form.Item
            name="name"
            label="Tên sản phẩm *"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="image"
            label="Hình ảnh *"
            rules={[{ required: true, message: "Vui lòng nhập link hình ảnh" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá *"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Tồn kho *"
            rules={[{ required: true, message: "Vui lòng nhập số lượng tồn" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả *"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="brandId"
            label="Thương hiệu *"
            rules={[{ required: true, message: "Vui lòng chọn thương hiệu" }]}
          >
            <Select placeholder="Chọn thương hiệu">
              {brands.map((b) => (
                <Select.Option key={b.id} value={b.id}>
                  {b.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Danh mục *"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select placeholder="Chọn danh mục">
              {categories.map((c) => (
                <Select.Option key={c.id} value={c.id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="size"
            label="Kích cỡ *"
            rules={[{ required: true, message: "Vui lòng chọn size" }]}
          >
            <Select mode="multiple" placeholder="Chọn size">
              {["S", "M", "L", "XL", "XXL"].map((s) => (
                <Select.Option key={s} value={s}>
                  {s}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={updateProduct.isPending}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ProductUpdate;
