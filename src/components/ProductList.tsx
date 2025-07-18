import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, Button, Image, Tag } from "antd";
import axios from "axios";
import Header from "./Header";


interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  brandId: number;
  brand?: {
    id: number;
    name: string;
  };
  size: string[];
  stock: number;
}

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get("http://localhost:3001/products?_expand=brand");
  return data;
};

const ProductList: React.FC = () => {
  const {
    data: products = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (url: string) => (
        <Image
          src={url}
          alt="product"
          width={80}
          height={80}
          style={{ objectFit: "cover", borderRadius: 8 }}
          placeholder
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (value: number) => `${value.toLocaleString()} VND`,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      key: "brand",
      render: (brand: Product["brand"]) => brand?.name ?? "Không rõ",
    },

    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (sizes: string[]) =>
        sizes.map((s) => <Tag key={s}>{s}</Tag>),
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number) =>
        stock > 0 ? (
          <span>{stock} cái</span>
        ) : (
          <span style={{ color: "red" }}>Hết hàng</span>
        ),
    },
  ];

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Có lỗi xảy ra: {(error as Error).message}</p>;

  return (

    
    <div style={{ padding: 20 }}>
       <Header />
      <h2 style={{ marginBottom: 16 }}>Danh sách áo bóng đá</h2>
      <Button
        type="primary"
        onClick={() => refetch()}
        style={{ marginBottom: 16 }}
        disabled={isLoading}
      >
        Làm mới dữ liệu
      </Button>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default ProductList;
