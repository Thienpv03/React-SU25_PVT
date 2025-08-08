// src/pages/Login.tsx
import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  
  const { login } = useAuth();

  const onFinish = async (values: any) => {
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Đăng nhập thất bại");

      const data = await res.json();

      
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("name", data.user.name || "");
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("role", data.user.role);

      
      login(
        {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        },
        data.accessToken
      );

      message.success("Đăng nhập thành công");
      navigate("/products");
    } catch (error) {
      message.error("Email hoặc mật khẩu không đúng");
    }
  };

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", paddingTop: 30 }}>
      <div
        style={{
          maxWidth: 400,
          margin: "60px auto",
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
          Đăng nhập
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <Form.Item
            name="email"
            label="Email *"
            rules={[
              { required: true, type: "email", message: "Vui lòng nhập email hợp lệ" },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu *"
            rules={[
              { required: true, min: 6, message: "Mật khẩu ít nhất 6 ký tự" },
            ]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
