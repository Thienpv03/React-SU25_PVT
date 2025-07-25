import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, Input } from "antd";
import axios from "axios";
import Header from "./Header";
import { useSearchParams } from "react-router-dom";

interface Brand {
  id: number;
  name: string;
}

const BrandList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";

  const fetchBrands = async (): Promise<Brand[]> => {
    const { data } = await axios.get(
      `http://localhost:3001/brands?name=${name}`
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
  ];

  if (isLoading) return <p>Đang tải dữ liệu thương hiệu...</p>;
  if (error) return <p>Có lỗi xảy ra: {(error as Error).message}</p>;

  return (
    <div style={{ padding: 20 }}>
      <Header />
      <h2 style={{ marginBottom: 16 }}>Danh sách thương hiệu</h2>

      <Input.Search
        placeholder="Tìm thương hiệu theo tên"
        allowClear
        enterButton="Tìm"
        defaultValue={name}
        onSearch={onSearch}
        style={{ width: 300, marginBottom: 16 }}
      />

      <Table
        dataSource={brands}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default BrandList;
