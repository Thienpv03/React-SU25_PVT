import ProductList from "./components/ProductList";
import "./App.css";
import CategoryList from "./components/CagetoryList";
import BrandList from "./components/BrandList";
import  Header  from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import UserList from "./components/UserList";

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
  ])
  return (
    <div>
     <RouterProvider router={router} />
    </div>
  );
}

export default App;