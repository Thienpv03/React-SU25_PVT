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
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function ProductCreate() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch brands
  const { data: brands, isLoading: loadingBrands } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/brands");
      return res.data;
    },
  });

  // Fetch categories
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/categories");
      return res.data;
    },
  });

  // Create product
  const mutation = useMutation({
    mutationFn: async (product: any) => {
      // Get brand
      const brandRes = await axios.get(
        `http://localhost:3001/brands/${product.brandId}`
      );

      // Get category
      const categoryRes = await axios.get(
        `http://localhost:3001/categories/${product.categoryId}`
      );

      const productWithFullData = {
        ...product,
        brand: { name: brandRes.data.name },
        category: { name: categoryRes.data.name },
      };

      return axios.post("http://localhost:3001/products", productWithFullData);
    },
    onSuccess: () => {
      message.success("Thêm sản phẩm thành công!");
      navigate("/");
    },
    onError: () => {
      message.error("Lỗi khi thêm sản phẩm.");
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate(values);
  };

  return (
    <div style={{ padding: 20 }}>
      <Header />
      <h2>Thêm sản phẩm</h2>

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
              {brands?.map((brand: any) => (
                <Select.Option key={brand.id} value={brand.id}>
                  {brand.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Danh mục"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn danh mục">
              {categories?.map((cat: any) => (
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
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500"
            >
              Thêm sản phẩm
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

export default ProductCreate;
