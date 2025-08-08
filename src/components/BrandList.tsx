import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, Input, Button, Modal } from "antd";
import axios from "axios";
import Header from "./Header";
import { Link, useSearchParams } from "react-router-dom";
import { useDelete } from "../hooks/useDelete"; // chỉnh path nếu cần

interface Brand {
  id: number;
  name: string;
}

const BrandList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";

  const fetchBrands = async (): Promise<Brand[]> => {
    const { data } = await axios.get(
      `http://localhost:3001/brands?name_like=${name}`
    );
    return data;
  };

  const {
    data: brands = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["brands", name],
    queryFn: fetchBrands,
  });

  // ✅ Sử dụng useDelete
  const { mutate: deleteBrand, isPending: isDeleting } = useDelete("brands");

  const handleDelete = (brand: Brand) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: `Bạn có chắc chắn muốn xoá thương hiệu "${brand.name}"?`,
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      onOk: () => deleteBrand(brand.id),
    });
  };

  const onSearch = (value: string) => {
    setSearchParams({ name: value });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tùy chọn",
      key: "actions",
      render: (record: Brand) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Link to={`/update-brand/${record.id}`}>
            <Button type="primary">Sửa</Button>
          </Link>
          <Button
            type="primary"
            danger
            loading={isDeleting}
            onClick={() => handleDelete(record)}
          >
            Xoá
          </Button>
        </div>
      ),
    },
  ];

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
        <h2 style={{ margin: 0 }}>Danh sách thương hiệu</h2>
        <Link to="/add-brand">
          <Button type="primary">Thêm thương hiệu</Button>
        </Link>
      </div>

      <Input.Search
        placeholder="Tìm thương hiệu theo tên"
        allowClear
        enterButton="Tìm"
        defaultValue={name}
        onSearch={onSearch}
        style={{ width: 300, marginBottom: 16 }}
      />

      {error && <p style={{ color: "red" }}>{(error as Error).message}</p>}

      <Table
        dataSource={brands}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default BrandList;
