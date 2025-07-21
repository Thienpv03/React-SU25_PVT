import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Card, Image, Typography, Tag, Spin } from "antd";

const { Title, Paragraph } = Typography;

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  brand?: {
    id: number;
    name: string;
  };
  size: string[];
  stock: number;
}

const fetchProductById = async (id: string): Promise<Product> => {
  const { data } = await axios.get(`http://localhost:3001/products/${id}?_expand=brand`);
  return data;
};

const ProductDetail: React.FC = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  if (isLoading) return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <Spin size="large" tip="Đang tải chi tiết sản phẩm..." />
    </div>
  );

  if (error) return (
    <p style={{ color: "red", textAlign: "center" }}>
      Lỗi tải sản phẩm: {(error as Error).message}
    </p>
  );

  if (!product) return <p>Không tìm thấy sản phẩm.</p>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <Card
        cover={
          <Image src={product.image} alt={product.name} style={{ objectFit: "cover", height: 400 }} />
        }
      >
        <Title level={2}>{product.name}</Title>
        <Title level={4} style={{ color: "#1890ff" }}>
          {product.price.toLocaleString()} VND
        </Title>

        <Paragraph>{product.description}</Paragraph>

        <p><b>Thương hiệu:</b> {product.brand?.name || "Không rõ"}</p>

        <p>
          <b>Size có sẵn: </b>
          {product.size.map((size) => (
            <Tag color="blue" key={size}>{size}</Tag>
          ))}
        </p>

        <p>
          <b>Tồn kho:</b>{" "}
          {product.stock > 0 ? (
            <Tag color="green">{product.stock} cái</Tag>
          ) : (
            <Tag color="red">Hết hàng</Tag>
          )}
        </p>
      </Card>
    </div>
  );
};

export default ProductDetail;
