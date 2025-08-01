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
    <div className="p-6">
      <Header />
      <h2 className="text-2xl font-bold mb-4">Thêm sản phẩm</h2>

      {loadingBrands || loadingCategories ? (
        <Spin />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ size: [] }}
        >
          <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="image" label="Link ảnh" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="brandId" label="Thương hiệu" rules={[{ required: true }]}>
            <Select placeholder="Chọn thương hiệu">
              {brands.map((brand) => (
                <Select.Option key={brand.id} value={brand.id}>
                  {brand.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true }]}>
            <Select placeholder="Chọn danh mục">
              {categories.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="stock" label="Số lượng kho" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="size" label="Size">
            <Checkbox.Group>
              {["S", "M", "L", "XL", "XXL"].map((s) => (
                <Checkbox value={s} key={s}>
                  {s}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Thêm sản phẩm
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

export default ProductCreate;
