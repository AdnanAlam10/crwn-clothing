import { useContext } from "react";

import { ProductsContext } from "../../contexts/productsContext";
import ProductCard from "../../components/productCard/productCard";
import "./shop.styles.scss";

function Shop() {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Shop;
