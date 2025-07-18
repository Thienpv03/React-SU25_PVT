import ProductList from "./components/ProductList";
import "./App.css";
import CategoryList from "./components/CagetoryList";
import BrandList from "./components/BrandList";
import  Header  from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
  ])
  return (
    <div>
     <RouterProvider router={router} />
    </div>
  );
}

export default App;