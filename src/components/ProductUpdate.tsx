import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Spin,
} from "antd";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

function ProductUpdate() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const nav = useNavigate();

  // Lấy thông tin sản phẩm
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3001/products/${id}`);
      return res.data;
    },
  });

  // Lấy danh sách thương hiệu
  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/brands");
      return res.data;
    },
  });

  // Lấy danh sách danh mục
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/categories");
      return res.data;
    },
  });

  // Set lại form khi có dữ liệu
  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product]);

  // Submit
  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const brand = brands.find((b: any) => b.id === values.brandId);
      return axios.put(`http://localhost:3001/products/${id}`, {
        ...values,
        brand: brand ? { name: brand.name } : undefined,
      });
    },
    onSuccess: () => {
      message.success("Cập nhật thành công!");
      nav("/products");
    },
    onError: () => {
      message.error("Cập nhật thất bại!");
    },
  });

  const handleSubmit = (values: any) => {
    mutation.mutate(values);
  };

  if (isLoading) return <Spin />;

  return (
    <div>
      <Header />
      <div className="mt-6 max-w-[800px] mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-6">Cập nhật sản phẩm</h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Tên sản phẩm không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[{ required: true, message: "Ảnh sản phẩm không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Giá sản phẩm không được để trống" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Tồn kho"
            name="stock"
            rules={[{ required: true, message: "Tồn kho không được để trống" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Mô tả không được để trống" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Thương hiệu"
            name="brandId"
            rules={[{ required: true, message: "Vui lòng chọn thương hiệu" }]}
          >
            <Select placeholder="Chọn thương hiệu">
              {brands.map((brand: any) => (
                <Select.Option key={brand.id} value={brand.id}>
                  {brand.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="categoryId"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select placeholder="Chọn danh mục">
              {categories.map((cat: any) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Kích cỡ"
            name="size"
            rules={[{ required: true, message: "Vui lòng chọn ít nhất một size" }]}
          >
            <Select mode="multiple" placeholder="Chọn size">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <Select.Option key={size} value={size}>
                  {size}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500"

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
