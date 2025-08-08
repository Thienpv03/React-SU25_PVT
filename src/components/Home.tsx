import React from "react";
import { Button, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const { Title } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
        <Header/>
      <Title level={2}>Trang chủ</Title>

      {token ? (
        <>
          <Title level={4}>
            Xin chào, {name || email || "người dùng"}!
          </Title>
          <Link to="/home">
          <Button type="primary" danger onClick={handleLogout}>
            Đăng xuất
          </Button>
          </Link>
        </>
      ) : (
        <Space>
          <Link to="/login">
            <Button type="primary">Đăng nhập</Button>
          </Link>
          <Link to="/register">
            <Button>Đăng ký</Button>
          </Link>
        </Space>
      )}
    </div>
  );
};

export default Home;
