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
import BrandCreate from "./components/BrandCreate";
import ProductUpdate from "./components/ProductUpdate";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import BrandUpdate from "./components/BrandUpdate";
import CategoryUpdate from "./components/CategoryUpdate";
import ProductListClient from "./components/ProductListClient";


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
      path : "/add-brand",
      element : <BrandCreate/>,
    },
    {
      path : "/update-product/:id",
      element : <ProductUpdate/>,
    },
    {
      path : "/update-brand/:id",
      element : <BrandUpdate/>,
    },
    {
      path : "/update-category/:id",
      element : <CategoryUpdate/>,
    },
    {
      path : "register",
      element : <Register/>,
    },
    {
      path : "login",
      element : <Login/>,
    },
    {
      path : "home",
      element : <Home/>,
    },
    {
      path : "product-client",
      element : <ProductListClient/>,
    },
  ])
  return (
    <div>
     <RouterProvider router={router} />
    </div>
  );
}

export default App;