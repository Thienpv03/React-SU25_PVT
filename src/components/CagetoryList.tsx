import { useQuery } from "@tanstack/react-query";
import { Button, Input, Modal, Table } from "antd";
import Header from "./Header";
import { Link, useSearchParams } from "react-router-dom";
import { useDelete } from "../hooks/UseDelete";

interface Category {
  id: number;
  name: string;
}

function CategoryList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user?.role === "admin";

  const fetchCategories = async (): Promise<Category[]> => {
    const res = await fetch(
      `http://localhost:3001/categories?name_like=${name}`
    );
    return res.json();
  };

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["categories", name],
    queryFn: fetchCategories,
  });

  const { mutate: deleteCategory, isLoading: isDeleting } = useDelete("categories");

  const handleDelete = (category: Category) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: `Bạn có chắc chắn muốn xoá danh mục "${category.name}"?`,
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      onOk: () => deleteCategory(category.id),
    });
  };

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

  if (isAdmin) {
    columns.push({
      title: "Tùy chọn",
      key: "actions",
      render: (record: Category) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Link to={`/update-category/${record.id}`}>
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
    });
  }

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
        {isAdmin && (
          <Link to="/add-category">
            <Button type="primary">Thêm danh mục</Button>
          </Link>
        )}
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
