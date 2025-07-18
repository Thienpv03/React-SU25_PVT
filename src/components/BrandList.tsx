import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, Button, message } from "antd";
import axios from "axios";

interface Brand {
  id: number;
  name: string;
}

const fetchBrands = async (): Promise<Brand[]> => {
  const { data } = await axios.get("http://localhost:3001/brands");
  return data;
};

const BrandList: React.FC = () => {
  const {
    data: brands = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

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
      <h2 style={{ marginBottom: 16 }}>Danh sách thương hiệu</h2>
      <Button
        type="primary"
        onClick={() => {
          refetch();
          message.success("Làm mới thành công");
        }}
        style={{ marginBottom: 16 }}
      >
        Làm mới dữ liệu
      </Button>

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
