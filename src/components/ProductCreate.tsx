import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Spin,
} from "antd";
import axios from "axios";
import Header from "./Header";

function ProductCreate() {
  const [form] = Form.useForm();

  const { data: brands, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/brands");
      return res.data;
    },
  });

  const addProduct = async (values: any) => {
    const payload = {
      name: values.name,
      image: values.image,
      brandId: values.brandId,
      price: values.price,
      stock: values.stock,
      size: values.size,
    };
    return await axios.post("http://localhost:3001/products", payload);
  };

  const { mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      message.success("Thêm sản phẩm thành công");
      form.resetFields();
    },
    onError: () => {
      message.error("Thêm sản phẩm thất bại");
    },
  });

  const handleSubmit = (values: any) => {
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
          Thêm sản phẩm
        </h2>

        {isLoading ? (
          <Spin />
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <Form.Item
              label="Tên Sản Phẩm *"
              name="name"
              rules={[{ required: true, message: "Tên sản phẩm là bắt buộc" }]}
            >
              <Input placeholder="Adidas Ultra Boost" />
            </Form.Item>

            <Form.Item
              label="Hình Ảnh *"
              name="image"
              rules={[{ required: true, message: "Image là bắt buộc" }]}
            >
              <Input placeholder="https://..." />
            </Form.Item>

            <Form.Item
              label="Thương Hiệu *"
              name="brandId"
              rules={[{ required: true, message: "Thương hiệu là bắt buộc" }]}
            >
              <Select placeholder="Chọn thương hiệu">
                {brands.map((brand: any) => (
                  <Select.Option key={brand.id} value={parseInt(brand.id)}>
                    {brand.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Giá *"
              name="price"
              rules={[
                { required: true, message: "Giá là bắt buộc" },
                { type: "number", min: 0, message: "Giá phải >= 0" },
              ]}
            >
              <InputNumber
                placeholder="590000"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Mô tả là bắt buộc" }]}
            >
              <Input.TextArea placeholder="Nhập mô tả sản phẩm" />
            </Form.Item>

            <Form.Item
              label="Danh mục"
              name="categoryId"
              rules={[{ required: true, message: "Danh mục là bắt buộc" }]}
            >
              <Select placeholder="Chọn danh mục">
                <Select.Option value={1}>Premier League</Select.Option>
                <Select.Option value={2}>La Liga</Select.Option>
                <Select.Option value={3}>Bundesliga</Select.Option>
                <Select.Option value={4}>Ligue 1</Select.Option>
                <Select.Option value={5}>Serie A</Select.Option>
                <Select.Option value={6}>Đội tuyển quốc gia</Select.Option>
                <Select.Option value={7}>V League</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Tồn Kho *"
              name="stock"
              rules={[
                { required: true, message: "Số lượng là bắt buộc" },
                { type: "number", min: 0, message: "Tồn kho phải >= 0" },
              ]}
            >
              <InputNumber placeholder="15" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Kích Cỡ *"
              name="size"
              rules={[{ required: true, message: "Size là bắt buộc" }]}
            >
              <Select mode="multiple" placeholder="Chọn size">
                <Select.Option value="S">S</Select.Option>
                <Select.Option value="M">M</Select.Option>
                <Select.Option value="L">L</Select.Option>
                <Select.Option value="XL">XL</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Tạo sản phẩm
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
}

export default ProductCreate;
