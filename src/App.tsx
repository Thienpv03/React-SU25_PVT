import ProductList from "./components/ProductList";
import "./App.css";
import CategoryList from "./components/CagetoryList";
import BrandList from "./components/BrandList";


function App() {
  return (
    <div>
      <ProductList />
      <CategoryList />
      <BrandList />
    </div>
  );
}

export default App;