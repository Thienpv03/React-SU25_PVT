import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import Header from "./Header";

function BrandCreate() {
  const [form] = Form.useForm();

  const addBrand = async (values: any) => {
    return await axios.post("http://localhost:3001/brands", values);
  };

  const { mutate } = useMutation({
    mutationFn: addBrand,
    onSuccess: () => {
      message.success("Tạo thương hiệu thành công");
      form.resetFields();
    },
    onError: () => {
      message.error("Tạo thương hiệu thất bại");
    },
  });

  const handleSubmit = (values: any) => {
    mutate(values);
  };

  return (
    <div className="mt-6 max-w-[600px] mx-auto px-6">
        <Header /> <br />
      <h1 className="text-3xl font-bold text-center mb-6">Create Brand</h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên thương hiệu *"
          name="name"
          rules={[
            { required: true, message: "Tên thương hiệu là bắt buộc" },
            { min: 2, message: "Ít nhất 2 ký tự" },
          ]}
        >
          <Input placeholder="Ví dụ: Adidas, Nike..." />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default BrandCreate;
