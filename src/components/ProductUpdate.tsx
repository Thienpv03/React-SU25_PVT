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

  if (isLoading) return <Spin className="block mx-auto mt-10" />;

  return (
    <div>
      <Header />
      <div className="max-w-[800px] mx-auto px-6 mt-6">
        <h1 className="text-3xl font-bold text-center mb-6">Cập nhật sản phẩm</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={updateProduct.isPending}
        >
          <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="stock" label="Tồn kho" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="brandId" label="Thương hiệu" rules={[{ required: true }]}>
            <Select placeholder="Chọn thương hiệu">
              {brands.map((b) => (
                <Select.Option key={b.id} value={b.id}>
                  {b.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true }]}>
            <Select placeholder="Chọn danh mục">
              {categories.map((c) => (
                <Select.Option key={c.id} value={c.id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="size" label="Kích cỡ" rules={[{ required: true }]}>
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
              className="bg-blue-500"
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
