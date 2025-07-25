import ProductList from "./components/ProductList";
import "./App.css";
import CategoryList from "./components/CagetoryList";
import BrandList from "./components/BrandList";
import  Header  from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import UserList from "./components/UserList";
import ProductCreate from "./components/ProductCreate";
import CategoryCreate from "./components/CategoryCreate";
import UserCreate from "./components/UserCreate";
import BrandCreate from "./components/BrandCreate";


function App() {
  const router =  createBrowserRouter([
    {
      path : "/",
      element : <Header/>,
    },
    {
      path : "/products",
      element : <ProductList/>,
    },
    {
      path : "/categories",
      element : <CategoryList/>,
    },
    {
      path : "/brands",
      element : <BrandList/>,
    },
    {
      path : "/products/:id",
      element : <ProductDetail/>,
    },
    {
      path : "/users",
      element : <UserList/>,
    },
    {
      path : "/add-product",
      element : <ProductCreate/>,
    },
    {
      path : "/add-category",
      element : <CategoryCreate/>,
    },
    {
      path : "/add-user",
      element : <UserCreate/>,
    },
     {
      path : "/add-brand",
      element : <BrandCreate/>,
    },
  ])
  return (
    <div>
     <RouterProvider router={router} />
    </div>
  );
}

export default App;