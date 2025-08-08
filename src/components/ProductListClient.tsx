import React from "react";
import { Card, Button, Row, Col, Spin, Alert } from "antd";
import { useList } from "../hooks/UseList";


type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const ProductListClient: React.FC = () => {
  const { data, isLoading, error } = useList("products");

  const handleBuy = (product: Product) => {
    alert(`Bạn đã mua: ${product.name} - Giá: ${product.price.toLocaleString()} VND`);
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Lỗi tải dữ liệu"
        description="Không thể lấy danh sách sản phẩm từ server."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 16]}>
        {data?.map((product: Product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.image}
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
            >
              <Card.Meta
                title={product.name}
                description={`${product.price.toLocaleString()} VND`}
              />
              <Button
                type="primary"
                block
                style={{ marginTop: 12 }}
                onClick={() => handleBuy(product)}
              >
                Mua ngay
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductListClient;
