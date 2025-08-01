import { Button, Form, Input, message } from "antd";
import Header from "./Header";
import { useCreate } from "../hooks/UseCreate";

function BrandCreate() {
  const [form] = Form.useForm();

  const createBrand = useCreate("brands");

  const handleSubmit = (values: any) => {
    createBrand.mutate(values, {
      onSuccess: () => {
        message.success("Tạo thương hiệu thành công");
        form.resetFields();
      },
      onError: () => {
        message.error("Tạo thương hiệu thất bại");
      },
    });
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
        <h2 style={{ textAlign: "center", fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>
          Thêm thương hiệu
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
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
            >
              Tạo thương hiệu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default BrandCreate;
