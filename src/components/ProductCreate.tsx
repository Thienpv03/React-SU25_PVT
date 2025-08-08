import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Spin,
  Checkbox,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useCreate } from "../hooks/UseCreate";

function ProductCreate() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data: brands = [], isLoading: loadingBrands } = useQuery({
    queryKey: ["brands"],
    queryFn: () => axios.get("http://localhost:3001/brands").then((res) => res.data),
  });

  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => axios.get("http://localhost:3001/categories").then((res) => res.data),
  });

  const createProduct = useCreate("products", (values) => ({
    brand: brands.find((b) => b.id === values.brandId) || undefined,
    category: categories.find((c) => c.id === values.categoryId) || undefined,
  }));

  const onFinish = (values: any) => {
    createProduct.mutate(values, {
      onSuccess: () => {
        message.success("Thêm sản phẩm thành công!");
        navigate("/products");
      },
      onError: () => {
        message.error("Lỗi khi thêm sản phẩm.");
      },
    });
  };

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
        <h2
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 24,
          }}
        >
          Thêm sản phẩm
        </h2>

        {loadingBrands || loadingCategories ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
            <Spin />
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ size: [] }}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <Form.Item
              name="name"
              label="Tên sản phẩm *"
              rules={[{ required: true, message: "Tên sản phẩm là bắt buộc" }]}
            >
              <Input placeholder="Ví dụ: Áo CLB" />
            </Form.Item>

            <Form.Item
              name="price"
              label="Giá *"
              rules={[{ required: true, message: "Giá là bắt buộc" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="description" label="Mô tả">
              <Input.TextArea rows={3} placeholder="Mô tả sản phẩm" />
            </Form.Item>

            <Form.Item
              name="image"
              label="Link ảnh *"
              rules={[{ required: true, message: "Link ảnh là bắt buộc" }]}
            >
              <Input placeholder="https://..." />
            </Form.Item>

            <Form.Item
              name="brandId"
              label="Thương hiệu *"
              rules={[{ required: true, message: "Chọn thương hiệu" }]}
            >
              <Select placeholder="Chọn thương hiệu">
                {brands.map((brand) => (
                  <Select.Option key={brand.id} value={brand.id}>
                    {brand.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="categoryId"
              label="Danh mục *"
              rules={[{ required: true, message: "Chọn danh mục" }]}
            >
              <Select placeholder="Chọn danh mục">
                {categories.map((cat) => (
                  <Select.Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="stock"
              label="Số lượng kho *"
              rules={[{ required: true, message: "Nhập số lượng kho" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="size" label="Size">
              <Checkbox.Group style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                {["S", "M", "L", "XL", "XXL"].map((s) => (
                  <Checkbox value={s} key={s}>
                    {s}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Thêm sản phẩm
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
}

export default ProductCreate;
