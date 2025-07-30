import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Table, Tag, Spin, Typography, Input, Button } from "antd";
import Header from "./Header";
import { Link, useSearchParams } from "react-router-dom";

const { Title } = Typography;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";

  const fetchUsers = async (): Promise<User[]> => {
    const { data } = await axios.get(
      `http://localhost:3001/users?name=${name}`
    );
    return data;
  };

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["users", name],
    queryFn: fetchUsers,
  });

  const onSearch = (value: string) => {
    setSearchParams({ name: value });
  };

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          marginTop: 15,
        }}
      >
        <h2 style={{ margin: 0 }}>Danh sách người dùng</h2>
        <Link to="/add-user">
          <Button type="primary">Thêm người dùng</Button>
        </Link>
      </div>

      <Input.Search
        placeholder="Tìm người dùng theo tên"
        allowClear
        enterButton="Tìm"
        defaultValue={name}
        onSearch={onSearch}
        style={{ width: 300, marginBottom: 16 }}
      />

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
