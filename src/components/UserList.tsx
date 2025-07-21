import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Table, Tag, Spin, Typography } from "antd";
import Header from "./Header";

const { Title } = Typography;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get("http://localhost:3001/users");
  return data;
};

const UserList: React.FC = () => {
  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phân quyền",
      dataIndex: "role",
      key: "role",
      render: (role: string) =>
        role === "admin" ? (
          <Tag color="red">Admin</Tag>
        ) : (
          <Tag color="blue">Khách hàng</Tag>
        ),
    },
  ];

  if (isLoading)
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        
        <Spin size="large" tip="Đang tải người dùng..." />
      </div>
    );

  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>Có lỗi xảy ra</p>;

  return (
    <div style={{ padding: 20 }}>
        <Header />
      <Title level={2}>Danh sách người dùng</Title>
      
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.id.toString()}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default UserList;
