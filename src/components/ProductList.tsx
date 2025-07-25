import { useQuery } from "@tanstack/react-query";
import { Image, Table, Tag, Input } from "antd";
import Header from "./Header";
import { Link, useSearchParams } from "react-router-dom";

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

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";

  const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch(
      `http://localhost:3001/products?_expand=brand&name=${name}`
    );
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", name],
    queryFn: fetchProducts,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: number) => <Link to={`/products/${id}`}>ID: {id}</Link>,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (src: string, record: Product) => (
        <Image src={src} alt={record.name} width={100} />
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      render: (brand: Product["brand"]) => brand?.name ?? "Không rõ",
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      render: (stock: number) =>
        stock > 0 ? (
          <span>{stock} cái</span>
        ) : (
          <span style={{ color: "red" }}>Hết hàng</span>
        ),
    },
    {
  title: "Size",
  dataIndex: "size",
  render: (sizes: string[] | string) =>
    Array.isArray(sizes)
      ? sizes.map((s) => <Tag key={s}>{s}</Tag>)
      : <Tag>{sizes}</Tag>,
},

  ];

  const onSearch = (value: string) => {
    setSearchParams({ name: value });
  };

  return (
    <div style={{ padding: 20 }}>
      <Header />
      <h2>Danh sách sản phẩm</h2>

      <Input.Search
        placeholder="Tìm sản phẩm theo tên"
        allowClear
        enterButton="Tìm"
        defaultValue={name}
        onSearch={onSearch}
        style={{ width: 300, marginBottom: 20 }}
      />

      {error && <p>{(error as Error).message}</p>}

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
