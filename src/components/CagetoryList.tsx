import { useQuery } from "@tanstack/react-query";
import { Button, Input, Table } from "antd";
import Header from "./Header";
import { Link, useSearchParams } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

function CategoryList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";

  const fetchCategories = async (): Promise<Category[]> => {
    const res = await fetch(
      `http://localhost:3001/categories?name=${name}`
    );
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories", name],
    queryFn: fetchCategories,
  });

  const onSearch = (value: string) => {
    setSearchParams({ name: value });
  };

  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
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
        <h2 style={{ margin: 0 }}>Danh sách danh mục</h2>
        <Link to="/add-category">
          <Button type="primary">Thêm danh mục</Button>
        </Link>
      </div>

      <Input.Search
        placeholder="Tìm danh mục theo tên"
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

export default CategoryList;
