import { Image, Table, Tag, Input, Button } from "antd";
import Header from "./Header";
import { Link, useSearchParams } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { useList } from "../hooks/UseList";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  brandId: number;
  brand?: {
    name: string;
  };
  size: string[];
  stock: number;
}

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";

  const { data, isLoading, error } = useList("products", {
    _expand: "brand",
    name,
  });

  const columns: ColumnsType<Product> = [
    {
      title: "Số thứ tự",
      dataIndex: "id",
      render: (id) => <Link to={`/products/${id}`}>#{id}</Link>,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (src, record) => <Image src={src} alt={record.name} width={80} />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      render: (brand) => brand?.name ?? "Không rõ",
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      render: (stock) =>
        stock > 0 ? (
          <span>{stock} cái</span>
        ) : (
          <span style={{ color: "red" }}>Hết hàng</span>
        ),
    },
    {
      title: "Size",
      dataIndex: "size",
      render: (sizes) =>
        Array.isArray(sizes)
          ? sizes.map((s) => <Tag key={s}>{s}</Tag>)
          : <Tag>{sizes}</Tag>,
    },
    {
      title: "Tùy chọn",
      key: "actions",
      render: (record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Link to={`/update-product/${record.id}`}>
            <Button type="primary">Sửa</Button>
          </Link>
          <Button type="primary" danger>Xoá</Button>
        </div>
      ),
    },
  ];

  const onSearch = (value: string) => {
    setSearchParams({ name: value });
  };

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
        <h2 style={{ margin: 0 }}>Danh sách sản phẩm</h2>
        <Link to="/add-product">
          <Button type="primary">Thêm sản phẩm</Button>
        </Link>
      </div>

      <Input.Search
        placeholder="Tìm sản phẩm theo tên"
        allowClear
        enterButton="Tìm"
        defaultValue={name}
        onSearch={onSearch}
        style={{ width: 300, marginBottom: 16 }}
      />

      {error && <p style={{ color: "red" }}>{(error as Error).message}</p>}

      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
}

export default ProductList;
